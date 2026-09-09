import React from "react";

const EmptyState = ({
  title = "Nothing here yet.",
  description = "",
}) => (
  <div className="empty-state" role="status">
    <h2>{title}</h2>
    {description && <p>{description}</p>}
  </div>
);

export default EmptyState;
