import NewsService from "../services/newsService";
import { useEffect, useState } from "react";

const useNews = () => {
  const [loading, setLoading] = useState(false);
  const [topNews, setTopNews] = useState([]);
  const [entertainment, setEntertainment] = useState([]);
  const [lifeStyle, setLifeStyle] = useState([]);
  const [business, setBusiness] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [category, setCategory] = useState("all");
  const [error, setError] = useState(null);

  // get news by each category and set the respective news to the state

  useEffect(() => {
    const newsCategories = [
      { category: "top", setter: setTopNews },
      { category: "entertainment", setter: setEntertainment },
      { category: "lifestyle", setter: setLifeStyle },
      { category: "business", setter: setBusiness },
    ];

    newsCategories.forEach(({ category, setter }) => {
      getNewsByCategory(category, setter);
    });
  }, []); // Changed dependency array to empty since we want this to run only on mount

  const getNewsByCategory = async (selectedCategory, setter) => {
    setLoading(true);
    setError(null);
    try {
      const data = await NewsService.getNewsByCategory({
        category: selectedCategory,
        page: page,
        pageSize: pageSize,
      });
      setter(data.newsArticles);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getAllNews = async () => {
    setLoading(true);
    const data = await NewsService.getAllNews();
    setter(data.news);
    setTotalPages(data.totalPages);
    setError(null);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    getAllNews();
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setPage(1); // Reset to first page when changing category
    getAllNews();
  };

  return {
    topNews,
    entertainment,
    lifeStyle,
    business,
    loading,
    error,
    page,
    pageSize,
    category,
    handlePageChange,
    handleCategoryChange,
    getAllNews,
  };
};

export default useNews;
