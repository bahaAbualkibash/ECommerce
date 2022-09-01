import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AdminComponent} from "./admin.component";
import {OrderManagementComponent} from "./order-management/order-management.component";

const routes: Routes = [
  {path: '',component: AdminComponent},
  {path: 'order-management',component: OrderManagementComponent,data: {breadcrumb: 'Order Management'}},
];


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
export class AdminRoutingModule { }
