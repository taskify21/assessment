"use client";
import { useState } from "react";
import API from "../api/api";
import { useAppCustomContext } from "../context";

const useMenuHook = () => {
  const [menuList, setMenuList] = useState({
    data: [],
  });

  const getAllMenuList = async (
    params: any,
    successCallback: any,
    failCallback: any
  ) => {
    try {
      const allMenu = await API.Menu.getAllMenuList(params);
      if (allMenu) {
        if (successCallback) successCallback(allMenu);
      }
    } catch (error) {
      if (failCallback) failCallback(error);
    }
  };
  const addMenuHandler = async (
    params: any,
    successCallback: any,
    failCallback: any
  ) => {
    try {
      const menu = await API.Menu.addMenu(params);
      if (menu) {
        if (successCallback) successCallback(menu);
      }
    } catch (error) {
      if (failCallback) failCallback(error);
    }
  };
  const updateMenuHandler = async (
    params: any,
    successCallback: any,
    failCallback: any
  ) => {
    try {
      const menu = await API.Menu.updateMenu(params);
      if (menu) {
        if (successCallback) successCallback(menu);
      }
    } catch (error) {
      if (failCallback) failCallback(error);
    }
  };
  const deleteMenuHandler = async (
    params: any,
    successCallback: any,
    failCallback: any
  ) => {
    try {
      const menu = await API.Menu.deleteMenu(params);
      if (menu) {
        if (successCallback) successCallback(menu);
      }
    } catch (error) {
      if (failCallback) failCallback(error);
    }
  };

  return {
    // menuData,
    menuList,
    setMenuList,
    getAllMenuList,
    // updateMenuData,
    addMenuHandler,
    deleteMenuHandler,
    updateMenuHandler,
  };
};

export default useMenuHook;
