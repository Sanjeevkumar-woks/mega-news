import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { message } from "antd";

const NewsCard = ({ news, deleteNews }) => {
  const openLink = () => window.open(news.link, "_blank");
  const user = useSelector((state) => state.auth.user);

  const handleSaveArticle = async () => {
    try {
      const response = await axios.post(
        `https://news-service-320c.onrender.com/api/saved-articles/save`,
        {
          user_id: user._id,
          article_id: news.article_id,
        }
      );

      if (response.status === 200) {
        message.success("Article saved successfully");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Display the error message sent by the server for a 400 status code
        message.error(error.response.data.message || "Article already saved");
      } else {
        // Handle other errors
        message.error("Failed to save article");
      }
    }
  };

  return (
    <div className="relative flex flex-col bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl min-h-[500px]">
      {/* Image Section */}
      <div className="relative cursor-pointer group">
        <img
          src={news.image_url}
          alt={news.title}
          className="w-full h-52 object-cover group-hover:brightness-90"
          onClick={openLink}
        />

        <div className="flex justify-between items-center">
          {deleteNews && (
            <div
              className="absolute top-2 left-2 bg-white bg-opacity-75 p-1 rounded-full text-gray-700 cursor-pointer shadow-md hover:bg-orange-600 hover:text-white transition-colors "
              onClick={() => deleteNews(news.article_id)}
            >
              {/* delete */}
              <i className="  fa-solid fa-trash "></i>
            </div>
          )}
          <div className="absolute top-2 right-2 bg-white bg-opacity-75 p-1 rounded-full text-gray-700 cursor-pointer shadow-md hover:bg-orange-600 hover:text-white transition-colors ">
            <i
              className="fa-regular fa-bookmark"
              onClick={handleSaveArticle}
            ></i>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col space-y-2">
        <h1
          className="text-lg font-semibold text-gray-800 hover:text-orange-600 transition-colors cursor-pointer line-clamp-2"
          onClick={openLink}
        >
          {news.title}
        </h1>
        <p className="text-sm text-gray-600 line-clamp-3">{news.description}</p>

        {/* Footer Info */}
        <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <span className="font-semibold">{news.country}</span>
          </div>
          <div className="flex items-center space-x-2">
            <img
              src={news.source_icon}
              alt="Source"
              className="w-6 h-6 rounded-full"
            />
            <span className="truncate">{news.source_name}</span>
          </div>
        </div>

        {/* Category */}
        <div className="text-xs text-gray-400 mt-2 flex justify-between items-center">
          <span>{news?.category?.join(", ")}</span>
          <span>{new Date(news.pubDate).toLocaleDateString()}</span>
        </div>

        {/* Actions */}
        <div className="mt-4 flex items-center justify-between">
          <button
            className="text-gray-500 hover:text-white cursor-pointer hover:bg-orange-500 px-4 py-2 rounded-md text-sm font-medium transition-colors"
            onClick={() => {
              navigator.clipboard.writeText(news.link);
              message.success("Link copied to clipboard");
            }}
          >
            <i className="fa-regular fa-share-from-square"></i> Share
          </button>
          <button
            className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-500 transition-colors"
            onClick={openLink}
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
