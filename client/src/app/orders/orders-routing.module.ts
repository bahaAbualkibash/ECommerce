import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule,Routes} from "@angular/router";
import {OrdersComponent} from "./orders.component";
import {OrderItemComponent} from "./order-item/order-item.component";

const routes: Routes = [
  {path:'',component: OrdersComponent},
  {path:':id',component: OrderItemComponent,data: {breadcrumb: {alias: 'OrderDetailed'}}},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class OrdersRoutingModule { }
