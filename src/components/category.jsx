import { useParams } from "react-router-dom";
import NewsList from "./newsList";
import NewsService from "../services/newsService";
import { useEffect, useState } from "react";
import NewsCard from "./newsCard";

const Category = () => {
  const { category } = useParams();
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPagesize] = useState(10);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      const data = await NewsService.getNewsByCategory({
        category,
        page,
        pageSize,
      });
      setNews(data.newsArticles);
      setLoading(false);
    }
    fetchNews();
  }, [page, category]);

  useEffect(() => {
    setPage(1);
  }, [category]);

  const handlePrevious = () => {
    setPage(page - 1);
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <i className="fa-solid fa-spinner fa-spin text-4xl"></i>
        </div>
      ) : (
        <div className="flex flex-col gap-4 px-4 mb-10">
          <p className="text-lg font-semibold text-gray-800 p-4 flex items-center space-x-2">
            {category} &nbsp;
            <i className="fa-solid fa-caret-right"></i>
          </p>
          <div className="flex flex-wrap gap-4 justify-center items-center">
            {news.length > 0 ? (
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {news.map((newsItem) => (
                    <NewsCard news={newsItem} key={newsItem._id} />
                  ))}
                </div>
                <div className="flex justify-center items-center">
                  <div className="flex justify-center items-center space-x-2">
                    <button
                      className="bg-orange-600 text-white text-sm px-4 py-2 rounded-md transition-colors hover:bg-orange-500"
                      onClick={handlePrevious}
                    >
                      Previous
                    </button>
                    <span>{page}</span>
                    <button
                      className="bg-orange-600 text-white text-sm px-4 py-2 rounded-md transition-colors hover:bg-orange-500"
                      onClick={handleNext}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center h-screen">
                <p className="text-lg font-semibold text-gray-800 p-4 flex items-center space-x-2">
                  No news found
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
