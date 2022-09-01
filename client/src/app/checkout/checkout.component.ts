import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../account/account.service";
import {Observable} from "rxjs";
import {IBasketTotals} from "../shared/Models/basket";
import {BasketService} from "../basket/basket.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;
  basketTotals$!: Observable<IBasketTotals | null>;
  constructor(private fb: FormBuilder,private accountService: AccountService,private basketService: BasketService) {}

  ngOnInit(): void {
    this.createCheckoutForm();
    this.getAddressFromValues();
    this.basketTotals$ = this.basketService.basketTotal$;
  }

  createCheckoutForm(){
    this.checkoutForm = this.fb.group({
      addressForm: this.fb.group({
        firstName: [null,Validators.required],
        lastName: [null,Validators.required],
        street: [null,Validators.required],
        city: [null,Validators.required],
        state: [null,Validators.required],
        zipCode: [null,Validators.required],
      }),
      deliveryForm: this.fb.group({
        deliveryMethod: [null,Validators.required]
      }),
      paymentForm: this.fb.group({
        nameOnCard: [null,Validators.required]
      }),
    })
  }

  getAddressFromValues(){
    this.accountService.getUserAddress().subscribe(addres => {
      if(addres){
        console.log(addres)
        this.checkoutForm.get('addressForm')?.patchValue(addres);
      }
    },error => console.log(error))
  }

}
