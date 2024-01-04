import HttpService from "./http.service";

class ApiService {
  async post(url: string, data: string | Object, config: Object | undefined) {
    return await HttpService.post(url, data, config);
  }

  async get(url: string, data: string | Object) {
    const response = await HttpService.get(url, data);
    return response;
  }
  async patch(url: string, data: string | Object, config: Object | undefined) {
    const response = await HttpService.patch(url, data, config);
    return response;
  }
  async delete(url: string, data: string | Object) {
    const response = await HttpService.delete(url, data);
    return response;
  }
}
const apiService = new ApiService();
export default apiService;
