import { AccessService } from './../../../service/access.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
  constructor(private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder, private accessService: AccessService) {
      this.CurrentState = 'Wait';
    // this.route.params.subscribe(params => {
    //   this.resetToken = params.token;
    //   console.log(this.resetToken);

    // });
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
        console.log('ddd')
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
    const confirm_password = passwordFormGroup.controls.confirmPassword.value;

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
      this.accessService.newPassword(this.ResponseResetForm.value).subscribe(
        data => {
          this.ResponseResetForm.reset();
          this.successMessage = data.message;
          setTimeout(() => {
            this.successMessage = null;

          }, 3000);
        },
        err => {
          if (err.error.message) {
            this.errorMessage = err.error.message;
          }
        }
      );

  }
}
