import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { map, of, ReplaySubject} from "rxjs";
import {IUser} from "../shared/Models/user";
import {Router} from "@angular/router";
import {IAddress} from "../shared/Models/address";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<IUser | null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient,private router: Router) { }

  login(values: any){
    return this.http.post<IUser>(this.baseUrl + 'account/login',values)
      .pipe(
        map((user: IUser) => {
          localStorage.setItem('token',user.token);
          this.currentUserSource.next(user);
          console.log(user);
        })
      )
  }

  register(values: any){
    return this.http.post<IUser>(this.baseUrl + 'account/register',values)
      .pipe(
        map((user: IUser) => {
          localStorage.setItem('token',user.token);
          this.currentUserSource.next(user);
        })
      )
  }



  logout(){
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/')
  }

  checkEmailExists(email:string){
    return this.http.get(this.baseUrl + 'account/emailexists?email='+ email);
  }

  loadCurrentUser(token:string){
    if(token === null){
      this.currentUserSource.next(null);
      return of(undefined);
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization',`Bearer ${token}`)
  console.log(headers)
    return this.http.get<IUser>(this.baseUrl + 'account',{headers}).pipe(
      map((user) => {
        console.log(user)
        localStorage.setItem('token',user.token);
        this.currentUserSource.next(user);
      })
    )
  }

  getCurrentUserValue(){
    return this.currentUserSource.subscribe(data => {
      return data;
    });
  }

  getUserAddress(){
    return this.http.get<IAddress>(this.baseUrl + 'account/address');
  }

  updateUserAddress(address: IAddress){
    return this.http.put<IAddress>(this.baseUrl + 'account/address',address);

  }
}
