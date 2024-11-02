const BASE_URL = "https://news-service-320c.onrender.com/api";
import axios from "axios";

export default class NewsService {
  static GET_NEWS = "/news/get-news";
  static GET_NEWS_BY_ID = "/news/get-news-by-id";

  static async getAllNews(payload) {
    const { page, pageSize, search } = payload;

    const response = await axios.get(
      `${BASE_URL}${this.GET_NEWS}?page=${page}&pageSize=${pageSize}&search=${search}`
    );

    return response.data;
  }

  static async getNewsByCategory(payload) {
    const { category, page, pageSize } = payload;
    const response = await axios.get(
      `${BASE_URL}${this.GET_NEWS}?category=${category}&page=${page}&pageSize=${pageSize}`
    );
    return response.data;
  }

  static async getNewsByArticleId(id) {
    const response = await axios.get(
      `${BASE_URL}${this.GET_NEWS_BY_ID}?id=${id}`
    );
    return response.data;
  }
}
