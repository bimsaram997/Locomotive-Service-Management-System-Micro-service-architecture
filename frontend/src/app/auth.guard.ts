import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {ManageAccountService} from "./service/manage-account.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private manageAccountService: ManageAccountService, private router: Router) {
  }

  canActivate(): boolean {
    if(this.manageAccountService.canActive()){
      return true;
    }else{
      this.router.navigate(['/']).then();
      return false;
    }
  }

}
