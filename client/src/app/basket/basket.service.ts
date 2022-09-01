import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, ReplaySubject} from "rxjs";
import {Basket, IBasket, IBasketItem, IBasketTotals} from "../shared/Models/basket";
import {IProduct} from "../shared/Models/product";
import {IDeliveryMethod} from "../shared/Models/deliveryMethod";

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<IBasket | null>(null);
  private basketTotalSource = new BehaviorSubject<IBasketTotals | null>(null);
  basketTotal$ = this.basketTotalSource.asObservable();
  basket$ = this.basketSource.asObservable();
  shipping = 0;

  constructor(private http: HttpClient) {
  }

  setShippingPrice(deliveryMethod: IDeliveryMethod) {
    this.shipping = deliveryMethod.price;

    this.calculateTotals();
  }

  getBasket(id: string) {
    return this.http.get<IBasket>(this.baseUrl + 'basket?id=' + id)
      .pipe(
        map((basket: IBasket) => {
          this.basketSource.next(basket);
          this.calculateTotals();
        })
      )
  }

  incrementItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    if (basket) {
      const foundItemIndex = basket?.items.findIndex(x => x.id === item.id);
      basket.items[foundItemIndex].quantity++;
      this.setBasket(basket);
    }
  }

  decrementItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    if (basket) {
      const foundItemIndex = basket?.items.findIndex(x => x.id === item.id);
      if (basket.items[foundItemIndex].quantity > 1) {
        basket.items[foundItemIndex].quantity--;
        this.setBasket(basket);
      } else this.removeItemFromBasket(item);

    }
  }

  setBasket(basket: IBasket) {
    return this.http.post<IBasket>(this.baseUrl + 'basket', basket).subscribe((response) => {
      this.basketSource.next(response);
      this.calculateTotals();
    }, error => console.log(error))

  }

  getCurrentBasketValue() {
    return this.basketSource.value;
  }

  addItemToBasket(item: IProduct, quantity = 1) {
    const itemToAdd: IBasketItem = BasketService.mapProductItemToBasketItem(item, quantity);
    const basket = this.getCurrentBasketValue() ?? BasketService.createBasket();
    basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);
    this.setBasket(basket);
  }

  private static createBasket() {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  private calculateTotals() {
    const basket = this.getCurrentBasketValue();
    const shipping = this.shipping;
    const subTotal = basket?.items.reduce((a, b) => b.price * b.quantity + a, 0) ?? 0
    const total = subTotal + shipping;
    this.basketTotalSource.next({shipping, total, subtotal: subTotal})
  }

  private static mapProductItemToBasketItem(item: IProduct, quantity: number) {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      pictureUrl: item.pictureUrl,
      quantity,
      brand: item.productBrand,
      type: item.productType
    }
  }

  private addOrUpdateItem(items: IBasketItem[], itemToAdd: IBasketItem, quantity: number) {
    const index = items.findIndex(i => i.id === itemToAdd.id);
    if (index === -1) {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd)
    } else {
      items[index].quantity += quantity;
    }

    return items;
  }

  removeItemFromBasket(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    if (basket && basket?.items.some(x => x.id === item.id)) {
      basket.items = basket?.items.filter(i => i.id !== item.id)
      if (basket.items.length > 0) {
        this.setBasket(basket);
      } else {
        this.deleteBasket(basket);
      }
    }
  }

  deleteBasket(basket: IBasket) {
    return this.http.delete(this.baseUrl + 'basket?id=' + basket.id).subscribe(() => {
      this.basketSource.next(null);
      this.basketTotalSource.next(null);
      localStorage.removeItem('basket_id');
    }, error => console.log(error));
  }

  deleteLocalBasket(id: string){
    this.basketSource.next(null);
    this.basketTotalSource.next(null);
    localStorage.removeItem('basket_id')
  }

}
