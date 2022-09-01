import {Component, OnInit} from '@angular/core';
import {IOrder, OrderStatus} from "../shared/Models/Order";
import {environment} from "../../environments/environment";
import {OrdersService} from "./orders.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders!: IOrder[];

  constructor(public orderService: OrdersService) { }

  ngOnInit(): void {
    this.getOrders();

  }

  getOrders(){
    this.orderService.getOrdersForUser().subscribe(orders => {
      this.orders = orders;
    })
  }


  StatusStyle(status: string) {
    switch (status){
      case OrderStatus.Pending || OrderStatus.InProgress || OrderStatus.InShipping ||  OrderStatus.PaymentRecevied :
        return "bg-warning";
      case OrderStatus.Canceled || OrderStatus.PaymentFailed:
        return "bg-danger";
      case OrderStatus.Delivered:
        return "bg-success";

    }
    return  "bg-danger";
  }

  rowActive(item: IOrder) {

    if(item.id === this.orderService.lastVisitedOrder){
      return 'table-active'
    }

    return '';
  }
}
