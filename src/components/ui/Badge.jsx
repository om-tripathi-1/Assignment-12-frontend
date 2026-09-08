import React from "react";

const Badge = ({ text, className = "price__discount" }) => {
  if (!text) return null;
  return <span className={className}>{text}</span>;
};

export default Badge;
