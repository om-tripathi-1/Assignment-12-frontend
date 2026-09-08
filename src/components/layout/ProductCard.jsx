import Badge from "../ui/Badge";
import { Link } from "react-router-dom";

const ProductCard = ({
    product,
    imageSrc,
    section = "new-arrivals",
}) => {
  const rating = Number(product.rating) || 0;
  const discountPercent = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <Link className={`${section}__product-card`} data-product-id={product._id || product.id} to={`/products/${product._id}`}>
      <div className="image">
        <img src={imageSrc} alt={product.name} />
      </div>
      <div className="text-area">
        <h2 className="title">{product.name}</h2>
        <div className="rating">
          <span className="product-rating" aria-label={`${rating} out of 5 stars`}>★★★★★</span>
          <span>{rating}/5</span>
        </div>
        <div className="price-row">
          <h3 className="price">${product.price}</h3>
          {product.originalPrice && <span className="price__original">${product.originalPrice}</span>}
          {discountPercent
            ? <Badge text={`-${discountPercent}%`} />
            : null}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
