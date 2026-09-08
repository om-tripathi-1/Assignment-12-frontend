import React from "react";

const AnnouncementBar = () => {
  return (
    <section className="announcement-bar">
      <div className="announcement-bar__text">
        <p>
          Sign up and get 20% off to your first order.
          <a href="/login">Sign Up Now</a>
        </p>
      </div>
    </section>
  );
};

export default AnnouncementBar;
