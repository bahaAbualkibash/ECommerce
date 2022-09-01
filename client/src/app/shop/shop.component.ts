import {Component, ElementRef, EventEmitter, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {ShopService} from "./shop.service";
import {IProduct} from "../shared/Models/product";
import {IBrand} from "../shared/Models/brand";
import {IProductType} from "../shared/Models/productType";
import {ShopParams} from "../shared/Models/ShopParams";
import {AccountService} from "../account/account.service";
import {IUser} from "../shared/Models/user";
import {Observable} from "rxjs";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search',{static:false})  searchElement!: ElementRef;
  currentUser$: Observable<IUser | null> = this.accountService.currentUser$;
  products!: IProduct[];
  brands!:IBrand[];
  types!:IProductType[];
  totalCount!:number;
  shopParams = new ShopParams();
  sortOptions = [
    {name:"Alphabetical",value:"name"},
    {name:"Price:Low to High",value:"priceAsc"},
    {name:"Price:High to Low",value:"priceDesc"},
  ]

  constructor(private shopService: ShopService,private accountService:AccountService) { }

  ngOnInit(): void {
    this.currentUser$.subscribe(x => {
      console.log(x)
    })
    this.getProducts()
    this.getBrands()
    this.getTypes()
  }

  getProducts(){
    this.shopService.getProducts(this.shopParams).subscribe((response) => {
      this.products = response!.data;
      this.shopParams.pageNumber = response?.pageIndex
      this.shopParams.pageSize = response?.pageSize;
      this.totalCount = response?.count;

    },error => console.log(error));

  }

  getBrands(typeId: number = 0){
    if(typeId === 0)
      this.brands = [ {id: 0,name: "All"}];

    this.shopService.getBrands(typeId).subscribe(response => {
      this.brands = [ {id: 0,name: "All"} ,...response];
    },error => console.log(error));


  }

  getTypes(){
    this.shopService.getTypes().subscribe(response => {
      this.types = [ {id: 0,name: "All"} ,...response];
    },error => console.log(error));

  }

  onBrandSelected(brandId:number){
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts()
  }

  onTypeSelected(typeId:number){
    this.shopParams.typeId= typeId;
    this.shopParams.pageNumber = 1;
    this.getBrands(typeId);
    this.getProducts()
  }

  onSortSelected(sort:string){
    this.shopParams.sort =  sort;
    this.getProducts();
  }

  onPageChanged(page: number){
    if(this.shopParams.pageNumber !== page) {
      this.shopParams.pageNumber = page;
      this.getProducts();
    }
  }

  onSearch(){
    this.shopParams.search =  this.searchElement.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onReset(){
    this.searchElement.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }


  deleteProduct($event: number) {
    this.shopService.deleteProduct($event).subscribe(() => {
      this.products.forEach((product,index) => {
        if(product.id == $event){
          this.products.splice(index,1);
        }
      })
      if(this.totalCount > 0)
        this.totalCount -= 1;
      else
        this.totalCount = 0;
    })

  }
}
