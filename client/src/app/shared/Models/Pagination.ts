import {IProduct} from "./product";
import {IOrder} from "./Order";

export interface IPagination {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: IProduct[];
}
export interface IOrdersPagination {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: IOrder[];
}
