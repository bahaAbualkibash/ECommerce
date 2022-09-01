import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import {ShopRoutingModule} from "./shop-routing.module";
import {HttpClientModule} from "@angular/common/http";
import { ProductItemComponent } from './product-item/product-item.component';
import {SharedModule} from "../shared/shared.module";
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AddProductComponent } from './add-product/add-product.component';
import {BsModalService} from "ngx-bootstrap/modal";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ShopComponent,
    ProductItemComponent,
    ProductDetailsComponent,
    AddProductComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        ShopRoutingModule,
        FormsModule
    ],providers:[BsModalService],
  exports:[]
})
export class ShopModule { }
