import { useState } from "react";
import { BRANCHES, SEMESTERS, YEARS, subjectsFor } from "./data.js";
import { uploadResource } from "./api.js";

// For the site owner: adds a note or a previous year paper (PDF or photo) to MongoDB.
export default function Upload() {
  const [f, setF] = useState({ type: "paper", branch: "Computer", semester: 3, subject: "", year: YEARS[0], title: "", adminKey: "" });
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const subjects = subjectsFor(f.branch, Number(f.semester));

  async function submit(e) {
    e.preventDefault();
    if (!file) return setMsg("Choose a PDF or photo first.");
    setMsg("Uploading…");
    try {
      const fd = new FormData();
      const fields = { type: f.type, branch: f.branch, semester: f.semester, subject: f.subject || subjects[0], year: f.year, title: f.title };
      Object.entries(fields).forEach(([k, v]) => fd.append(k, v));
      fd.append("file", file);
      await uploadResource(fd, f.adminKey);
      setMsg("Uploaded. Students can see it now.");
    } catch (err) {
      setMsg(err.message);
    }
  }

  return (
    <details className="panel upload">
      <summary>Add a note or paper (owner only)</summary>
      <form className="form" onSubmit={submit}>
        <label>Admin key<input type="password" required value={f.adminKey} onChange={set("adminKey")} /></label>
        <label>Type
          <select value={f.type} onChange={set("type")}>
            <option value="paper">Previous year paper</option>
            <option value="note">Notes</option>
          </select>
        </label>
        <label>Branch
          <select value={f.branch} onChange={set("branch")}>{BRANCHES.map((b) => <option key={b}>{b}</option>)}</select>
        </label>
        <label>Semester
          <select value={f.semester} onChange={set("semester")}>{SEMESTERS.map((s) => <option key={s}>{s}</option>)}</select>
        </label>
        <label>Subject
          <select value={f.subject || subjects[0]} onChange={set("subject")}>{subjects.map((s) => <option key={s}>{s}</option>)}</select>
        </label>
        <label>Year
          <select value={f.year} onChange={set("year")}>{YEARS.map((y) => <option key={y}>{y}</option>)}</select>
        </label>
        <label>Title<input required value={f.title} onChange={set("title")} placeholder="Example: Winter 2024 paper" /></label>
        <label>File (PDF or photo)<input type="file" accept="application/pdf,image/*" onChange={(e) => setFile(e.target.files[0])} /></label>
        <button className="primary">Upload</button>
        {msg && <p role="status">{msg}</p>}
      </form>
    </details>
  );
}
