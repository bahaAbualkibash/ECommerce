import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IOrder, OrderStatus} from "../../../shared/Models/Order";
import {AdminService} from "../../admin.service";
import {IOrderHistory, IOrderHistoryAddress} from "../../../shared/Models/OrderHistory";

@Component({
  selector: 'app-in-progress',
  templateUrl: './in-progress.component.html',
  styleUrls: ['./in-progress.component.scss']
})
export class InProgressComponent implements OnInit {
  shippingForm!:FormGroup;
  @Input() Order!: IOrder;


  constructor(private adminService: AdminService) {
    this.shippingForm = new FormGroup({
        street: new FormControl(null,Validators.required),
        city: new FormControl(null,Validators.required),
        state: new FormControl(null,Validators.required),
        country: new FormControl(null,Validators.required),
      }
    )
  }

  ngOnInit(): void {
  }
  DisplayFieldCss(field: string){
    if(this.shippingForm.get(field)?.invalid && this.shippingForm.get(field)?.touched){
      return 'is-invalid'
    }else if (this.shippingForm.get(field)?.valid && this.shippingForm.get(field)?.touched){
      return 'is-valid'
    }else{
      return '';
    }

  }

  onSubmit() {
    let orderHistoryAddress: IOrderHistoryAddress ={
      city: this.shippingForm.get("city")?.value,
      state: this.shippingForm.get("state")?.value,
      street: this.shippingForm.get("street")?.value,
      id:0,
    }

    // let orderHistory: IOrderHistory = {
    //   orderHistoryAddress,
    //   orderId: this.Order.id,
    // }
    //   this.adminService.transferredToShipping(orderHistory).subscribe(() => {
    //
    //   },error => {})

  }
}
