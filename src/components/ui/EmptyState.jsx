import React from "react";

const EmptyState = ({
  title = "Nothing here yet.",
  description = "",
  icon = "🛍️",
}) => (
  <div className="empty-state" role="status">
    <span className="empty-state__icon" aria-hidden="true">
      {icon}
    </span>
    <h2>{title}</h2>
    {description && <p>{description}</p>}
  </div>
);

export default EmptyState;
