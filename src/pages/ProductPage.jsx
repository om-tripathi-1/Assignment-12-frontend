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
import { useCart } from "../contexts/CartContext";

const ProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState("");
  const [sizeWarning, setSizeWarning] = useState("");

  useEffect(() => {
    let isCurrent = true;

    const loadProduct = async () => {
      try {
        setIsLoading(true);
        setError("");
        const [productResponse, reviewResponse] = await Promise.all([
          getProductById(productId),
          getReviewsByProduct(productId),
        ]);

        if (isCurrent) {
          const loadedProduct = productResponse.product || productResponse;
          setProduct(loadedProduct);
          setReviews(Array.isArray(reviewResponse) ? reviewResponse : []);

          const availableSizes =
            loadedProduct?.variants?.map((v) => v.size).filter(Boolean) || [];
          if (availableSizes.length > 0) {
            setSelectedSize(availableSizes[0]);
          }
        }
      } catch (loadError) {
        if (isCurrent) {
          setError(
            loadError.response?.data?.message || "Unable to load this product."
          );
        }
      } finally {
        if (isCurrent) setIsLoading(false);
      }
    };

    loadProduct();

    return () => {
      isCurrent = false;
    };
  }, [productId]);

  const images = product?.images || [];
  const sizes =
    product?.variants?.map((variant) => variant.size).filter(Boolean) || [];

  const averageRating = useMemo(() => {
    if (!reviews.length) return Number(product?.rating) || 0;
    return (
      reviews.reduce((sum, review) => sum + (Number(review.rating) || 0), 0) /
      reviews.length
    );
  }, [reviews, product]);

  const discountPercent =
    product?.originalPrice && product.originalPrice > product.price
      ? Math.round((1 - product.price / product.originalPrice) * 100)
      : 0;

  const handleAddToCart = async () => {
    if (sizes.length > 0 && !selectedSize) {
      setSizeWarning("Please choose a size before adding to cart.");
      return;
    }
    setSizeWarning("");

    try {
      setIsAdding(true);
      await addItem(product._id, quantity, { size: selectedSize });
      navigate("/cart");
    } catch (addError) {
      if (addError.response?.status === 401) {
        navigate("/login", { state: { from: `/products/${productId}` } });
      } else {
        setError(
          addError.response?.data?.message ||
            "Unable to add this product to your cart."
        );
      }
    } finally {
      setIsAdding(false);
    }
  };

  if (isLoading) {
    return <main className="product-detail-state">Loading product details...</main>;
  }

  if (error || !product) {
    return (
      <main className="product-detail-state">
        <EmptyState title={error || "Product not found."} />
      </main>
    );
  }

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", to: "/" },
          { label: "Shop", to: "/category" },
          { label: product.category?.name || "Apparel", to: product.category?.name ? `/category/${product.category.name}` : "/category" },
          { label: product.name },
        ]}
      />

      <main className="product-detail-page">
        <section className="product-detail">
          <div className="product-gallery">
            <div className="product-gallery__thumbs">
              {images.map((image, index) => {
                const imgPath = typeof image === "string" ? image : image?.path || image?.url;
                return (
                  <button
                    className={`product-gallery__thumbnail ${selectedImage === index ? "product-gallery__thumbnail--selected" : ""}`}
                    key={`${imgPath}-${index}`}
                    type="button"
                    onClick={() => setSelectedImage(index)}
                    aria-label={`Switch to image view ${index + 1}`}
                  >
                    <img
                      className="product-gallery__thumbnail-image"
                      src={getProductImageUrl(imgPath)}
                      alt={`${product.name} view ${index + 1}`}
                    />
                  </button>
                );
              })}
            </div>
            <div className="product-gallery__main">
              <img
                className="product-gallery__main-image"
                src={getProductImageUrl(
                  typeof images[selectedImage] === "string"
                    ? images[selectedImage]
                    : images[selectedImage]?.path || images[selectedImage]?.url
                )}
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
              <strong className="product-detail__price">${product.price}</strong>
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
                "This product is crafted for everyday comfort, enduring quality, and effortless modern style."}
            </p>

            <div className="product-detail__option">
              <span className="product-detail__option-label">Choose Size</span>
              {sizeWarning && (
                <p style={{ color: "#d6455f", fontSize: "0.8rem", margin: "0.25rem 0" }}>
                  {sizeWarning}
                </p>
              )}
              <div className="product-detail__sizes">
                {sizes.length ? (
                  sizes.map((size) => (
                    <button
                      className={`product-detail__size ${selectedSize === size ? "product-detail__size--selected" : ""}`}
                      key={size}
                      type="button"
                      onClick={() => {
                        setSelectedSize(size);
                        setSizeWarning("");
                      }}
                    >
                      {size}
                    </button>
                  ))
                ) : (
                  <p className="product-detail__muted">Standard one-size</p>
                )}
              </div>
            </div>

            <div className="product-detail__purchase">
              <div className="product-detail__quantity" aria-label="Adjust product quantity">
                <button
                  className="product-detail__quantity-button"
                  type="button"
                  onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="product-detail__quantity-value">{quantity}</span>
                <button
                  className="product-detail__quantity-button"
                  type="button"
                  onClick={() => setQuantity((current) => current + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                className="product-detail__add"
                type="button"
                onClick={handleAddToCart}
                disabled={isAdding}
              >
                {isAdding ? "Adding to Cart..." : "Add to Cart"}
              </button>
            </div>
          </section>
        </section>

        <section className="product-reviews" aria-labelledby="reviews-heading">
          <div className="product-reviews__header">
            <h2 className="product-reviews__title" id="reviews-heading">
              Ratings & Reviews{" "}
              <span className="product-reviews__count">({reviews.length})</span>
            </h2>
          </div>

          {reviews.length ? (
            <div className="product-reviews__grid">
              {reviews.map((review) => (
                <ReviewCard key={review._id || review.id} review={review} showDate />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No reviews yet."
              description="Be the first customer to share your thoughts on this item."
            />
          )}
        </section>
      </main>
    </>
  );
};

export default ProductPage;

