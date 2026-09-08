import { useState } from "react";
import Button from "./Button";


const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="newsletter" aria-labelledby="newsletter-title">
      <div className="newsletter__container">
        <h2 id="newsletter-title" className="newsletter__text">
          STAY UP TO DATE ABOUT OUR LATEST OFFERS
        </h2>
        <form className="newsletter__input-container" onSubmit={handleSubmit}>
          {isSubscribed ? (
            <p className="newsletter__success" style={{ color: "#ffffff", fontWeight: 600 }}>
              ✓ Thank you for subscribing!
            </p>
          ) : (
            <>
              <input
                className="newsletter__input"
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Email address for newsletter"
              />
              <Button
                type="submit"
                className="newsletter__button"
                text="Subscribe"
              />
            </>
          )}
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
