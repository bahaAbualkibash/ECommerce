import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AdminService} from "../../admin.service";
import {IOrder, OrderStatus} from "../../../shared/Models/Order";
import {IOrderHistory, IOrderHistoryAddress} from "../../../shared/Models/OrderHistory";
import {map} from "rxjs";

@Component({
  selector: 'app-canceled',
  templateUrl: './canceled.component.html',
  styleUrls: ['./canceled.component.scss']
})
export class CanceledComponent implements OnInit {
  @Output() OnStatusChanged = new EventEmitter<string[]>();
  @Input() Order!:IOrder;
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
  }

  onCancel(reason: string) {
    let orderHistory: IOrderHistory = {
     orderHistoryAddress: null,
      Id: this.Order.id,
      cancelReason: reason,
      orderStatus: OrderStatus.Canceled
    }
    this.adminService.updateState(orderHistory).subscribe((response) => {
      this.OnStatusChanged.emit(response);

    });
  }
}
