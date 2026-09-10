import { useState } from "react";
import Button from "./Button";


const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email.trim()) {
      setValidationMessage("Please enter your email address.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setValidationMessage("Please enter a valid email address.");
      return;
    }

    if (email.trim()) {
      setValidationMessage("");
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
            <p className="newsletter__success">
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
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (validationMessage) setValidationMessage("");
                }}
                required
                aria-label="Email address for newsletter"
              />
              {validationMessage && (
                <p className="newsletter__error" role="alert">
                  {validationMessage}
                </p>
              )}
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
