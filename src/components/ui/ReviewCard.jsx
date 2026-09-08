import verifiedIcon from "../../assets/icons/green-tick.svg";
import fullStarIcon from "../../assets/icons/Star 1.svg";
import halfStarIcon from "../../assets/icons/Star 5.svg";

export const RatingStars = ({ rating = 0 }) => {
  const roundedRating = Math.min(5, Math.max(0, Math.round(Number(rating) * 2) / 2));
  const fullStars = Math.floor(roundedRating);
  const hasHalfStar = roundedRating % 1 !== 0;

  return (
    <span className="review-card__stars" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: fullStars }, (_, index) => <img className="review-card__star" src={fullStarIcon} alt="" key={`full-${index}`} />)}
      {hasHalfStar && <img className="review-card__star review-card__star--half" src={halfStarIcon} alt="" />}
    </span>
  );
};

const ReviewCard = ({ review, variant = "product", showDate = false }) => {
  const name = review.user?.name || review.name || "Verified customer";
  const comment = review.comment || review.text || "";

  return (
    <article className={`review-card review-card--${variant}`}>
      <RatingStars rating={review.rating} />
      <h3 className="review-card__name">{name} <img className="review-card__verified-icon" src={verifiedIcon} alt="Verified review" /></h3>
      <p className="review-card__comment">{comment}</p>
      {showDate && review.createdAt && <small className="review-card__date">Posted on {new Date(review.createdAt).toLocaleDateString()}</small>}
    </article>
  );
};

export default ReviewCard;