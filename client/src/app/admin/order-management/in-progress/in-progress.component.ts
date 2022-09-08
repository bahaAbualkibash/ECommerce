import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IOrder, OrderStatus} from "../../../shared/Models/Order";
import {AdminService} from "../../admin.service";
import {IOrderHistory, IOrderHistoryAddress} from "../../../shared/Models/OrderHistory";
import {map} from "rxjs";

@Component({
  selector: 'app-in-progress',
  templateUrl: './in-progress.component.html',
  styleUrls: ['./in-progress.component.scss']
})
export class InProgressComponent implements OnInit {
  progressForm!:FormGroup;
  @Input() Order!: IOrder;
  @Output() OnStatusChanged = new EventEmitter<string[]>();
  @Output() OnCancel = new EventEmitter<number>();
  @Output() OnComplete = new EventEmitter<number>();


  constructor(private adminService: AdminService) {
    this.progressForm = new FormGroup({
        street: new FormControl(null,Validators.required),
        city: new FormControl(null,Validators.required),
        state: new FormControl(null,Validators.required)}
    )
  }

  ngOnInit(): void {
  }
  DisplayFieldCss(field: string){
    if(this.progressForm.get(field)?.invalid && this.progressForm.get(field)?.touched){
      return 'is-invalid'
    }else if (this.progressForm.get(field)?.valid && this.progressForm.get(field)?.touched){
      return 'is-valid'
    }else{
      return '';
    }

  }

  onSubmit() {
    let orderHistoryAddress: IOrderHistoryAddress ={
      city: this.progressForm.get("city")?.value,
      state: this.progressForm.get("state")?.value,
      street: this.progressForm.get("street")?.value,
      id:0,
    }

    let orderHistory: IOrderHistory = {
      orderHistoryAddress,
      Id: this.Order.id,
      orderStatus: OrderStatus.InShipping
    }
      this.adminService.updateState(orderHistory).subscribe((response) => {
        this.OnStatusChanged.emit(response);
        this.OnComplete.emit(response.length-1);

      },error => {})

  }

  onCancel() {
    this.OnCancel.emit(4);
  }
}
