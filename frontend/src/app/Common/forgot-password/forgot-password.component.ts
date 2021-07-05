import { Component, OnInit } from '@angular/core';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import validate = WebAssembly.validate;
import {AccessService} from "../../service/access.service";
import {first} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {log} from "util";
import swal from 'sweetalert';



@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgetPasswordGroup: FormGroup;
  submitted = false;
  IsvalidForm = true;

  constructor(private formBuilder: FormBuilder , private accessService: AccessService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {

    this.forgetPasswordGroup = this.formBuilder.group({
      email:['' , [Validators.required , Validators.email]]
    });
  }

  submitForm(form) {
    console.log(form);
    if(this.forgetPasswordGroup.valid){
      this.IsvalidForm = true;
        let userData = {
          email :this.forgetPasswordGroup.controls.email.value,

        }

      swal({
        title: 'Email is Send!',
        text: 'Please Click OK',
        icon: 'success',
      });
      setTimeout(() => {
        this.router.navigate(['MainLogin']);
      }, 3000);
        console.log(userData.email);

      this.accessService.requestPassword(userData)
        .pipe(first()).subscribe(
          res => {

            console.log(res);
            this.sendNewMail(this.forgetPasswordGroup.controls.email.value, this.forgetPasswordGroup.controls.email.value)

          }
      )
    }
  }
  sendNewMail(from, text){
    this.accessService.sendPasEmail(
      this.forgetPasswordGroup.controls.email.value,
      this.forgetPasswordGroup.controls.email.value,

    ).subscribe(result =>{
      if (result){
        this.onSucess('Sent');
        console.log(result);
      }else {
        console.log('failed')
      }

    })
  }
  onSucess(message: string){
    this.toastr.success(message, 'Success');
  }
}
