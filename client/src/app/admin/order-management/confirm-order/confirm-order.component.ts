import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IOrder, OrderStatus} from "../../../shared/Models/Order";
import {AdminService} from "../../admin.service";
import {IOrderHistory} from "../../../shared/Models/OrderHistory";
import {map} from "rxjs";

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.scss']
})
export class ConfirmOrderComponent implements OnInit {
  @Input() Order!: IOrder
  @Input() initStatus!: string[];
  OrderStatus = OrderStatus;
  @Output() OnStatusChanged = new EventEmitter<string[]>();
  @Output() OnCancel = new EventEmitter<number>();
  @Output() OnComplete = new EventEmitter<number>();

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
  }

  onConfirm(Order: IOrder) {
    let orderhistory: IOrderHistory = {
      orderStatus: OrderStatus.InProgress ,
      Id: Order.id,
      orderHistoryAddress: null
    };

    this.adminService.updateState(orderhistory).subscribe( (response) => {
      Order.status = OrderStatus.InProgress;
      this.OnStatusChanged.emit(response);
      this.OnComplete.emit(response.length-1);

    });
  }

  onCancel() {
    this.OnCancel.emit(4);
  }
}
