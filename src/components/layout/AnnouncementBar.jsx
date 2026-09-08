import React from "react";
import { Link } from "react-router-dom";

const AnnouncementBar = () => {
  return (
    <aside className="announcement-bar" aria-label="Special offer announcement">
      <div className="announcement-bar__text">
        <p>
          Sign up and get 20% off your first order.{" "}
          <Link to="/register" className="announcement-bar__link">
            Sign Up Now
          </Link>
        </p>
      </div>
    </aside>
  );
};

export default AnnouncementBar;

