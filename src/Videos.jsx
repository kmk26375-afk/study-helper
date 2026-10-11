import { useState } from "react";
import { BRANCHES, VIDEOS } from "./data.js";

const ytId = (url) => (url.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/) || [])[1];

export default function Videos() {
  const [branch, setBranch] = useState("All");
  const list = VIDEOS.filter((v) => ytId(v.url) && (branch === "All" || v.branch === branch));

  return (
    <section>
      <h2>Lecture videos</h2>
      <label className="inline">
        Branch
        <select value={branch} onChange={(e) => setBranch(e.target.value)}>
          <option>All</option>
          {BRANCHES.map((b) => <option key={b}>{b}</option>)}
        </select>
      </label>
      {list.length === 0 ? (
        <p className="empty">No videos here yet. Add YouTube links in <code>src/data.js</code> (the VIDEOS list).</p>
      ) : (
        <div className="videos">
          {list.map((v) => (
            <figure key={v.url}>
              <iframe src={`https://www.youtube.com/embed/${ytId(v.url)}`} title={v.title} loading="lazy" allowFullScreen />
              <figcaption>{v.title}<small>{v.branch}</small></figcaption>
            </figure>
          ))}
        </div>
      )}
    </section>
  );
}
