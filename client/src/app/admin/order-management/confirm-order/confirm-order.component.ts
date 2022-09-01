import {Component, Input, OnInit} from '@angular/core';
import {IOrder, OrderStatus} from "../../../shared/Models/Order";
import {AdminService} from "../../admin.service";
import {IOrderHistory} from "../../../shared/Models/OrderHistory";

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.scss']
})
export class ConfirmOrderComponent implements OnInit {
  @Input() Order!: any
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
  }

  onConfirm(Order: IOrder) {
    let orderhistory: IOrderHistory = {
      orderStatus: Object.keys(OrderStatus)[Object.values(OrderStatus).indexOf(OrderStatus.InShipping)] ,
      orderId: Order.id.toString(),
      orderHistoryAddress: null
    };

    this.adminService.updateState(orderhistory).subscribe( () => {
      Order.status = OrderStatus.InProgress;
    });
  }
}
