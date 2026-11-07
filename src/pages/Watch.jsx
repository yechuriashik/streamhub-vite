import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getContentLibrary, getWatchlist, toggleWatchlist } from "../utils/storage";
import { useAuth } from "../context/AuthContext";

export default function Watch() {
  const { id } = useParams();
  const { session } = useAuth();
  const [media, setMedia] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const catalog = getContentLibrary();
    const found = catalog.find(item => item.id === id);
    setMedia(found);

    if (session) {
      const list = getWatchlist(session.email);
      setIsSaved(list.includes(id));
    }
  }, [id, session]);

  const handleToggleWatchlist = () => {
    if (!session) return;
    const updatedList = toggleWatchlist(session.email, id);
    setIsSaved(updatedList.includes(id));
  };

  if (!media) return <div style={{ padding: "4rem", textAlign: "center" }}>Media title not found.</div>;

  return (
    <div className="player-wrap">
      <div className="player">
        <video controls autoPlay src={media.videoUrl} key={media.videoUrl}></video>
      </div>

      <div className="watch-info">
        <div className="watch-info__top">
          <div>
            <h1>{media.title}</h1>
            <p className="watch-info__meta">{media.category} • {media.year} • {media.duration}</p>
          </div>
          <button onClick={handleToggleWatchlist} className={`btn ${isSaved ? "btn--active" : ""}`}>
            {isSaved ? "✓ In Watchlist" : "+ My List"}
          </button>
        </div>
        <p className="watch-info__desc">{media.desc}</p>
      </div>
    </div>
  );
}