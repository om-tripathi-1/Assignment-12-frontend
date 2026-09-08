import { Link } from "react-router-dom";
import React from "react";
import AuthField from "./AuthField";

const AuthForm = ({
  title,
  fields = [],
  formData,
  onChange,
  onSubmit,
  buttonText = "Submit",
  message = "",
  redirectText = "",
  redirectLink = "/",
  redirectLabel = "",
}) => {
  return (
    <div className="login-page">
      <div className="login-page__card">
        <h1 className="page-heading">{title}</h1>

        <form className="login-page__form" onSubmit={onSubmit} noValidate={false}>
          {fields.map((field) => (
            <AuthField
              key={field.name}
              label={field.label}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              value={formData[field.name] || ""}
              onChange={onChange}
            />
          ))}

          <button type="submit" className="login-page__button">
            {buttonText}
          </button>

          {message && (
            <p className="login-page__message" role="alert" aria-live="polite">
              {message}
            </p>
          )}
        </form>

        {redirectLink && (
          <p className="login-page__redirect">
            {redirectText}{" "}
            <Link to={redirectLink} className="redirect-link">
              {redirectLabel}
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;

