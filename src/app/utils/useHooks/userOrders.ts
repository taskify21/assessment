"use client";
import API from "../api/api";
import { useAppCustomContext } from "../context";
import { IOrder } from "../type";

const useOrderHook = () => {
  const { dispatch, state } = useAppCustomContext();
  const ordersList = state.order;

  const setOrdersList = (data: IOrder[]) => {
    dispatch({ type: "SET_ORDER", payload: data });
  };
  const getAllOrderList = async (
    params: any,
    successCallback: any,
    failCallback: any
  ) => {
    try {
      const orders = await API.Orders.getAllOrderList(params);
      if (orders) {
        if (successCallback) successCallback(orders);
      }
    } catch (error) {
      if (failCallback) failCallback(error);
    }
  };

  const addOrderHandler = async (
    params: any,
    successCallback: any,
    failCallback: any
  ) => {
    try {
      const orders = await API.Orders.addOrder(params);
      if (orders) {
        if (successCallback) successCallback(orders);
      }
    } catch (error) {
      if (failCallback) failCallback(error);
    }
  };
  const updateOrderHandler = async (
    params: any,
    successCallback: any,
    failCallback: any
  ) => {
    try {
      const orders = await API.Orders.updateOrder(params);
      if (orders) {
        if (successCallback) successCallback(orders);
      }
    } catch (error) {
      if (failCallback) failCallback(error);
    }
  };
  const deleteOrderHandler = async (
    params: any,
    successCallback: any,
    failCallback: any
  ) => {
    try {
      const order = await API.Orders.deleteOrder(params);
      if (order) {
        if (successCallback) successCallback(order);
      }
    } catch (error) {
      if (failCallback) failCallback(error);
    }
  };

  return {
    ordersList,
    setOrdersList,
    addOrderHandler,
    getAllOrderList,
    updateOrderHandler,
  };
};

export default useOrderHook;
