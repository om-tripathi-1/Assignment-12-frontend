import React from "react";

const AuthField = ({
  label,
  name,
  type = "text",
  placeholder = "",
  value = "",
  onChange,
}) => {
  return (
    <div className="login-page__field">
      <label className="login-label" htmlFor={name}>
        {label}
      </label>
      <input
        className="login-input"
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={name === "password" ? "current-password" : name}
      />
    </div>
  );
};

export default AuthField;
