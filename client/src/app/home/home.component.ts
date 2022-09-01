import { Component, OnInit } from '@angular/core';
import {ShopService} from "../shop/shop.service";
import {ShopParams} from "../shared/Models/ShopParams";
import {IProduct} from "../shared/Models/product";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: IProduct[] = [];
  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.shopService.getProducts(new ShopParams()).subscribe(response => {
      console.log(response);
      response.data.forEach((i,index) => {
        if(index <3)
          this.products.push(i)
      })
    })
  }

}
