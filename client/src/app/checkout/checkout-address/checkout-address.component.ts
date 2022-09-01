import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.scss']
})
export class CheckoutAddressComponent implements OnInit {
  @Input() checkoutForm!:FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

  DisplayFieldCss(field: string){
    const group = "addressForm";
    console.log(this.checkoutForm.get(group))
    if(this.checkoutForm.get(group)!.get(field)?.invalid && this.checkoutForm.get(group)!.get(field)?.touched){
      return 'is-invalid'
    }else if (this.checkoutForm.get(group)!.get(field)?.valid && this.checkoutForm.get(group)!.get(field)?.touched){
      return 'is-valid'
    }else{
      return '';
    }

  }
}
