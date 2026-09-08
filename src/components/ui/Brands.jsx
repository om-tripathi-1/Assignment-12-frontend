import React from 'react'
import versaceLogo from '../../assets/icons/versace.svg'
import zaraLogo from '../../assets/icons/zara-logo-1 1.svg'
import gucciLogo from '../../assets/icons/gucci-logo-1 1.svg'
import pradaLogo from '../../assets/icons/prada-logo-1 1.svg'
import ckLogo from '../../assets/icons/ck.svg'

const Brands = () => {
  return (
    <section className="brands" id="brands">
      <div className="brands__container">
        <img
          src={versaceLogo}
          alt="versace brand logo"
          className="brands__icons"
        />
        <img
          src={zaraLogo}
          alt="zara brand logo"
          className="brands__icons"
        />
        <img
          src={gucciLogo}
          alt="gucci brand logo"
          className="brands__icons"
        />
        <img
          src={pradaLogo}
          alt="prada brand logo"
          className="brands__icons"
        />
        <img
          src={ckLogo}
          alt="CK brand logo"
          className="brands__icons"
        />
      </div>
    </section>
  )
}

export default Brands