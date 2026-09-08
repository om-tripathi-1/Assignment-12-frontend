import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../components/ui/Breadcrumb";
import EmptyState from "../components/ui/EmptyState";
import ReviewCard, { RatingStars } from "../components/ui/ReviewCard";
import {
  getProductById,
  getProductImageUrl,
  getReviewsByProduct,
} from "../api/product.service";
import { addCartItem } from "../api/cart.service";

const ProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setIsLoading(true);
        const [productResponse, reviewResponse] = await Promise.all([
          getProductById(productId),
          getReviewsByProduct(productId),
        ]);
        setProduct(productResponse.product);
        setReviews(Array.isArray(reviewResponse) ? reviewResponse : []);
      } catch (loadError) {
        setError(
          loadError.response?.data?.message || "Unable to load this product.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  const images = product?.images || [];
  const sizes =
    product?.variants?.map((variant) => variant.size).filter(Boolean) || [];
  const averageRating = useMemo(
    () =>
      reviews.length
        ? reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        : 0,
    [reviews],
  );
  const discountPercent = product?.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const addToCart = async () => {
    try {
      await addCartItem(product._id, quantity);
      navigate("/cart");
    } catch (addError) {
      if (addError.response?.status === 401) {
        navigate("/login", { state: { from: `/products/${productId}` } });
      } else {
        setError(addError.response?.data?.message || "Unable to add this product to your cart.");
      }
    }
  };

  if (isLoading)
    return <main className="product-detail-state">Loading product...</main>;
  if (error || !product)
    return (
      <main className="product-detail-state">
        <EmptyState title={error || "Product not found."} />
      </main>
    );

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", to: "/" },
          { label: "Shop", to: "/" },
          { label: product.category?.name || "Product" },
          { label: product.name },
        ]}
      />
      <main className="product-detail-page">
        <section className="product-detail">
          <div className="product-gallery">
            <div className="product-gallery__thumbs">
              {images.map((image, index) => (
                <button
                  className={`product-gallery__thumbnail ${selectedImage === index ? "product-gallery__thumbnail--selected" : ""}`}
                  key={image}
                  type="button"
                  onClick={() => setSelectedImage(index)}
                  aria-label={`Show image ${index + 1}`}
                >
                  <img
                    className="product-gallery__thumbnail-image"
                    src={getProductImageUrl(image)}
                    alt={`${product.name} view ${index + 1}`}
                  />
                </button>
              ))}
            </div>
            <div className="product-gallery__main">
              <img
                className="product-gallery__main-image"
                src={getProductImageUrl(images[selectedImage])}
                alt={product.name}
              />
            </div>
          </div>

          <section className="product-detail__content">
            <h1 className="product-detail__title">{product.name}</h1>
            <div className="product-detail__rating">
              <RatingStars rating={averageRating} />
              <span className="product-detail__rating-value">
                {averageRating.toFixed(1)}/5 ({reviews.length} reviews)
              </span>
            </div>
            <div className="product-detail__price-row">
              <strong className="product-detail__price">
                ${product.price}
              </strong>
              {product.originalPrice && (
                <del className="product-detail__original-price">
                  ${product.originalPrice}
                </del>
              )}
              {discountPercent > 0 && (
                <span className="product-detail__discount">
                  -{discountPercent}%
                </span>
              )}
            </div>
            <p className="product-detail__description">
              {product.description ||
                "This product is made for everyday comfort and effortless style."}
            </p>

            <div className="product-detail__option">
              <span className="product-detail__option-label">
                Select Colors
              </span>
              <p className="product-detail__muted">
                Color options are not available for this product.
              </p>
            </div>
            <div className="product-detail__option">
              <span className="product-detail__option-label">Choose Size</span>
              <div className="product-detail__sizes">
                {sizes.length ? (
                  sizes.map((size) => (
                    <button
                      className={`product-detail__size ${selectedSize === size ? "product-detail__size--selected" : ""}`}
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))
                ) : (
                  <p className="product-detail__muted">No sizes available</p>
                )}
              </div>
            </div>
            <div className="product-detail__purchase">
              <div className="product-detail__quantity">
                <button
                  className="product-detail__quantity-button"
                  type="button"
                  onClick={() =>
                    setQuantity((current) => Math.max(1, current - 1))
                  }
                >
                  −
                </button>
                <span className="product-detail__quantity-value">
                  {quantity}
                </span>
                <button
                  className="product-detail__quantity-button"
                  type="button"
                  onClick={() => setQuantity((current) => current + 1)}
                >
                  +
                </button>
              </div>
              <button className="product-detail__add" type="button" onClick={addToCart}>
                Add to Cart
              </button>
            </div>
          </section>
        </section>

        <section className="product-reviews" aria-labelledby="reviews-heading">
          <div className="product-reviews__header">
            <h2 className="product-reviews__title" id="reviews-heading">
              Rating & Reviews{" "}
              <span className="product-reviews__count">({reviews.length})</span>
            </h2>
            <button className="product-reviews__write-button" type="button">
              Write a Review
            </button>
          </div>
          {reviews.length ? (
            <div className="product-reviews__grid">
              {reviews.map((review) => (
                <ReviewCard key={review._id} review={review} showDate />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No reviews yet."
              description="Be the first to review this product."
            />
          )}
        </section>
      </main>
    </>
  );
};

export default ProductPage;
