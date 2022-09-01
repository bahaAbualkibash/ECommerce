export class OrderParams{
  sort: number = OrderSortType.DateAsc;
  pageNumber = 1;
  pageSize = 30;
  isDeliveredIncluded : boolean = false;
  constructor() {
  }
}

export enum OrderSortType {
  TotalPriceAsc,
  TotalPriceDesc,
  DateAsc,
  DateDesc,
  IdAsc,
  IdDesc,
}
