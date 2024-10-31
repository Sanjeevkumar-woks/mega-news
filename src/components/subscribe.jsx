import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import logo from "../assets/subscribe.png";
import { useSelector } from "react-redux";
import axios from "axios";
import { message } from "antd"; // Import message from antd

const SubscriptionForm = () => {
  const user = useSelector((state) => state.auth.user);

  // Define validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required"),
  });

  // Handle form submission
  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    setSubmitting(true);

    if (user === null) {
      message.error("Please login to subscribe"); // Replace alert with message
      setSubmitting(false);
      return;
    }

    try {
      // Check if preferences already exist
      const preference = await axios.get(
        `http://localhost:9001/api/preferences/get/${user._id}`
      );

      if (preference.status === 200) {
        message.warning(
          "Preferences already exist. Please edit your preferences."
        ); // Replace alert with message
        setSubmitting(false);
        return;
      }
    } catch (error) {
      // If preferences are not found, proceed to create them
      if (error.response && error.response.status === 500) {
        try {
          // Create new preferences
          const response = await axios.post(
            "http://localhost:9001/api/preferences/create",
            {
              user_id: user._id,
              email_frequency: "immediately",
              notification_type: "email",
              categories: ["top", "world"],
            }
          );

          if (response.status === 201) {
            message.success("Preferences added successfully"); // Replace alert with message
            resetForm();
          }
        } catch (postError) {
          console.error("Error submitting preferences:", postError);
          message.error("Something went wrong. Please try again."); // Replace alert with message
        } finally {
          setSubmitting(false);
        }
      } else {
        console.error("Error fetching preferences:", error);
        message.error("Something went wrong. Please try again."); // Replace alert with message
        setSubmitting(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center  bg-gradient-to-r from-black to-white py-10 px-10 my-5 rounded-md">
      <div className="flex flex-col items-center max-w-lg w-full bg-white p-8 rounded-lg shadow-md text-center space-y-4">
        <img
          src={logo}
          alt="Subscribe Logo"
          className="w-32 h-32 mx-auto hover:rotate-12 transition-transform duration-300"
        />
        <h2 className="text-3xl font-semibold mb-2 text-gray-800">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-gray-600 mb-4">
          Stay updated with the latest news and exclusive offers!
        </p>

        <Formik
          initialValues={{ email: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-6 relative">
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <i className="fa-solid fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-500 text-white p-3 rounded-lg shadow-md hover:bg-orange-600 transition-colors duration-300 disabled:bg-gray-400"
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SubscriptionForm;
