import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {IOrder} from "../shared/Models/Order";
import {filter} from "rxjs";
import {NavigationEnd, NavigationStart, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseUrl = environment.apiUrl;
  lastVisitedOrder!: number;
  constructor(private http:HttpClient) {

  }

  getOrdersForUser(){
    return this.http.get<IOrder[]>(this.baseUrl + 'order');
  }

  getOrderDetailed(id:number){
    this.lastVisitedOrder = id;
   return  this.http.get<IOrder>(this.baseUrl + 'order/'+id)
  }
}
