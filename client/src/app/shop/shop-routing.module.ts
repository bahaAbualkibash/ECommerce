import { NgModule } from '@angular/core';
import {ShopComponent} from "./shop.component";
import {ProductDetailsComponent} from "./product-details/product-details.component";
import {RouterModule, Routes} from "@angular/router";
import {AddProductComponent} from "./add-product/add-product.component";
import {AuthGuard} from "../core/guards/auth.guard";
import {RoleGuard} from "../core/guards/role.guard";

const routes : Routes = [
  {path: '',component:ShopComponent},
  {path: ':id',component:ProductDetailsComponent,data: {breadcrumb: {alias: 'productDetails'}}},
  {path: 'edit/:id',component:AddProductComponent,canActivate:[AuthGuard,RoleGuard],data: {breadcrumb: {alias: 'productEdit'}}},
  {path: 'product/add',component:AddProductComponent,canActivate:[AuthGuard,RoleGuard],data: {breadcrumb: 'Add Product'}},
]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ShopRoutingModule { }
