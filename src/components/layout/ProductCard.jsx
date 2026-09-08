import { Link } from "react-router-dom";
import Badge from "../ui/Badge";
import { RatingStars } from "../ui/ReviewCard";

const ProductCard = ({
  product,
  imageSrc,
  section = "new-arrivals",
}) => {
  if (!product) return null;

  const productId = product._id || product.id;
  const rating = Number(product.rating) || 0;
  const price = Number(product.price) || 0;
  const originalPrice = product.originalPrice ? Number(product.originalPrice) : null;

  const discountPercent =
    originalPrice && originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  return (
    <Link
      className={`${section}__product-card`}
      data-product-id={productId}
      to={`/products/${productId}`}
    >
      <div className="image">
        <img
          src={imageSrc || "/assets/images/placeholder.png"}
          alt={product.name || "Product"}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/assets/images/placeholder.png";
          }}
        />
      </div>
      <div className="text-area">
        <h2 className="title">{product.name}</h2>
        <div className="rating">
          <RatingStars rating={rating} />
          <span>{rating ? rating.toFixed(1) : "0"}/5</span>
        </div>
        <div className="price-row">
          <h3 className="price">${price}</h3>
          {originalPrice && (
            <span className="price__original">${originalPrice}</span>
          )}
          {discountPercent > 0 && <Badge text={`-${discountPercent}%`} />}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

