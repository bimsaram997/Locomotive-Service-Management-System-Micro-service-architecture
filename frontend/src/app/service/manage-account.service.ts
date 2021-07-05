import { Injectable } from '@angular/core';
import {CookieService} from "ngx-cookie";

@Injectable({
  providedIn: 'root'
})
export class ManageAccountService {

  constructor(private cookieService: CookieService) { }

  public canActive():boolean{
    const temp = this.cookieService.get('userData');
    if (temp !== undefined){
      return true;
    }else {
      return false;
    }
  }
  public canActiveAdmin(): boolean{
    const temp = this.cookieService.get('adminData');
    if (temp !== undefined){
      return true
    }else {
      return false
    }
  }
  public canActiveClerk(): boolean{
    const temp = this.cookieService.get('clerkData');
    if (temp !== undefined){
      return true;
    }else {
      return false;
    }
  }
}
