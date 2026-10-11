import { useState } from "react";
import { registerStudent } from "./api.js";

export default function Register({ onDone }) {
  const [form, setForm] = useState({ name: "", className: "", rollNumber: "", email: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const student = await registerStudent(form);
      onDone(student);
    } catch (err) {
      setError(err.message === "Failed to fetch" ? "Cannot reach the server. Start the backend and try again." : err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="wrap narrow">
      <h1>Register to open Study Helper</h1>
      <p className="lead">You only do this once on this device. Use the same email if you register again.</p>
      <form className="form" onSubmit={submit}>
        <label>Name<input required value={form.name} onChange={set("name")} autoComplete="name" /></label>
        <label>Class<input required value={form.className} onChange={set("className")} placeholder="Example: Computer 3rd semester" /></label>
        <label>Roll number<input required value={form.rollNumber} onChange={set("rollNumber")} /></label>
        <label>Email<input required type="email" value={form.email} onChange={set("email")} autoComplete="email" /></label>
        {error && <p className="err">{error}</p>}
        <button className="primary" disabled={busy}>{busy ? "Registering…" : "Register"}</button>
      </form>
    </main>
  );
}
