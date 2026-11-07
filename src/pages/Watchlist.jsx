import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getContentLibrary, getWatchlist } from "../utils/storage";

export default function Watchlist() {
  const { session } = useAuth();
  const [savedItems, setSavedItems] = useState([]);

  useEffect(() => {
    if (session) {
      const userWatchlist = getWatchlist(session.email);
      const catalog = getContentLibrary();
      const items = catalog.filter(c => userWatchlist.includes(c.id));
      setSavedItems(items);
    }
  }, [session]);

  return (
    <div>
      <section className="hero">
        <p className="hero__eyebrow">Saved</p>
        <h1 className="hero__title">My List</h1>
        <p className="hero__sub">Everything you have saved in one place.</p>
      </section>

      {savedItems.length === 0 ? (
        <p style={{ textAlign: "center", color: "#a1a1aa", marginTop: "2rem" }}>
          Nothing saved yet — add titles from Browse!
        </p>
      ) : (
        <div className="grid">
          {savedItems.map(item => (
            <Link to={`/watch/${item.id}`} key={item.id} className="card">
              <div className="card__img">{item.title[0]}</div>
              <div className="card__body">
                <div className="card__title">{item.title}</div>
                <div className="card__meta">{item.category} • {item.year}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}