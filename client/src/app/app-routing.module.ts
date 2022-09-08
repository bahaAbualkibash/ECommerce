import { NgModule } from '@angular/core';
import {RouterModule, Routes,} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ServerErrorComponent} from "./core/server-error/server-error.component";
import {NotFoundComponent} from "./core/not-found/not-found.component";
import {AuthGuard} from "./core/guards/auth.guard";
import {AddProductComponent} from "./shop/add-product/add-product.component";
import {RoleGuard} from "./core/guards/role.guard";

const routes: Routes = [
  {path: '',component:HomeComponent,data: {breadcrumb: 'Home'}},
  {path: 'server-error',component:ServerErrorComponent,data: {breadcrumb: 'Server Error'}},
  {path: 'not-found',component:NotFoundComponent,data: {breadcrumb: 'Not Found'}},
  {path:'shop',loadChildren: () => import('./shop/shop.module').then(mod => mod.ShopModule)
    ,data: {breadcrumb: 'Shop'}},
  {path:'basket',loadChildren: () => import('./basket/basket.module').then(mod => mod.BasketModule)
    ,data: {breadcrumb: 'Basket'}},
  {path:'admin',  canActivate: [AuthGuard,RoleGuard],loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule)
    ,data: {breadcrumb: 'Admin Dashboard'}},
  {path:'checkout',loadChildren: () => import('./checkout/checkout.module').then(mod => mod.CheckoutModule)
    ,data: {breadcrumb: 'Checkout'}, canActivate: [AuthGuard]},
  {path:'account',loadChildren: () => import('./account/account.module').then(mod => mod.AccountModule)
    ,data: {breadcrumb: {skip: true}}},
  {path:'orders',loadChildren: () => import('./orders/orders.module').then(mod => mod.OrdersModule)
    ,data: {breadcrumb: 'Orders'},canActivate: [AuthGuard]},
  {path: '**',redirectTo: 'not-found', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
