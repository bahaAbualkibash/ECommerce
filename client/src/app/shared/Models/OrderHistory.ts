import {IOrder, OrderStatus} from "./Order";


  export interface IOrderHistoryAddress {
    id: number;
    street: string;
    city: string;
    state: string;
  }

  export interface IOrderHistory {
    orderId: string;
    orderStatus: string
    orderHistoryAddress: IOrderHistoryAddress | null;
  }


