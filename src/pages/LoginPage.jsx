import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthForm from "../components/ui/AuthForm";
import { loginUser } from "../api/auth.service.js";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const fields = [
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

    await loginUser(formData)
      .then((response) => {
        console.log("Login successful:", response);
        setMessage("Login successful!");
        navigate(location.state?.from || "/");
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        setMessage("Login failed. Please check your credentials.");
      });
  };

  return (
    <AuthForm
      title="Login"
      fields={fields}
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      buttonText="Login"
      message={message}
      redirectText="Don't have an account?"
      redirectLink="/register"
      redirectLabel="Register now"
    />
  );
};

export default Login;
