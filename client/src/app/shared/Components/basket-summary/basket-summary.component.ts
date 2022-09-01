import {Component, EventEmitter, Input, NgIterable, OnInit, Output} from '@angular/core';
import {BasketService} from "../../../basket/basket.service";
import {Observable} from "rxjs";
import {IBasket, IBasketItem} from "../../Models/basket";
import {IOrder, IOrderItem} from "../../Models/Order";

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss']
})
export class BasketSummaryComponent implements OnInit {
  @Output() decrement = new EventEmitter<IBasketItem>();
  @Output() increment = new EventEmitter<IBasketItem>();
  @Output() remove = new EventEmitter<IBasketItem>();
  @Input() isBasket = true ;
  @Input() isOrderHistory = false;
  @Input() items:IBasketItem[] | IOrderItem[]  | any = [];

  constructor() { }

  ngOnInit(): void {


  }

  decrementItemQuantity(item: IBasketItem){
    this.decrement.emit(item)
  }

  incrementItemQuantity(item: IBasketItem){
    this.increment.emit(item)

  }

  removeBasketItem(item: IBasketItem){
    this.remove.emit(item)

  }

}
