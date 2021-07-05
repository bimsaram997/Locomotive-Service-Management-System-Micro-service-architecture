import {Component, OnInit, Output} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {Router} from "@angular/router";
import {AccessService} from "../../service/access.service";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {CookieService} from "ngx-cookie";
import {EventEmitter} from "events";

@Component({
  selector: 'app-login-and-signup',
  templateUrl: './login-and-signup.component.html',
  styleUrls: ['./login-and-signup.component.css'],
  animations: [
    trigger('flyInOut', [
      transition('void => *', [
        style({transform: 'translateY(-100%)'}),
        animate('0.5s')
      ]),
      transition('* => void', [
        animate('0.5s', style({transform: 'translateY(-100%)'}))
      ])
    ])
  ]
})
export class LoginAndSignupComponent implements OnInit {
  slider = false;
  hide = true;
  email = '';
  password = '';
  slides: any[] = [
    {image: './assets/NewOn/Shared from Lightroom mobile(1).jpg'},
    ];

  slidesNew: any[] = [
    {image: './assets/NewOn/Shared from Lightroom mobile(7).jpg'},
  ];
  loginEmail: any;
  loginPassword: any;
  detailEmail = '';
  @Output() public found = new EventEmitter<any>();


  constructor(private router: Router,
              private accessService: AccessService,
              private toastrService: ToastrService,
              private cookieService: CookieService) {

  }

  ngOnInit(): void {
    this.isLoggedUser();
    this.isLoggedAdmin();
    this.isLoggedClerk();
  }

  toogleSlider() {
    if (this.slider){
      this.slider = false;
    }else {
      this.slider = true;
    }
  }

  login() {
    if(this.loginEmail === 'admin' && this.loginPassword === '123'){
      this.cookieService.putObject('adminData', this.loginEmail);
      this.router.navigate(['adminDashboard/adminDashContent']);
    }else if(this.loginEmail === 'clerk' && this.loginPassword === '123'){
      this.cookieService.putObject('clerkData', this.loginEmail);
      this.router.navigate(['clerkDashBoard/clerkDashContent']);
    }else {
      this.accessService.login(this.loginEmail.toString(), this.loginPassword.toString()).subscribe(result => {
        if (result.message === 'Success!'){

          this.cookieService.putObject('userData', result.userData);
          this.router.navigate(['userDashboard/userDashContent']).then();
        }else {
          this.onError(result.message);
        }
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
  private isLoggedClerk(){
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
