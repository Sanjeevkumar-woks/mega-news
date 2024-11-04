import { Button, Modal, Typography, message, Spin } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const { Title, Text } = Typography;

const Unsubscribe = () => {
  const [userPreferences, setUserPreferences] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { user_id } = useParams();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleUnsubscribe = async () => {
    setIsModalVisible(false);

    try {
      await axios.delete(
        `https://news-service-320c.onrender.com/api/preferences/delete/${user_id}`
      );
      message.success("You have successfully unsubscribed.");
      setUserPreferences(null);
    } catch (error) {
      message.error("Failed to unsubscribe. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 p-6">
      <div className="text-center max-w-lg ">
        <h1 className="text-3xl font-bold">
          <span className="text-orange-600">MEGA</span>.news
        </h1>
        <Text type="secondary">
          Thank you for subscribing to MEGA.news. We’re sorry to see you go!
        </Text>
        <Text type="secondary" style={{ display: "block", marginTop: "1em" }}>
          If you unsubscribe, you will no longer receive updates.
        </Text>

        <Button
          type="primary"
          danger
          size="large"
          onClick={showModal}
          style={{ marginTop: "1.5em" }}
        >
          Unsubscribe
        </Button>
      </div>

      <Modal
        title="Confirm Unsubscription"
        visible={isModalVisible}
        onOk={handleUnsubscribe}
        onCancel={handleCancel}
        okText="Yes, Unsubscribe"
        okButtonProps={{ danger: true }}
        cancelText="Cancel"
      >
        <p>Are you sure you want to unsubscribe?</p>
        <p>This action cannot be undone.</p>
      </Modal>
    </div>
  );
};

export default Unsubscribe;
