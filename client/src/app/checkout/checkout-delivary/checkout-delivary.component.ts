import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {CheckoutService} from "../checkout.service";
import {IDeliveryMethod} from "../../shared/Models/deliveryMethod";
import {BasketService} from "../../basket/basket.service";

@Component({
  selector: 'app-checkout-delivary',
  templateUrl: './checkout-delivary.component.html',
  styleUrls: ['./checkout-delivary.component.scss']
})
export class CheckoutDelivaryComponent implements OnInit {
 @Input() checkoutForm!: FormGroup;

 deliveryMethods!: IDeliveryMethod[];

 constructor(private checkoutService: CheckoutService,private basketService: BasketService) { }

  ngOnInit(): void {
    this.checkoutService.getDeliveryMethods().subscribe(dm => {
      this.deliveryMethods = dm;
    }, error => console.log(error));
  }

  setShippingPrice(deliveryMethod: IDeliveryMethod){
    this.basketService.setShippingPrice(deliveryMethod);
  }

}
