export interface ICart {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  coverImage: string;
  quantity: number;
}

export interface IMenu {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  coverImage: string;
  updatedAT: string;
  quantity: number;
}

export interface IUser {
  _id: string | "xyz-1";
  name: string;
  email: string;
  role: "admin" | "user" | "delivery";
  password: string;
  updatedAt: string;
  dob: string;
  address: string;
  phone: string;
}

export interface IOrder {
  _id: string;
  userId: IUser;
  totalAmount: number;
  orderData: IMenu[];
  status: "Pending" | "Received" | "Ready" | "Pickup" | "Deliverd";
  updatedAt: string;
  deliveryId: IUser;
}
