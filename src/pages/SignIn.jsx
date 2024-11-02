import { useState } from "react";
import { message } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      emailId: "",
      userName: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      emailId: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      userName: Yup.string()
        .min(3, "Username must be at least 3 characters")
        .required("Username is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch(
          "https://news-service-320c.onrender.com/api/auth/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userName: values.userName,
              emailId: values.emailId,
              password: values.password,
            }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          message.error(errorData.error || "Registration failed");
        }

        formik.resetForm();
        const result = await response.json();
        message.success(result.message || "Registration successful");

        // Redirect to login page after 1 second
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      } catch (error) {
        console.error("Registration request failed:", error);
        message.error(error.message || "An error occurred during registration");
      }
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-400 to-red-400 py-10 ">
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Sign In to Your Account
        </h2>

        {/* Email Field */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-semibold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="emailId"
            name="emailId"
            value={formik.values.emailId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-indigo-500 ${
              formik.touched.emailId && formik.errors.emailId
                ? "border-red-500"
                : "border-gray-300"
            }`}
            placeholder="Enter your email"
            required
          />
          {formik.touched.emailId && formik.errors.emailId && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.emailId}</p>
          )}
        </div>

        {/* Username Field */}
        <div className="mb-4">
          <label
            htmlFor="userName"
            className="block text-gray-700 font-semibold mb-2"
          >
            Username
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formik.values.userName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-indigo-500 ${
              formik.touched.userName && formik.errors.userName
                ? "border-red-500"
                : "border-gray-300"
            }`}
            placeholder="Enter your username"
            required
          />
          {formik.touched.userName && formik.errors.userName && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.userName}
            </p>
          )}
        </div>

        {/* Password Field */}
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
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-indigo-500 ${
              formik.touched.password && formik.errors.password
                ? "border-red-500"
                : "border-gray-300"
            }`}
            placeholder="Enter your password"
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute top-3/4 transform -translate-y-1/2 right-3 text-gray-500"
          >
            {showPassword ? (
              <i className="fa-solid fa-eye-slash"></i>
            ) : (
              <i className="fa-solid fa-eye"></i>
            )}
          </button>
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.password}
            </p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="mb-4 relative">
          <label
            htmlFor="confirmPassword"
            className="block text-gray-700 font-semibold mb-2"
          >
            Confirm Password
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-indigo-500 ${
              formik.touched.confirmPassword && formik.errors.confirmPassword
                ? "border-red-500"
                : "border-gray-300"
            }`}
            placeholder="Confirm your password"
            required
          />
          <button
            type="button"
            onClick={toggleConfirmPasswordVisibility}
            className="absolute top-3/4 transform -translate-y-1/2 right-3 text-gray-500"
          >
            {showConfirmPassword ? (
              <i className="fa-solid fa-eye-slash"></i>
            ) : (
              <i className="fa-solid fa-eye"></i>
            )}
          </button>
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.confirmPassword}
            </p>
          )}
        </div>

        <div className="flex justify-between items-center mb-6">
          <a href="/forgetPassword" className="text-indigo-600 hover:underline">
            Forgot Password?
          </a>
          <a href="/login" className="text-indigo-600 hover:underline">
            Login
          </a>
        </div>
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition-colors duration-300"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
