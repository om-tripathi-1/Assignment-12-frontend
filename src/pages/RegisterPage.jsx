import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthForm from "../components/ui/AuthForm";
import { registerUser } from "../api/auth.service.js";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const fields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter your name",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
    },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    await registerUser(formData)
      .then((response) => {
        console.log("Registration successful:", response);
        setMessage("Registration successful!");
        navigate(location.state?.from || "/");
      })
      .catch((error) => {
        console.error("Error registering:", error);
        setMessage("Registration failed. Please try again.");
      });
  };

  return (
    <AuthForm
      title="Register"
      fields={fields}
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      buttonText="Register"
      message={message}
      redirectText="Already have an account?"
      redirectLink="/login"
      redirectLabel="Login now"
    />
  );
};

export default Register;
