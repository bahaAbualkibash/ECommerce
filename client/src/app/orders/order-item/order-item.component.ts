import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {ActivatedRoute} from "@angular/router";
import {IOrder, IOrderItem} from "../../shared/Models/Order";
import {OrdersService} from "../orders.service";
import {BreadcrumbService} from "xng-breadcrumb";

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit,OnDestroy {
  baseUrl = environment.apiUrl;
  @Input() isAdmin= false;
  @Input() order!:IOrder;

  constructor(private ordersService:OrdersService,
              private activeRoute: ActivatedRoute,
              private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.set('@OrderDetailed','');
  }

  ngOnInit(): void {
    if(!this.isAdmin)
      this.getOrder();
    this.breadcrumbService.set('@OrderDetailed','');
  }

  getOrder(){
    let id =  this.activeRoute.snapshot.params['id'];
    this.ordersService.getOrderDetailed(id).subscribe(response => {
      this.order = response;
      console.log(this.order.orderItems);
      this.breadcrumbService.set('@OrderDetailed',`Order# ${response.id} - ${response.status} `)
    })
  }

  ngOnDestroy(): void {
    this.ordersService.lastVisitedOrder = this.order.id;
  }
}
