const BASE_URL = "http://localhost:9001/api/preferences";

export default class PreferencesService {
  static SUBSCRIBE = "/create";
  static UNSUBSCRIBE = "/delete";
  static GET_PREFERENCES = "/get";
  static UPDATE_PREFERENCES = "/update";

  static async subscribe(payload) {
    const response = await axios.post(`${BASE_URL}${this.SUBSCRIBE}`, {
      method: "POST",
      body: payload,
    });
    return response.data;
  }

  static async unsubscribe(payload) {
    const response = await axios.delete(`${BASE_URL}${this.UNSUBSCRIBE}`, {
      method: "DELETE",
      body: payload,
    });
    return response.data;
  }

  static async getPreferences(payload) {
    const response = await axios.get(`${BASE_URL}${this.GET_PREFERENCES}`, {
      method: "GET",
      body: payload,
    });
    return response.data;
  }

  static async updatePreferences(payload) {
    const response = await axios.put(`${BASE_URL}${this.UPDATE_PREFERENCES}`, {
      method: "PUT",
      body: payload,
    });
    return response.data;
  }
}
