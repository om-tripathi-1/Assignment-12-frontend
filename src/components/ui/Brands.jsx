import React from "react";

import versaceLogo from "../../assets/icons/versace.svg";
import zaraLogo from "../../assets/icons/zara-logo-1 1.svg";
import gucciLogo from "../../assets/icons/gucci-logo-1 1.svg";
import pradaLogo from "../../assets/icons/prada-logo-1 1.svg";
import ckLogo from "../../assets/icons/ck.svg";

const partnerBrands = [
  { name: "Versace", logo: versaceLogo },
  { name: "Zara", logo: zaraLogo },
  { name: "Gucci", logo: gucciLogo },
  { name: "Prada", logo: pradaLogo },
  { name: "Calvin Klein", logo: ckLogo },
];

const Brands = () => {
  return (
    <section className="brands" id="brands" aria-label="Featured partner brands">
      <div className="brands__container">
        {partnerBrands.map((brand) => (
          <img
            key={brand.name}
            src={brand.logo}
            alt={`${brand.name} logo`}
            className="brands__icons"
            loading="lazy"
          />
        ))}
      </div>
    </section>
  );
};

export default Brands;
