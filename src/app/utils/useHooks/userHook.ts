"use client";
import { useState } from "react";
import API from "../api/api";

const useUser = () => {
  const [users, setUsers] = useState([]);

  const getAllUserList = async (
    params: any,
    successCallback: any,
    failCallback: any
  ) => {
    try {
      const allUsers = await API.Users.getAllUserList(params);
      if (allUsers) {
        setUsers(allUsers as any);
        if (successCallback) successCallback(allUsers);
      }
    } catch (error) {
      if (failCallback) failCallback(error);
    }
  };

  const addUserHandler = async (
    params: any,
    successCallback: any,
    failCallback: any
  ) => {
    try {
      const allUsers = await API.Users.addUser(params);
      if (allUsers) {
        if (successCallback) successCallback(allUsers);
      }
    } catch (error) {
      if (failCallback) failCallback(error);
    }
  };
  const updateUserHandler = async (
    params: any,
    successCallback: any,
    failCallback: any
  ) => {
    try {
      const updatedUser = await API.Users.updateUser(params);
      if (updatedUser) {
        if (successCallback) successCallback(updatedUser);
      }
    } catch (error) {
      if (failCallback) failCallback(error);
    }
  };

  return { getAllUserList, addUserHandler, updateUserHandler };
};

export default useUser;
