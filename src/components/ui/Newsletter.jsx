import React from 'react'
import Button from './Button'

const Newsletter = () => {
  return (
    <section className="newsletter">
      <div className="newsletter__container">
        <h2 className="newsletter__text">STAY UPTO DATE ABOUT OUR LATEST OFFERS</h2>
        <div className="newsletter__input-container">
          <input className="newsletter__input" type="text" name="newsletter input" placeholder=" Enter your email address" />
          <Button className="newsletter__button" text="Subscribe" />
        </div>
      </div>
    </section>
  )
}

export default Newsletter