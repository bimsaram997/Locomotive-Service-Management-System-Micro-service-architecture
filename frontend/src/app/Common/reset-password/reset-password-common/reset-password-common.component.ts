import { AccessService } from './../../../service/access.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert';
@Component({
  selector: 'app-reset-password-common',
  templateUrl: './reset-password-common.component.html',
  styleUrls: ['./reset-password-common.component.css']
})
export class ResetPasswordCommonComponent implements OnInit {
  ResponseResetForm: FormGroup;
  errorMessage: string;
  successMessage: string;
  resetToken: null;
  CurrentState: any;
  IsResetFormValid = true;
  lengthError = false;
  passwordMismatchError =false;
  loginSuccess = false;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder, private accessService: AccessService) {
    this.CurrentState = 'Wait';
    this.route.params.subscribe(params => {
      this.resetToken = params.id;
      console.log(this.resetToken);
      this.VerifyToken(params.id);
    });
     }

  ngOnInit(): void {
    this.Init();

  }

VerifyToken(obj) {
    this.accessService.validPasswordToken( obj ).subscribe(
      data => {
        this.CurrentState = 'Verified';
      },
      err => {
        this.CurrentState = 'NotVerified';
      }
    );
  }

   Init() {
    this.ResponseResetForm = this.fb.group(
      {
        resettoken: [this.resetToken],
        newPassword: ['', [Validators.required, Validators.minLength(4)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(4)]]
      }
    );
  }

  Validate(passwordFormGroup: FormGroup) {
    const new_password = passwordFormGroup.controls.newPassword.value;
    console.log(passwordFormGroup.controls.newPassword.value)
    const confirm_password = passwordFormGroup.controls.confirmPassword.value;
     console.log(passwordFormGroup.controls.confirmPassword.value)

    if (confirm_password.length <= 0) {
      return null;
    }

    if (confirm_password !== new_password) {
      return {
        doesNotMatch: true
      };
    }

    return null;
  }

   ResetPassword(form) {
    console.log(form.get('confirmPassword'));
      this.IsResetFormValid = true;
        const _newPassword  = this.ResponseResetForm.controls.newPassword.value;
        const _confirmPassword = this.ResponseResetForm.controls.confirmPassword.value;
        // console.log(_newPassword.length)
        if(_confirmPassword.length>3 && _newPassword.length>0){
         if(_confirmPassword == _newPassword){
           this.accessService.newPassword(this.ResponseResetForm.value).subscribe(
        data => {
            swal({
             title: 'Password is Reset!',
             icon: 'success',
           });
           setTimeout(() => {
             //this.MileageGroup.reset();
            // this.router.navigate(['/clerkDashBoard/viewMileages']);
             //this.spinner = false
           }, 3000);
          this.ResponseResetForm.reset();
          this.loginSuccess = true;
          this.successMessage = data.message;

        },
        err => {
          if (err.error.message) {
            swal({
             title: 'Password reset failed',
             icon: 'error',
           });
           setTimeout(() => {
            // this.refresh();
            //this.spinner = false
           }, 3000);
          }
        }
      );

         }else{
           console.log('errt')
           this.passwordMismatchError = true;
         }
        }else{
          this.lengthError =  true;
        }

   }
}
