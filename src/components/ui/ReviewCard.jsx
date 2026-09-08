import verifiedIcon from "../../assets/icons/green-tick.svg";
import fullStarIcon from "../../assets/icons/Star 1.svg";
import halfStarIcon from "../../assets/icons/Star 5.svg";

export const RatingStars = ({ rating = 0 }) => {
  const numericRating = Number(rating) || 0;
  const roundedRating = Math.min(5, Math.max(0, Math.round(numericRating * 2) / 2));
  const fullStars = Math.floor(roundedRating);
  const hasHalfStar = roundedRating % 1 !== 0;

  return (
    <span
      className="review-card__stars"
      role="img"
      aria-label={`${numericRating.toFixed(1)} out of 5 stars`}
    >
      {Array.from({ length: fullStars }, (_, index) => (
        <img
          className="review-card__star"
          src={fullStarIcon}
          alt=""
          key={`full-${index}`}
          aria-hidden="true"
        />
      ))}
      {hasHalfStar && (
        <img
          className="review-card__star review-card__star--half"
          src={halfStarIcon}
          alt=""
          aria-hidden="true"
        />
      )}
    </span>
  );
};

const ReviewCard = ({ review, variant = "product", showDate = false }) => {
  if (!review) return null;

  const authorName = review.user?.name || review.name || "Verified Customer";
  const commentText = review.comment || review.text || "";

  return (
    <article className={`review-card review-card--${variant}`}>
      <RatingStars rating={review.rating} />
      <h3 className="review-card__name">
        {authorName}{" "}
        <img
          className="review-card__verified-icon"
          src={verifiedIcon}
          alt="Verified buyer badge"
        />
      </h3>
      <p className="review-card__comment">{commentText}</p>
      {showDate && review.createdAt && (
        <small className="review-card__date">
          Posted on {new Date(review.createdAt).toLocaleDateString()}
        </small>
      )}
    </article>
  );
};

export default ReviewCard;
