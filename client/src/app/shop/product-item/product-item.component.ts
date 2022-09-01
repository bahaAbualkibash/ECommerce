import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IProduct} from "../../shared/Models/product";
import {BasketService} from "../../basket/basket.service";
import {ShopService} from "../shop.service";
import {Router} from "@angular/router";
import {AccountService} from "../../account/account.service";
import {Observable} from "rxjs";
import {IUser} from "../../shared/Models/user";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input("ProductInput") product!: IProduct;
  @Output() deleteProduct= new EventEmitter<number>();
  currentUser$: Observable<IUser | null> = this.accountService.currentUser$;
  constructor(private basketService: BasketService,private shopService: ShopService,private router: Router,
              private accountService: AccountService) { }

  ngOnInit(): void {
  }

  addItemToBasket(){
    this.basketService.addItemToBasket(this.product)
  }

  updateProduct(productId: number) {
    this.router.navigate(['shop/edit/',productId]);
  }

  onDeleteProduct(product: IProduct) {
    this.deleteProduct.emit(product.id);
  }
}
