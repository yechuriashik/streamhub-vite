import React, { useState, useEffect } from "react";
import { getContentLibrary, saveContentLibrary } from "../utils/storage";

export default function Admin() {
  const [catalog, setCatalog] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Action");
  const [desc, setDesc] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [poster, setPoster] = useState("");

  useEffect(() => {
    setCatalog(getContentLibrary());
  }, []);

  const handleAddMedia = (e) => {
    e.preventDefault();
    const newMedia = {
      id: "c" + String(Date.now()).slice(-4),
      title,
      category,
      year: new Date().getFullYear(),
      duration: "10 min",
      desc,
      videoUrl,
      poster: poster || "images/c01.jpg"
    };

    const updatedCatalog = [...catalog, newMedia];
    setCatalog(updatedCatalog);
    saveContentLibrary(updatedCatalog);

    setTitle("");
    setDesc("");
    setVideoUrl("");
    setPoster("");
    alert(`Success: "${title}" added to catalog!`);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this title?")) {
      const updatedCatalog = catalog.filter(item => item.id !== id);
      setCatalog(updatedCatalog);
      saveContentLibrary(updatedCatalog);
    }
  };

  return (
    <div style={{ maxWidth: "900px", margin: "2rem auto", padding: "0 1rem" }}>
      <div className="auth-card" style={{ maxWidth: "100%", marginBottom: "3rem" }}>
        <h2>Add New Streaming Title</h2>
        <form onSubmit={handleAddMedia} className="auth-form" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <label>Title
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
          </label>
          <label>Category
            <select value={category} onChange={e => setCategory(e.target.value)}>
              <option value="Action">Action</option>
              <option value="Drama">Drama</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Comedy">Comedy</option>
            </select>
          </label>
          <label style={{ gridColumn: "span 2" }}>Description
            <input type="text" value={desc} onChange={e => setDesc(e.target.value)} required />
          </label>
          <label>Video URL (.mp4)
            <input type="url" value={videoUrl} onChange={e => setVideoUrl(e.target.value)} placeholder="https://..." required />
          </label>
          <label>Poster Path
            <input type="text" value={poster} onChange={e => setPoster(e.target.value)} placeholder="images/c01.jpg" />
          </label>
          <button type="submit" className="btn btn--active" style={{ gridColumn: "span 2", marginTop: "0.5rem" }}>
            Add Title to System
          </button>
        </form>
      </div>

      <h2>Catalog Items</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #27272a", textAlign: "left", color: "#a1a1aa" }}>
            <th style={{ padding: "0.5rem" }}>ID</th>
            <th style={{ padding: "0.5rem" }}>Title</th>
            <th style={{ padding: "0.5rem" }}>Category</th>
            <th style={{ padding: "0.5rem", textAlign: "right" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {catalog.map(item => (
            <tr key={item.id} style={{ borderBottom: "1px solid #27272a" }}>
              <td style={{ padding: "0.5rem" }}><code>{item.id}</code></td>
              <td style={{ padding: "0.5rem" }}>{item.title}</td>
              <td style={{ padding: "0.5rem" }}>{item.category}</td>
              <td style={{ padding: "0.5rem", textAlign: "right" }}>
                <button onClick={() => handleDelete(item.id)} className="btn" style={{ background: "#dc2626", border: "none" }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}