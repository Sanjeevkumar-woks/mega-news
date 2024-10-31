import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NewsCard from "./newsCard";
import { message } from "antd";

const SavedArticles = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.auth.user);

  async function fetchSavedArticles() {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:9001/api/saved-articles/get/${user._id}`
      );
      setArticles(response.data);
    } catch (error) {
      message.error("Error fetching saved articles:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (user && user._id) {
      fetchSavedArticles();
    }
  }, []);

  const handleDeleteArticle = async (articleId) => {
    try {
      const response = await axios.delete(
        `http://localhost:9001/api/saved-articles/delete/${articleId}`
      );
      if (response.status === 200) {
        fetchSavedArticles();
        message.success("Article deleted successfully");
      }
    } catch (error) {
      message.error("Error deleting article:", error);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <i className="fa-solid fa-spinner fa-spin text-4xl"></i>
        </div>
      ) : (
        <div className=" p-4 ">
          <h1 className="text-3xl font-bold mb-4">Saved Articles</h1>
          {articles.length === 0 ? (
            <div className="flex justify-center items-center h-screen">
              <p className="text-lg font-semibold text-gray-800 p-4 flex items-center space-x-2">
                No Saved Articles Found.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-5">
              {articles.map((article) => (
                <NewsCard
                  key={article._id}
                  news={article}
                  deleteNews={handleDeleteArticle}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SavedArticles;
