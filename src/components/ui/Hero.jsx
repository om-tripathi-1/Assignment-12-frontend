import { useNavigate } from "react-router-dom";
import Button from "./Button.jsx";
import diamondVector from "../../assets/icons/diamond-vector.svg";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero__text">
        <h1 className="hero__heading">FIND CLOTHES THAT MATCHES YOUR STYLE</h1>
        <p className="hero__para">
          Browse through our diverse range of meticulously crafted garments,
          designed to bring out your individuality and cater to your sense of
          style.
        </p>
        <Button
          className="hero__button"
          text="Shop Now"
          onClick={() => navigate("/category")}
        />
        <div className="hero__stats-grid">
          <div className="hero__stat-box first-stat-box">
            <h4 className="text-stat">200+</h4>
            <p className="para-stat">International Brands</p>
          </div>

          <div className="hero__stat-box second-stat-box">
            <h4 className="text-stat">2000+</h4>
            <p className="para-stat">High-Quality Products</p>
          </div>

          <div className="hero__stat-box last-stat-box">
            <h4 className="text-stat">30,000+</h4>
            <p className="para-stat">Happy Customers</p>
          </div>
        </div>
      </div>
      <div className="hero__bg" aria-hidden="true">
        <img
          src={diamondVector}
          alt=""
          className="hero__bg__diamond-vector-1"
        />
        <img
          src={diamondVector}
          alt=""
          className="hero__bg__diamond-vector-2"
        />
      </div>
    </section>
  );
};

export default Hero;
