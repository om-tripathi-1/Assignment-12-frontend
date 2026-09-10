import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthForm from "../components/ui/AuthForm";
import { useAuth } from "../contexts/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fields = [
    {
      name: "name",
      label: "Full Name",
      type: "text",
      placeholder: "e.g. Alex Johnson",
    },
    {
      name: "email",
      label: "Email Address",
      type: "email",
      placeholder: "yourname@gmail.com",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Create a secure password",
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

    if (!formData.name.trim() || !formData.email.trim() || !formData.password) {
      setMessage("Please complete all registration fields.");
      return;
    }

    if (formData.name.trim().length < 2) {
      setMessage("Name must be at least 2 characters.");
      return;
    }

    if (!formData.email.endsWith("@gmail.com")) {
      setMessage("Please register with a @gmail.com email address.");
      return;
    }

    if (formData.password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }

    try {
      setIsSubmitting(true);
      await register(formData);
      navigate(location.state?.from || "/");
    } catch (error) {
      console.error("Registration failed:", error);
      setMessage(
        error.response?.data?.message ||
          "Registration could not be completed. Please verify your details."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthForm
      title="Create an Account"
      fields={fields}
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      buttonText={isSubmitting ? "Creating Account..." : "Register"}
      message={message}
      redirectText="Already have an account?"
      redirectLink="/login"
      redirectLabel="Log in here"
    />
  );
};

export default Register;

