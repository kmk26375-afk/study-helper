import { useEffect, useState } from "react";
import { BRANCHES, SEMESTERS, YEARS, subjectsFor } from "./data.js";
import { getResources, fileUrl } from "./api.js";

const TITLES = { browse: "Branches and subjects", notes: "Notes", papers: "Previous year papers" };

// mode: "browse" (branch > semester > subjects), "notes" (pick a subject, see notes), "papers" (see papers by year)
export default function Explorer({ mode, preset, go }) {
  const [branch, setBranch] = useState(preset.branch || null);
  const [sem, setSem] = useState(preset.sem || null);
  const [subject, setSubject] = useState(preset.subject || null);
  const [year, setYear] = useState("");
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("idle");

  const wantsList = mode === "notes" ? Boolean(subject) : mode === "papers" ? Boolean(sem) : false;

  useEffect(() => {
    if (!wantsList) return;
    setStatus("loading");
    const params =
      mode === "notes"
        ? { type: "note", branch, semester: sem, subject }
        : { type: "paper", branch, semester: sem, year };
    getResources(params)
      .then((data) => { setItems(data); setStatus("done"); })
      .catch(() => setStatus("error"));
  }, [mode, branch, sem, subject, year]);

  const crumbs = [["All branches", () => { setBranch(null); setSem(null); setSubject(null); }]];
  if (branch) crumbs.push([branch, () => { setSem(null); setSubject(null); }]);
  if (sem) crumbs.push([`Semester ${sem}`, () => setSubject(null)]);
  if (subject) crumbs.push([subject, () => {}]);

  let body;
  if (!branch) {
    body = (
      <div className="grid">
        {BRANCHES.map((b) => <button className="tile" key={b} onClick={() => setBranch(b)}>{b}</button>)}
      </div>
    );
  } else if (!sem) {
    body = (
      <div className="grid">
        {SEMESTERS.map((s) => <button className="tile" key={s} onClick={() => setSem(s)}>Semester {s}</button>)}
      </div>
    );
  } else if (mode === "browse") {
    body = (
      <ul className="rows">
        {subjectsFor(branch, sem).map((s) => (
          <li key={s}>
            <span>{s}</span>
            <span className="acts">
              <button onClick={() => go("notes", { branch, sem, subject: s })}>Notes</button>
              <button onClick={() => go("papers", { branch, sem })}>Papers</button>
            </span>
          </li>
        ))}
      </ul>
    );
  } else if (mode === "notes" && !subject) {
    body = (
      <ul className="rows">
        {subjectsFor(branch, sem).map((s) => (
          <li key={s}><button className="link" onClick={() => setSubject(s)}>{s}</button></li>
        ))}
      </ul>
    );
  } else {
    body = (
      <>
        {mode === "papers" && (
          <label className="inline">
            Year
            <select value={year} onChange={(e) => setYear(e.target.value)}>
              <option value="">All years</option>
              {YEARS.map((y) => <option key={y}>{y}</option>)}
            </select>
          </label>
        )}
        {status === "loading" && <p>Loading…</p>}
        {status === "error" && <p className="err">Cannot reach the server. Start the backend (npm start inside the server folder) and refresh.</p>}
        {status === "done" && items.length === 0 && <p className="empty">Nothing added here yet.</p>}
        <ul className="rows">
          {items.map((it) => (
            <li key={it._id}>
              <span>{it.title}<small>{it.subject}{it.year ? ` · ${it.year}` : ""}</small></span>
              <a href={fileUrl(it.fileUrl)} target="_blank" rel="noreferrer">Open</a>
            </li>
          ))}
        </ul>
      </>
    );
  }

  return (
    <section>
      <h2>{TITLES[mode]}</h2>
      <nav className="crumbs" aria-label="Where you are">
        {crumbs.map(([label, fn], i) => (
          <button key={label} onClick={fn} disabled={i === crumbs.length - 1}>{label}</button>
        ))}
      </nav>
      {body}
    </section>
  );
}
