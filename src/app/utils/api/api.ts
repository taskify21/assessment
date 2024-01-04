import apiService from "./api.service";

const postData = async (url: string, obj: string | Object, config = {}) => {
  return await apiService.post(url, obj, config);
};
const patchData = async (url: string, obj: string | Object, config = {}) => {
  return await apiService.patch(url, obj, config);
};

const getData = async (url: string, obj: string | Object, config = {}) => {
  return await apiService.get(url, obj);
};

const deleteData = async (url: string, obj: string | Object) => {
  return await apiService.delete(url, obj);
};

/* -- APIs -- */
export const Auth = {
  login: (params: Object) => postData("/login", params),
  register: (params: Object) => postData("/login", params),
};

export const Menu = {
  getAllMenuList: (params: Object) => getData("/menu", params),
  addMenu: (params: Object) => postData("/menu", params),
  updateMenu: (params: Object) => patchData("/menu", params),
  deleteMenu: (params: Object) => deleteData("/menu", params),
};

export const Orders = {
  getAllOrderList: (params: Object) => getData("/order", params),
  addOrder: (params: Object) => postData("/order", params),
  updateOrder: (params: Object) => patchData("/order", params),
  deleteOrder: (params: Object) => deleteData("/order", params),
};

export const Users = {
  getAllUserList: (params: Object) => getData("/user", params),
  addUser: (params: Object) => postData("/user", params),
  updateUser: (params: Object) => patchData("/user", params),
};

const API = {
  Auth,
  Orders,
  Users,
  Menu,
};

export default API;
