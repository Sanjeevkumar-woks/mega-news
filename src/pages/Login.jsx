import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/authSlice";

import AuthService from "../services/authService";
import { message } from "antd";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validateField = (name, value) => {
    let error = "";
    if (name === "username") {
      if (!value.trim()) {
        error = "Username is required";
      } else if (value.length < 3) {
        error = "Username must be at least 3 characters";
      }
    } else if (name === "password") {
      if (!value) {
        error = "Password is required";
      } else if (value.length < 6) {
        error = "Password must be at least 6 characters";
      }
    }
    return error;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const validate = () => {
    let validationErrors = {};
    for (let field in data) {
      const error = validateField(field, data[field]);
      if (error) {
        validationErrors[field] = error;
      }
    }
    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      const { username, password } = data;

      try {
        const response = await AuthService.login({
          userName: username,
          password,
        });

        if (response.status !== 200) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to login");
        }

        // Decode token
        const decodedToken = jwtDecode(response.data.token);
        const { emailId, userName, _id } = decodedToken;

        const user = { emailId, userName, _id };

        dispatch(login({ user: user, token: response.data.token }));

        // Store in local
        localStorage.setItem("token", response.data.token);

        navigate("/");
      } catch (error) {
        console.error("Failed to login:", error);
        message.error("Failed to login. Please try again.");
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-400 to-red-400">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login to Your Account
        </h2>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 font-semibold mb-2"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={data.username}
            onChange={handleChange}
            onBlur={handleBlur} // Added onBlur event
            className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400 ${
              errors.username ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your username"
            required
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username}</p>
          )}
        </div>
        <div className="mb-4 relative">
          <label
            htmlFor="password"
            className="block text-gray-700 font-semibold mb-2"
          >
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            onBlur={handleBlur} // Added onBlur event
            className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400 ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your password"
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-500"
          >
            {showPassword ? (
              <i className="fa-solid fa-eye-slash"></i>
            ) : (
              <i className="fa-solid fa-eye"></i>
            )}
          </button>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>
        <div className="flex justify-between items-center mb-6">
          <a href="/forgetPassword" className="text-indigo-600 hover:underline">
            Forgot Password?
          </a>
          <a href="/signIn" className="text-indigo-600 hover:underline">
            Register
          </a>
        </div>
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition-colors duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
