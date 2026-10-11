import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadDir = path.join(__dirname, "uploads");
fs.mkdirSync(uploadDir, { recursive: true });

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(uploadDir));

/* ---------- MongoDB models ---------- */
const Student = mongoose.model(
  "Student",
  new mongoose.Schema(
    {
      name: { type: String, required: true, trim: true },
      className: { type: String, required: true, trim: true },
      rollNumber: { type: String, required: true, trim: true },
      email: { type: String, required: true, lowercase: true, trim: true, unique: true },
    },
    { timestamps: true }
  )
);

// One model for both notes and previous year papers.
const Resource = mongoose.model(
  "Resource",
  new mongoose.Schema(
    {
      type: { type: String, enum: ["note", "paper"], required: true },
      branch: { type: String, required: true },
      semester: { type: Number, required: true },
      subject: { type: String, required: true },
      year: Number,
      title: { type: String, required: true },
      fileUrl: { type: String, required: true },
    },
    { timestamps: true }
  )
);

/* ---------- file upload (PDF or photo) ---------- */
const upload = multer({
  storage: multer.diskStorage({
    destination: uploadDir,
    filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/[^\w.-]/g, "_")}`),
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (_req, file, cb) =>
    cb(null, file.mimetype === "application/pdf" || file.mimetype.startsWith("image/")),
});

const requireAdmin = (req, res, next) => {
  if (!process.env.ADMIN_KEY || req.get("x-admin-key") !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: "Wrong admin key." });
  }
  next();
};

/* ---------- routes ---------- */
app.post("/api/register", async (req, res) => {
  const { name, className, rollNumber, email } = req.body || {};
  if (!name || !className || !rollNumber || !email) {
    return res.status(400).json({ error: "Please fill all the fields." });
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: "Enter a valid email." });
  }
  const student = await Student.findOneAndUpdate(
    { email: email.toLowerCase().trim() },
    { name, className, rollNumber },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  res.json(student);
});

app.get("/api/resources", async (req, res) => {
  const { type, branch, semester, subject, year } = req.query;
  const filter = {};
  if (type) filter.type = type;
  if (branch) filter.branch = branch;
  if (semester) filter.semester = Number(semester);
  if (subject) filter.subject = subject;
  if (year) filter.year = Number(year);
  res.json(await Resource.find(filter).sort({ year: -1, createdAt: -1 }));
});

app.post("/api/resources", requireAdmin, upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "Upload a PDF or an image file." });
  const { type, branch, semester, subject, year, title } = req.body;
  if (!type || !branch || !semester || !subject || !title) {
    return res.status(400).json({ error: "Please fill all the fields." });
  }
  const doc = await Resource.create({
    type,
    branch,
    semester: Number(semester),
    subject,
    year: year ? Number(year) : undefined,
    title,
    fileUrl: `/uploads/${req.file.filename}`,
  });
  res.status(201).json(doc);
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong on the server." });
});

/* ---------- start ---------- */
const port = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/study-helper")
  .then(() => app.listen(port, () => console.log(`Server running on http://localhost:${port}`)))
  .catch((err) => {
    console.error("Could not connect to MongoDB:", err.message);
    process.exit(1);
  });
