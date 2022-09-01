import {IAddress} from "./address";

export interface IOrder {
  id: number;
  buyerEmail: string;
  orderDate: Date;
  shipToAddress: IAddress;
  deliveryMethod: string;
  shippingPrice: number;
  orderItems: IOrderItem[];
  subtotal: number;
  status: string;
  total: number;
}

export interface IOrderItem {
  productId: number;
  productName: string;
  picturUrl: string;
  price: number;
  quantity: number;
}



export enum OrderStatus {
Pending = "Pending",
PaymentRecevied = "PaymentRecevied",
PaymentFailed = "PaymentFailed",
InProgress  = "InProgress",
InShipping  = "InShipping",
Delivered = "Delivered",
Canceled = "Canceled",
}

export let OrderStatusDisplay:Record<OrderStatus, string> = {
  [OrderStatus.Pending]: "Pending",
  [OrderStatus.PaymentRecevied]: "Payment Recevied",
  [OrderStatus.PaymentFailed]: "Payment Failed",
  [OrderStatus.InProgress]: "In Progress",
  [OrderStatus.InShipping]: "In Shipping",
  [OrderStatus.Delivered]: "Delivered",
  [OrderStatus.Canceled]: "Canceled",
}
