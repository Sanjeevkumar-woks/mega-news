import { useState } from "react";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const validateEmail = () => {
    let error = "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      error = "Email is required";
    } else if (!emailRegex.test(email)) {
      error = "Invalid email address";
    }
    return error;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateEmail();

    if (error) {
      setErrors(error);
      return;
    }

    setIsLoading(true);
    setErrors("");

    try {
      const response = await fetch(
        "https://resetpassword-kiv9.onrender.com/auth-service/auth/forgetPassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ emailId: email }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send reset link.");
      }

      alert("Password reset link sent to your email.");
      setEmail("");

      //redirect to login page after 1 seconds
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } catch (error) {
      console.error("Failed to send reset link:", error);
      setErrors(
        error.message || "Failed to send reset link. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-400 to-red-400">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Forgot Password
        </h2>

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-semibold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-indigo-500 ${
              errors ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your email address"
            required
          />
          {errors && <p className="text-red-500 text-sm mt-1">{errors}</p>}
        </div>

        <div className="flex justify-between items-center mb-6">
          <a href="/signIn" className="text-indigo-600 hover:underline">
            Register
          </a>
          <a href="/login" className="text-indigo-600 hover:underline">
            Login
          </a>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition-colors duration-300 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
};

export default ForgetPassword;
