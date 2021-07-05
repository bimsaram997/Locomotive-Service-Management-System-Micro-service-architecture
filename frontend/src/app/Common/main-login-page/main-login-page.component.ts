import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AccessService} from "../../service/access.service";
import {ToastrService} from "ngx-toastr";
import {CookieService} from "ngx-cookie";
import {first} from "rxjs/operators";
import {Role} from "../../_models/role";
import {MatDialog} from "@angular/material/dialog";
import {ForgotPasswordComponent} from "../forgot-password/forgot-password.component";
import {FormGroup} from "@angular/forms";
import swal from 'sweetalert';
@Component({
  selector: 'app-main-login-page',
  templateUrl: './main-login-page.component.html',
  styleUrls: ['./main-login-page.component.css']
})
export class MainLoginPageComponent implements OnInit {
  login_form: FormGroup;
  email = '';
  password = '';
  loginEmail: any;
  loginPassword: any;
  hide = true;
  loginCounter  = 0;
  counter:number;
  constructor(private router: Router,
              private accessService: AccessService,
              private toastrService: ToastrService,
              private cookieService: CookieService) {

  }

  ngOnInit(): void {
    this.isLoggedUser();
    this.isLoggedAdmin();
    this.isLoggedClerk();
    //this.isLoggedManager();
  }


  setLoginCounter() {
    this.loginCounter += 1;
    localStorage.setItem('logCount', this.loginCounter.toString());

    if (this.loginCounter % 3 === 0) {
      this.counter = 30 * (Math.pow(2, (this.loginCounter / 3) - 1));
      console.log(this.counter)
    }
  }
  login(){
    if((this.loginEmail &&  this.loginEmail !== '') && (this.loginPassword && this.loginPassword !== '')){
      this.accessService.login(this.loginEmail.toString(), this.loginPassword.toString()).pipe(first()).
      subscribe(result => {
        if (result.message === 'Success!'){
          if (result.userRole === Role.ChiefEngineer) {
            this.router.navigate(['adminDashboard/adminDashContent']);
            this.cookieService.putObject('adminData', this.loginEmail);
          }else if (result.userRole === Role.Supervisor){
            this.cookieService.putObject('userData', result.userData);
            this.router.navigate(['userDashboard/userDashContent']).then();
          } else if (result.userRole === Role.Clerk){
            this.cookieService.putObject('clerkData', this.loginEmail);
            this.router.navigate(['clerkDashBoard/clerkDashContent']).then();
          } else if (result.userRole === Role.ServiceManger){
            this.router.navigate(['managerDashBoard/mDashContent']).then();
          }

        }else {
          swal({
            title: 'Please check your email or password',
            text: 'You clicked the button!',
            icon: 'warning',
          });
        }
      });
    }else{
      swal({
        title: 'Fields cannot be empty',
        text: 'You clicked the button!',
        icon: 'warning',
      });
    }
  }



  private isLoggedUser(){
    const temp = this.cookieService.get('userData');
    if (temp !== undefined){
      this.router.navigate(['userDashboard/userDashContent']).then();
    }else {

    }
  }

  private isLoggedAdmin(){
    const temp = this.cookieService.get('adminData');
    if (temp !== undefined){
      this.router.navigate(['adminDashboard/adminDashContent']).then();
    }else {

    }
  }

  private isLoggedClerk() {
    const temp = this.cookieService.get('clerkData');
    if (temp !== undefined){
      this.router.navigate(['clerkDashBoard/clerkDashContent']).then();
    }else {

    }
  }


  onError(message){
    this.toastrService.error(message, 'Try Again!');
  }


}
