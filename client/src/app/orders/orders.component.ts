import {Component, OnInit} from '@angular/core';
import {IOrder, OrderStatus, OrderStatusDisplay} from "../shared/Models/Order";
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
    if(status === OrderStatusDisplay.Pending || status === OrderStatusDisplay.InProgress||
      status === OrderStatusDisplay.InShipping|| status === OrderStatusDisplay.PaymentRecevied){
      return "bg-warning";
    }else if(   status === OrderStatusDisplay.Canceled|| status === OrderStatusDisplay.PaymentFailed){
      return 'bg-danger'
    }else if( status === OrderStatusDisplay.Delivered){
      return "bg-success";
    }else{
      return 'bg-light'
    }
  }

  rowActive(item: IOrder) {

    if(item.id === this.orderService.lastVisitedOrder){
      return 'table-active'
    }

    return '';
  }
}
