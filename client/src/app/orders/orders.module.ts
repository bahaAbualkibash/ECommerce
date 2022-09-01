import { NgModule } from '@angular/core';
import { OrdersComponent } from './orders.component';
import { OrderItemComponent } from './order-item/order-item.component';
import {OrdersRoutingModule} from "./orders-routing.module";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../shared/shared.module";



@NgModule({
    declarations: [
        OrdersComponent,
        OrderItemComponent
    ],
    exports: [
        OrderItemComponent
    ],
    imports: [
        CommonModule,
        OrdersRoutingModule,
        SharedModule
    ]
})
export class OrdersModule { }
