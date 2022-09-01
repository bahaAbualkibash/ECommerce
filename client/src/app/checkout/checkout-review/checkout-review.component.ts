import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {BasketService} from "../../basket/basket.service";
import {Observable} from "rxjs";
import {IBasket} from "../../shared/Models/basket";

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.scss']
})
export class CheckoutReviewComponent implements OnInit {
  basket$!: Observable<IBasket | null>;
  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

}
