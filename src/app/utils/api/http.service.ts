import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

class HttpService {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: "api/",
    });
  }

  private preProcess(obj: any): any {
    return obj;
  }

  /**
   * Perform a POST request.
   * @param {string} url - The URL for the POST request.
   * @param {string|Object} data - The data to be sent in the request.
   * @param {AxiosRequestConfig} config - Additional configuration for the request.
   * @returns {Promise<AxiosResponse>} - A Promise that resolves to the response.
   */
  public async post(
    url: string,
    data: string | object,
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse> {
    try {
      const res = await this.instance.post(url, this.preProcess(data), config);
      return res;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Perform a GET request.
   * @param {string} url - The URL for the GET request.
   * @param {string|Object} data - The data to be sent in the request.
   * @param {AxiosRequestConfig} config - Additional configuration for the request.
   * @returns {Promise<AxiosResponse>} - A Promise that resolves to the response.
   */
  public async get(url: string, data: string | object): Promise<AxiosResponse> {
    try {
      const res = await this.instance.get(url, this.preProcess(data));
      return res;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Perform a PATCH request.
   * @param {string} url - The URL for the PATCH request.
   * @param {string|Object} data - The data to be sent in the request.
   * @param {AxiosRequestConfig} config - Additional configuration for the request.
   * @returns {Promise<AxiosResponse>} - A Promise that resolves to the response.
   */
  public async patch(
    url: string,
    data: string | object,
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse> {
    try {
      const res = await this.instance.patch(url, this.preProcess(data), config);
      return res;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Perform a DELETE request.
   * @param {string} url - The URL for the DELETE request.
   * @param {AxiosRequestConfig} config - Additional configuration for the request.
   * @returns {Promise<AxiosResponse>} - A Promise that resolves to the response.
   */
  public async delete(
    url: string,
    data: string | object | undefined = undefined,
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse> {
    try {
      // Include data in the URL or as a query parameter
      const requestConfig: AxiosRequestConfig = {
        ...config,
        data: this.preProcess(data),
      };

      const res = await this.instance.delete(url, requestConfig);
      return res;
    } catch (err) {
      throw err;
    }
  }
}

const httpService = new HttpService();
export default httpService;
