"use client";
import API from "../api/api";

export function useAuth() {
  const login = async (
    params: any,
    successCallback: any,
    failCallback: any
  ) => {
    try {
      const user = await API.Auth.login({ ...params, type: "login" });
      if (successCallback) return successCallback(user);
    } catch (error) {
      if (failCallback) return failCallback(error);
    }
  };

  const register = async (
    params: any,
    successCallback: any,
    failCallback: any
  ) => {
    try {
      const user = await API.Auth.login({ ...params, type: "register" });
      if (successCallback) return successCallback(user);
    } catch (error) {
      if (failCallback) return failCallback(error);
    }
  };

  return { login, register };
}
