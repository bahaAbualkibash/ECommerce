import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {OrderParams} from "../shared/Models/OrderParams";
import {IOrdersPagination, IPagination} from "../shared/Models/Pagination";
import {map} from "rxjs";
import {IOrder} from "../shared/Models/Order";
import {IOrderHistory, IOrderHistoryAddress} from "../shared/Models/OrderHistory";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl;

  constructor(private http:HttpClient,private router: Router) { }

  getOrdersForAllUsers(orderParams?:OrderParams){
    let params = new HttpParams();

    if(orderParams?.sort){
      params = params.append("Sort",orderParams.sort.toString())
    }

    if(orderParams?.pageNumber){
      params = params.append("PageIndex",orderParams.pageNumber.toString())
    }

    if(orderParams?.pageSize){
      params = params.append("PageSize",orderParams.pageSize.toString())
    }

    if(orderParams?.isDeliveredIncluded){
      params = params.append("IsDeliveredIncluded",orderParams.isDeliveredIncluded)
    }

    return this.http.get<IOrdersPagination>(this.baseUrl + 'order/all', { observe: "response",  params}).pipe(
      map<HttpResponse<IOrdersPagination>,IOrdersPagination>(response => {
        return <IOrdersPagination>response.body
      })
    );
  }

  updateState(orderDto: IOrderHistory) {
    return  this.http.patch<string[]>(this.baseUrl + "OrderHistory",orderDto);
  }

  getHistoryListForOrder(id:number){
    return this.http.get<string[]>(this.baseUrl + "OrderHistory/"+id);
  }
  // transferredToShipping(orderHistory:IOrderHistory) {
  //   //TODO: Change to DTO
  //   return this.http.post(this.baseUrl +"OrderHistory",orderHistory);
  // }
}
