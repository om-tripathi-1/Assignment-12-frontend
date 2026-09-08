const EmptyState = ({ title = "Nothing here yet.", description }) => (
  <div className="empty-state" role="status">
    <span className="empty-state__icon" aria-hidden="true">0</span>
    <h2>{title}</h2>
    {description && <p>{description}</p>}
  </div>
);

export default EmptyState;