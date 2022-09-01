import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminComponent} from "./admin.component";
import {AdminRoutingModule} from "./admin-routing.module";
import { OrderManagementComponent } from './order-management/order-management.component';
import {CarouselModule} from "ngx-bootstrap/carousel";
import {SharedModule} from "../shared/shared.module";
import {BsModalService} from "ngx-bootstrap/modal";
import { ConfirmOrderComponent } from './order-management/confirm-order/confirm-order.component';
import {OrdersModule} from "../orders/orders.module";
import { InProgressComponent } from './order-management/in-progress/in-progress.component';
import { DeliveredComponent } from './order-management/delivered/delivered.component';
import { CanceledComponent } from './order-management/canceled/canceled.component';
import { InShippingComponent } from './order-management/in-shipping/in-shipping.component';


@NgModule({
  declarations: [
    AdminComponent,
    OrderManagementComponent,
    ConfirmOrderComponent,
    InProgressComponent,
    DeliveredComponent,
    CanceledComponent,
    InShippingComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CarouselModule,
    SharedModule,
    OrdersModule,

  ],
  providers: [
    BsModalService
  ]
})
export class AdminModule { }
