import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IOrderHistory, IOrderHistoryAddress} from "../../../shared/Models/OrderHistory";
import {IOrder, OrderStatus} from "../../../shared/Models/Order";
import {AdminService} from "../../admin.service";
import {map} from "rxjs";

@Component({
  selector: 'app-in-shipping',
  templateUrl: './in-shipping.component.html',
  styleUrls: ['./in-shipping.component.scss']
})
export class InShippingComponent implements OnInit {
  shippingForm!: FormGroup;
  @Input() Order!: IOrder;
  @Output() OnStatusChanged = new EventEmitter<string[]>();
  @Output() OnCancel = new EventEmitter<number>();
  @Output() OnComplete = new EventEmitter<number>();

  constructor(private adminService:AdminService) {
    this.shippingForm = new FormGroup({
        street: new FormControl(null,Validators.required),
        city: new FormControl(null,Validators.required),
        state: new FormControl(null,Validators.required)}
    )
  }

  ngOnInit(): void {
  }

  DisplayFieldCss(field: string) {
    if (this.shippingForm.get(field)?.invalid && this.shippingForm.get(field)?.touched) {
      return 'is-invalid'
    } else if (this.shippingForm.get(field)?.valid && this.shippingForm.get(field)?.touched) {
      return 'is-valid'
    } else {
      return '';
    }

  }
  onCancel() {
    this.OnCancel.emit(4);
  }
  onSubmit(delivered: boolean) {
    let orderHistoryAddress: IOrderHistoryAddress = {
      city: this.shippingForm.get("city")?.value,
      state: this.shippingForm.get("state")?.value,
      street: this.shippingForm.get("street")?.value,
      id: 0,
    }
    let orderHistory: IOrderHistory;
    if(delivered)
       orderHistory = {
        orderHistoryAddress,
        Id: this.Order.id,
        orderStatus: OrderStatus.Delivered
      };
    else
      orderHistory = {
        orderHistoryAddress,
        Id: this.Order.id,
        orderStatus: OrderStatus.InShipping
      };
    this.adminService.updateState(orderHistory).subscribe((response) => {
      this.OnStatusChanged.emit(response);
      this.OnComplete.emit(response.length-1);
    },error => {})

  }
}
