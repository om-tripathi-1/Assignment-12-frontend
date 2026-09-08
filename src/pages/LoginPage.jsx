import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthForm from "../components/ui/AuthForm";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fields = [
    {
      name: "email",
      label: "Email Address",
      type: "email",
      placeholder: "name@example.com",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (message) setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!formData.email.trim() || !formData.password) {
      setMessage("Please enter both email and password.");
      return;
    }

    try {
      setIsSubmitting(true);
      await login(formData);
      navigate(location.state?.from || "/");
    } catch (error) {
      console.error("Login attempt failed:", error);
      setMessage(
        error.response?.data?.message ||
          "Invalid email or password. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthForm
      title="Welcome Back"
      fields={fields}
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      buttonText={isSubmitting ? "Logging in..." : "Login"}
      message={message}
      redirectText="Don't have an account yet?"
      redirectLink="/register"
      redirectLabel="Sign Up Now"
    />
  );
};

export default Login;

