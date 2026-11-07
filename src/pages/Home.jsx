import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getContentLibrary } from "../utils/storage";

export default function Home() {
  const [catalog, setCatalog] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setCatalog(getContentLibrary());
  }, []);

  const filtered = catalog.filter(item => 
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <section className="hero">
        <p className="hero__eyebrow">Now Streaming</p>
        <h1 className="hero__title">Something new,<br />every shelf.</h1>
        <p className="hero__sub">Browse titles or search by your favorite genre.</p>
      </section>

      <div style={{ maxWidth: "600px", margin: "0 auto 2rem auto", padding: "0 1rem" }}>
        <input
          type="search"
          placeholder="Search titles or genres..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: "100%", padding: "0.75rem", background: "#18181b", border: "1px solid #27272a", color: "#fff", borderRadius: "6px" }}
        />
      </div>

      <div className="grid">
        {filtered.map(item => (
          <Link to={`/watch/${item.id}`} key={item.id} className="card">
            {item.poster ? (
              <img src={item.poster} alt={item.title} className="card__img" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
            ) : null}
            <div className="card__img" style={{ display: item.poster ? 'none' : 'flex' }}>
              {item.title[0]}
            </div>
            <div className="card__body">
              <div className="card__title">{item.title}</div>
              <div className="card__meta">{item.category} • {item.year}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}