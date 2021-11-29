import { AccessService } from './../../../../../service/access.service';
import { LocomotiveService } from './../../../../../service/locomotive.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Location } from '@angular/common';
import UserDTO from 'src/app/dto/UserDTO';
import swal from 'sweetalert';
@Component({
  selector: 'app-clerk-view-one-mileage',
  templateUrl: './clerk-view-one-mileage.component.html',
  styleUrls: ['./clerk-view-one-mileage.component.css'],
})
export class ClerkViewOneMileageComponent implements OnInit {
  MileageGroup: FormGroup;
  id: any;
  nxtScheduleId: any;
  isNextSchedule: boolean;
  isEdit: boolean = true;
  managerList: UserDTO[] = [];
  loading: boolean;
  style1: boolean = true;
  isBacked: boolean = true;
  status: any;
  lockEdit: boolean = true;
  constructor(
    private formBuilder: FormBuilder,
    private _location: Location,
    private route: ActivatedRoute,
    private locomotiveService: LocomotiveService,
    private accessService: AccessService
  ) {}

  ngOnInit(): void {
    this.MileageGroup = this.formBuilder.group({
      mReportNumber: [''],
      mLocoCatId: [''],
      mLocoNumber: [''],
      mLocoMileage: [''],
      finalMileage: [''],
      nxtScheduleId: [''],
      mileageDate: [''],
      locoStatus: [''],
      managerNic: [''],
      emergencyCheck: [''],
      managerName: ['', [Validators.required]],
      mileageNote: [''],
      status: [1],
      reason: ['Draft'],
      clerkEmail: [''],
      managerEmail: [''],
    });
    this.MileageGroup.disable();
    this.id = this.route.snapshot.paramMap.get('mReportNumber');
    this.locomotiveService
      .getOneMileageById(this.id)
      .pipe(first())
      .subscribe((res) => {
        if (res != undefined && res != null) {
          console.log(res);
          //this.status = res[0].status;
          this.MileageGroup.controls['mReportNumber'].setValue(
            res[0].mReportNumber
          );
          this.MileageGroup.controls['mLocoCatId'].setValue(res[0].mLocoCatId);
          this.MileageGroup.controls['mLocoNumber'].setValue(
            res[0].mLocoNumber
          );
          this.MileageGroup.controls['emergencyCheck'].setValue(
            res[0].emergencyCheck
          );
          this.MileageGroup.controls['mileageDate'].setValue(
            res[0].mileageDate
          );
          this.MileageGroup.controls['nxtScheduleId'].setValue(
            res[0].nxtScheduleId
          );
          this.MileageGroup.controls['managerNic'].setValue(res[0].managerNic);
          this.MileageGroup.controls['managerEmail'].setValue(
            res[0].managerEmail
          );
          this.MileageGroup.controls['managerName'].setValue(
            res[0].managerName
          );
          this.MileageGroup.controls['managerEmail'].setValue(
            res[0].managerEmail
          );
          this.MileageGroup.controls['reason'].setValue(res[0].reason);
          this.MileageGroup.controls['mileageNote'].setValue(
            res[0].mileageNote
          );
          this.MileageGroup.controls['clerkEmail'].setValue(res[0].clerkEmail);
          this.nxtScheduleId = res[0].nxtScheduleId;
          this.status = res[0].status;
          if (this.status === 1) {
            this.lockEdit = false;
          } else {
            this.lockEdit = true;
          }
          if (this.nxtScheduleId === '') {
            this.isNextSchedule = false;
          }
        }
      });

    this.checkDraft(this.status);
    this.loadMileage(this.id);

    this.loadMangerEmail();
  }

  loadMileage(id) {}

  loadMangerEmail() {
    this.loading = true;
    this.accessService.getMangers().subscribe((result) => {
      this.managerList = result;
      this.loading = true;
    });
  }
  get getFM() {
    return this.MileageGroup.controls;
  }

  onChangeSelectMan(value: string) {
    const userNic = value;
    console.log(this.getFM.managerNic.value);
    this.accessService
      .getOneMan(this.getFM.managerName.value)
      .pipe(first())
      .subscribe((res) => {
        this.MileageGroup.controls['managerNic'].setValue(res[0].userNic);
        this.MileageGroup.controls['managerEmail'].setValue(res[0].userEmail);
        console.log(res);
      });
  }

  checkDraft(status) {
    if (status != 1) {
      this.lockEdit = true;
    }
  }

  canEdit() {
    this.isEdit = false;
    this.style1 = false;
    this.MileageGroup.controls['managerName'].enable();
    this.MileageGroup.controls['mileageDate'].enable();
    this.MileageGroup.controls['reason'].enable();
    this.MileageGroup.controls['mileageNote'].enable();
  }

  updateUser() {
    this.MileageGroup.enable();
    if (window.confirm('Are you sure to update?')) {
      console.log(this.MileageGroup.value);

      this.locomotiveService
        .updateMileage(this.MileageGroup.value)
        .subscribe((res) => {
          if (res != null) {
            this.MileageGroup.disable();
            this.style1 = true;
            this.loadMileage(this.id);
            this.isBacked = false;
            swal({
              title: 'Details Updated!',
              icon: 'success',
            });

            setTimeout(() => {}, 3000);
          } else {
            swal({
              title: 'Not Saved',
              icon: 'error',
            });
            setTimeout(() => {
              // this.refresh();
            }, 3000);
          }
        });
    }
  }

  backClicked() {
    if (this.isBacked === true) {
      if (window.confirm('Are you want to exit with out save?')) {
        this._location.back();
      }
    } else {
      this._location.back();
    }
  }
}
