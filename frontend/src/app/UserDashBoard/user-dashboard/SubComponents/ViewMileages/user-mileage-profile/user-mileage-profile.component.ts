import { first } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LocomotiveService } from 'src/app/service/locomotive.service';
@Component({
  selector: 'app-user-mileage-profile',
  templateUrl: './user-mileage-profile.component.html',
  styleUrls: ['./user-mileage-profile.component.css'],
})
export class UserMileageProfileComponent implements OnInit {
  MileageGroup: FormGroup;
  id: any;
  nxtScheduleId: any;
  isNextSchedule: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private _location: Location,
    private route: ActivatedRoute,
    private locomotiveService: LocomotiveService
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
      managerName: [''],
      mileageNote: [''],
      status: [1],
      reason: ['Draft'],
      clerkEmail: [''],
      managerEmail: [''],
    });
    this.id = this.route.snapshot.paramMap.get('mReportNumber');
    this.locomotiveService
      .getOneMileageById(this.id)
      .pipe(first())
      .subscribe((res) => {
        if (res != undefined && res != null) {
          console.log(res);
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
          if (this.nxtScheduleId === '') {
            this.isNextSchedule = false;
          }
        }
      });
  }

  backClicked() {
    this._location.back();
  }
}
