import { Link } from "react-router-dom";
import Badge from "../ui/Badge";
import { RatingStars } from "../ui/ReviewCard";

const ProductCard = ({
  product,
  imageSrc,
  section = "new-arrivals",
  className = "",
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

  const cardClasses = [
    "product-card",
    section ? `${section}__product-card` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Link
      className={cardClasses}
      data-product-id={productId}
      to={`/products/${productId}`}
    >
      <div className={`image product-card__image ${section ? `${section}__product-image` : ""}`.trim()}>
        <img
          className={`image-img product-card__img product-card__image-element ${section ? `${section}__product-image-element` : ""}`.trim()}
          src={imageSrc || "/assets/images/placeholder.png"}
          alt={product.name || "Product"}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/assets/images/placeholder.png";
          }}
        />
      </div>
      <div className="text-area product-card__text-area">
        <h2 className="title product-card__title">{product.name}</h2>
        <div className="rating product-card__rating">
          <RatingStars rating={rating} />
          <span className="product-card__rating-score rating__score">{rating ? rating.toFixed(1) : "0"}/5</span>
        </div>
        <div className="price-row product-card__price-row">
          <h3 className="price product-card__price">${price}</h3>
          {originalPrice && (
            <span className="price__original product-card__price-original">${originalPrice}</span>
          )}
          {discountPercent > 0 && (
            <Badge
              className="price__discount product-card__price-discount"
              text={`-${discountPercent}%`}
            />
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

