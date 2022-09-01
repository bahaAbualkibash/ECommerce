import { Component, OnInit } from '@angular/core';
import {IProduct} from "../../shared/Models/product";
import {ShopService} from "../shop.service";
import {ActivatedRoute} from "@angular/router";
import {BreadcrumbService} from "xng-breadcrumb";
import {BasketService} from "../../basket/basket.service";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product!:IProduct;
  quantity:number = 1;
  constructor(private shopService:ShopService,
              private linkActive:ActivatedRoute,
              private breadCrumbService:BreadcrumbService,
              private basketService:BasketService) {
    this.breadCrumbService.set('@productDetails',' ');
  }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(){
    this.shopService.getProduct(this.linkActive.snapshot.params['id']).subscribe(product => {
      this.product = product;
      this.breadCrumbService.set('@productDetails',product.name)
      console.log(product)
    },error => console.log(error))

  }
  addItemToBasket(){
    this.basketService.addItemToBasket(this.product,this.quantity);
  }

  incrementQuantity(){
    this.quantity++;
  }

  decrementQuantity(){
    if (this.quantity >1)
      this.quantity--;
  }
}
