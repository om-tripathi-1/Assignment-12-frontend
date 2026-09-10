import { useEffect, useState } from "react";
import { createReview } from "../../api/review.service";

const ReviewModal = ({
  isOpen,
  onClose,
  productId,
  onReviewAdded,
}) => {
  const [rating, setRating] = useState("5");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setRating("5");
      setComment("");
      setError("");
      setIsSubmitting(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && !isSubmitting && onClose) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, isSubmitting, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget && !isSubmitting && onClose) {
      onClose();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!comment.trim()) {
      setError("Please write your review before submitting.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const newReview = await createReview({
        productId,
        rating: Number(rating),
        comment: comment.trim(),
      });

      if (onReviewAdded) {
        onReviewAdded(newReview);
      }
      onClose();
    } catch (submitError) {
      setError(
        submitError.response?.data?.message || "Failed to submit your review."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="review-modal"
      role="presentation"
      onMouseDown={handleBackdropClick}
    >
      <section
        className="review-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="review-modal-title"
      >
        <div className="review-modal__header">
          <div>
            <p className="review-modal__eyebrow">Verified Purchase</p>
            <h2 id="review-modal-title">Write a Review</h2>
          </div>
          <button
            className="review-modal__close"
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Close review modal"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="review-modal__form">
          <div className="review-modal__field">
            <label htmlFor="review-rating" className="review-modal__label">
              Rating
            </label>
            <select
              id="review-rating"
              className="review-modal__select"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              disabled={isSubmitting}
            >
              <option value="5">5 Stars - Excellent</option>
              <option value="4">4 Stars - Very Good</option>
              <option value="3">3 Stars - Average</option>
              <option value="2">2 Stars - Poor</option>
              <option value="1">1 Star - Terrible</option>
            </select>
          </div>

          <div className="review-modal__field">
            <label htmlFor="review-comment" className="review-modal__label">
              Your Review
            </label>
            <textarea
              id="review-comment"
              className="review-modal__textarea"
              rows={4}
              placeholder="What did you like or dislike about this product?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          {error && (
            <p className="review-modal__error" role="alert">
              {error}
            </p>
          )}

          <div className="review-modal__actions">
            <button
              className="review-modal__cancel"
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              className="review-modal__submit"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default ReviewModal;
