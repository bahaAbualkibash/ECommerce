import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {IPagination} from "../shared/Models/Pagination";
import {filter, map, Observable, of} from "rxjs";
import {IBrand, IBrandDto} from "../shared/Models/brand";
import {IProductType, IProductTypeDto} from "../shared/Models/productType";
import {ShopParams} from "../shared/Models/ShopParams";
import {IProduct} from "../shared/Models/product";
import {NavigationEnd, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:7070/api/';

  constructor(private http:HttpClient,private router: Router) {


  }

  getProducts(shopParams: ShopParams):Observable<IPagination>{
    let params = new HttpParams();

    if(shopParams.brandId !== 0){
      params = params.append('brandId',shopParams.brandId.toString());
    }

    if(shopParams.typeId !== 0){
      params = params.append('typeId',shopParams.typeId.toString());
    }
    if(shopParams.search){
      params = params.append('search',shopParams.search);
    }

      params = params.append('sort',shopParams.sort);
    params = params.append('pageIndex',shopParams.pageNumber.toString());
    params = params.append('pageSize',shopParams.pageSize .toString());


    return  this.http.get<IPagination>(this.baseUrl + "products",
      {observe:'response',params}).pipe<IPagination>(
        map<HttpResponse<IPagination>,IPagination>((response) => {
            return <IPagination>response.body;
        })
      );
  }

  getBrands(typeId?: number){
    if(typeId === 0){
      return of();
    }
    if( typeId)
      return this.http.get<IBrand[]>(this.baseUrl + "products/brands/"+ typeId);
    else
      return this.http.get<IBrand[]>(this.baseUrl + "products/brands");
  }


  getTypes(){
    return this.http.get<IProductType[]>(this.baseUrl + "products/types");
  }

  getProduct(id:number){
    return this.http.get<IProduct>(this.baseUrl + 'products/'+id);
  }


  addProduct(product: FormData) {
    return this.http.post(this.baseUrl + 'products',product).subscribe(res => {
      this.router.navigate(['shop/', res])
    });
  }

  updateProduct(formData: FormData,productId:number){
    return this.http.patch(this.baseUrl + 'products/'+ productId , formData).subscribe(res => {
      this.router.navigate(['shop/', res])
    })
  }

  deleteProduct(productId:number){
    return this.http.delete(this.baseUrl +'products/' + productId);
  }

  addBrand(brand: IBrandDto) {
    return this.http.post<IBrand>(this.baseUrl + 'products/add-brand',brand);
  }

  addType(type: IProductTypeDto) {
    return this.http.post<IProductType>(this.baseUrl + 'products/add-type',type);
  }
}

