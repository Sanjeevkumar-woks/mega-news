import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { Form, Input, Checkbox, Radio, Select, Button, message } from "antd";
import { useSelector } from "react-redux";
import categories from "../utils/categories";
import axios from "axios";

const { Option } = Select;

const emailFrequencyEnum = ["immediately", "hourly", "daily"];
const notificationEnum = ["email", "push", "sms"];

function Profile() {
  const user = useSelector((state) => state.auth.user);
  const [userPreferences, setUserPreferences] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user preferences
  const fetchUserPreferences = async () => {
    try {
      const response = await axios.get(
        `https://news-service-320c.onrender.com/api/preferences/get/${user._id}`
      );
      setUserPreferences(response.data.preferences);
    } catch (error) {
      message.error("Please set your preferences.");
    } finally {
      setLoading(false);
    }
  };

  const unsubscribe = () => {
    if (userPreferences) {
      axios
        .delete(
          `https://news-service-320c.onrender.com/api/preferences/delete/${userPreferences._id}`
        )
        .then(() => {
          message.success("Preferences deleted successfully.");
          fetchUserPreferences();
        })
        .catch((error) => {
          message.error("Failed to delete preferences.");
        });
    }
  };

  useEffect(() => {
    fetchUserPreferences();
  }, [user._id]);

  useEffect(() => {
    // Scroll to the top when loading
    if (loading) {
      window.scrollTo(0, 0);
    }
  }, [loading]);

  const onSubmit = async (values, { resetForm }) => {
    setLoading(true);
    try {
      const response = userPreferences?.categories
        ? await axios.put(
            `https://news-service-320c.onrender.com/api/preferences/update/${userPreferences._id}`,
            {
              user_id: user._id,
              email_frequency: values.email_frequency,
              notification_type: values.notification_type,
              categories: values.categories,
            }
          )
        : await axios.post(
            "https://news-service-320c.onrender.com/api/preferences/create",
            {
              user_id: user._id,
              email_frequency: values.email_frequency,
              notification_type: values.notification_type,
              categories: values.categories,
            }
          );

      if (response.status === 200 || response.status === 201) {
        message.success(
          userPreferences?.categories
            ? "Preferences updated successfully."
            : "Preferences added successfully."
        );

        resetForm(); // Reset the form fields
        fetchUserPreferences(); // Fetch updated preferences
      }
    } catch (error) {
      message.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const initialValues = {
    email_frequency: userPreferences?.email_frequency || "",
    notification_type: userPreferences?.notification_type || "",
    categories: userPreferences?.categories || [],
  };

  return (
    <div className="max-w-screen-lg mx-auto m-4 p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>

      <div className="flex justify-center items-center mb-4">
        <img
          src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA0L2pvYjY4Ni0yODUtcC5wbmc.png"
          alt="profile"
          className="w-20 h-20 rounded-full"
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <i className="fa-solid fa-spinner fa-spin text-4xl"></i>
        </div>
      ) : (
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          enableReinitialize // Ensure this is enabled to update the form on state change
        >
          {({ values, handleChange, setFieldValue, handleSubmit }) => (
            <Form layout="vertical" onFinish={handleSubmit}>
              {/* Email Field */}
              <Form.Item label="Email" required>
                <Input
                  name="email"
                  value={user.emailId}
                  disabled
                  placeholder="Enter your email"
                />
              </Form.Item>

              {/* Username Field */}
              <Form.Item label="Username" required>
                <Input name="username" value={user.userName} disabled />
              </Form.Item>

              {/* Email Frequency Dropdown */}
              <Form.Item label="Email Frequency" required>
                <Select
                  name="email_frequency"
                  value={values.email_frequency}
                  onChange={(value) => setFieldValue("email_frequency", value)}
                  placeholder="Select frequency"
                >
                  {emailFrequencyEnum.map((frequency) => (
                    <Option key={frequency} value={frequency}>
                      {frequency}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              {/* Notification Type Radio Group */}
              <Form.Item label="Notification Type" required>
                <Radio.Group
                  name="notification_type"
                  value={values.notification_type}
                  onChange={(e) =>
                    setFieldValue("notification_type", e.target.value)
                  }
                >
                  {notificationEnum.map((type) => (
                    <Radio key={type} value={type}>
                      {type}
                    </Radio>
                  ))}
                </Radio.Group>
              </Form.Item>

              {/* Categories Checkbox Group */}
              <Form.Item label="Categories" required>
                <Checkbox.Group
                  options={categories}
                  value={values.categories}
                  onChange={(checkedValues) =>
                    setFieldValue("categories", checkedValues)
                  }
                />
              </Form.Item>

              {/* Submit Button */}
              <Form.Item>
                <Button
                  type="default"
                  htmlType="submit"
                  className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors duration-300"
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          )}
        </Formik>
      )}

      <div className="flex justify-items-end items-end">
        <Button
          type="text"
          htmlType="submit"
          className=" text-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
          onClick={unsubscribe}
        >
          unsubscribe
        </Button>
      </div>
    </div>
  );
}

export default Profile;
