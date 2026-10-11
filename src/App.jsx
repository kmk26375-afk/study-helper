import { useState } from "react";
import "./App.css";
import { BRANCHES } from "./data.js";
import Register from "./Register.jsx";
import Explorer from "./Explorer.jsx";
import Videos from "./Videos.jsx";
import About from "./About.jsx";
import Upload from "./Upload.jsx";

const PAGES = [
  ["home", "Home"],
  ["branch", "Branch"],
  ["notes", "Notes"],
  ["videos", "Lecture video"],
  ["papers", "Papers"],
  ["about", "About"],
];

function loadStudent() {
  try { return JSON.parse(localStorage.getItem("student")); } catch { return null; }
}

export default function App() {
  const [student, setStudent] = useState(loadStudent);
  const [page, setPage] = useState("home");
  const [preset, setPreset] = useState({});

  const go = (p, pr = {}) => { setPage(p); setPreset(pr); window.scrollTo(0, 0); };

  if (!student) {
    return (
      <Register
        onDone={(s) => {
          try { localStorage.setItem("student", JSON.stringify(s)); } catch {}
          setStudent(s);
        }}
      />
    );
  }

  const explorerKey = page + JSON.stringify(preset);

  return (
    <>
      <header className="nav">
        <span className="brand">Study Helper</span>
        {PAGES.map(([id, label]) => (
          <button key={id} className={page === id ? "on" : ""} onClick={() => go(id)}>{label}</button>
        ))}
      </header>

      <main className="wrap">
        {page === "home" && (
          <>
            <div className="hero">
              <p className="hello">Hi, {student.name}</p>
              <h1>Notes, lectures and old papers for every diploma branch.</h1>
              <p className="lead">Pick your branch to start.</p>
            </div>
            <div className="grid">
              {BRANCHES.map((b) => (
                <button className="tile" key={b} onClick={() => go("branch", { branch: b })}>{b}</button>
              ))}
            </div>
          </>
        )}
        {page === "branch" && <Explorer key={explorerKey} mode="browse" preset={preset} go={go} />}
        {page === "notes" && (<><Explorer key={explorerKey} mode="notes" preset={preset} go={go} /><Upload /></>)}
        {page === "papers" && (<><Explorer key={explorerKey} mode="papers" preset={preset} go={go} /><Upload /></>)}
        {page === "videos" && <Videos />}
        {page === "about" && <About />}
      </main>
    </>
  );
}
