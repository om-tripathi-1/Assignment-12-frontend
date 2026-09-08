import React from "react";

const Button = ({
  className = "",
  text,
  children,
  onClick,
  type = "button",
  disabled = false,
  ...rest
}) => {
  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {text || children}
    </button>
  );
};

export default Button;

