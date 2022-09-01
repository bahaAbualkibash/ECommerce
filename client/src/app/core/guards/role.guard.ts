import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {map, Observable} from 'rxjs';
import {AccountService} from "../../account/account.service";
import {RoleTypes} from "../../shared/Models/user";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private accountService:AccountService,private toastr:ToastrService,private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.accountService.currentUser$.pipe(map(x => {
      if(x?.role === RoleTypes.SuperiorRule)
        return true

      this.toastr.error("You can't access this Page","Forbidden");
      this.router.navigate(['shop'])
      return  false
    }))
  }

}
