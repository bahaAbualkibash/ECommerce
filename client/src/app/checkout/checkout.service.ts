import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {IDeliveryMethod} from "../shared/Models/deliveryMethod";
import {map} from "rxjs";
import {IOrderToCreate} from "../shared/Models/OrderToCreate";

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseUrl = environment.apiUrl;

  constructor(private http:HttpClient) {

  }

  getDeliveryMethods(){
    return this.http.get<IDeliveryMethod[]>(this.baseUrl + 'Order/delivaryMethods').pipe(
      map(dm => {
        return dm.sort( (a,b) => b.price - a.price);
      })
    )
  }

  createOrder(order: IOrderToCreate){
    return this.http.post(this.baseUrl +'Order',order);
  }
}
