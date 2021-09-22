import { AccessService } from './../../../../../service/access.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-admin-view-more-user',
  templateUrl: './admin-view-more-user.component.html',
  styleUrls: ['./admin-view-more-user.component.css'],
})
export class AdminViewMoreUserComponent implements OnInit {
  id: any;
  public selectedIndex: number = 0;
  image: any;
  userRole: string;
  userNic: string;
  UserGroup: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private accessService: AccessService,
    private _location: Location,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getOneUser();
    this.createForm();
  }

  getOneUser() {
    this.accessService
      .getOneUser(this.id)
      .pipe(first())
      .subscribe((res) => {
        console.log(res);
        if (res !== undefined) {
          this.image = res[0].image;
          this.userNic = res[0].userNic;
          this.userRole = res[0].userRole;
          this.UserGroup.controls['userEmail'].setValue(res[0].userEmail);
          this.UserGroup.controls['userName'].setValue(res[0].userName);
          this.UserGroup.controls['userGender'].setValue(res[0].userGender);
          this.UserGroup.controls['appointmentDate'].setValue(
            res[0].appointmentDate
          );
          this.UserGroup.controls['address'].setValue(res[0].address);
          this.UserGroup.controls['userWorks'].setValue(res[0].userWorks);
          this.UserGroup.controls['userNic'].setValue(res[0].userNic);
          this.UserGroup.controls['userMobile'].setValue(res[0].userMobile);
          this.UserGroup.controls['userRole'].setValue(res[0].userRole);
        }
      });
  }

  createForm() {
    this.UserGroup = this.formBuilder.group({
      userEmail: [''],
      userName: [''],
      userGender: [''],
      appointmentDate: [''],
      address: [''],
      userWorks: [''],
      userNic: [''],
      userMobile: [''],
      userRole: [''],
    });
  }

  backClicked() {
    this._location.back();
  }
}
