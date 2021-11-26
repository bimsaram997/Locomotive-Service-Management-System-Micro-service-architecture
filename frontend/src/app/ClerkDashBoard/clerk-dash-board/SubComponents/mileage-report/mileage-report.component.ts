import { UserTaskService } from './../../../../service/user-task.service';
import { ViewNextSchedulesComponent } from './view-next-schedules/view-next-schedules.component';
import { ScheduleService } from 'src/app/service/schedule.service';
import { LoadTrialService } from './../../../../service/load-trial.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import UserDTO from '../../../../dto/UserDTO';
import { AccessService } from '../../../../service/access.service';
import { first } from 'rxjs/operators';
import swal from 'sweetalert';
import { LocomotiveService } from '../../../../service/locomotive.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-mileage-report',
  templateUrl: './mileage-report.component.html',
  styleUrls: ['./mileage-report.component.css'],
})
export class MileageReportComponent implements OnInit {
  managerList: UserDTO[] = [];
  locoStatus: string[] = ['In', 'Out'];
  myControl = new FormControl();
  myControl1 = new FormControl();
  loading = false;
  currentDate: any;
  locoList: any[] = [];
  nxtScheduleList: any[] = [];
  MileageGroup: FormGroup;
  spinner = false;
  locoCount = false;
  finalMile: number;
  currentMile: number;
  mileageGap: number;
  name: any;
  id: any;
  isEmergency: boolean = false;
  isEmpty: boolean = false;
  isLoco: boolean = true;
  options: string[] = [
    'M2',
    'M4',
    'M5',
    'M6',
    'M7',
    'M8',
    'M9',
    'M10',
    'M11',
    'M12',
  ];
  taskId: string;

  minDate: any;
  maxDate: any;
  mileageId: any;
  constructor(
    private accessService: AccessService,
    private formBuilder: FormBuilder,
    private locomotiveService: LocomotiveService,
    private router: Router,
    private route: ActivatedRoute,
    private bottomSheet: MatBottomSheet,
    private scheduleService: ScheduleService,
    private _location: Location,
    private toastr: ToastrService,
    private userTaskService: UserTaskService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.loadMangerEmail();
    this.loadLocoNum();
    this.defaultMethod();
    this.getAllNextSchedulesNotFilter();
    this.getUserDetails();
    this.TaskIdGenerate();
    this.getMinDate();
    this.getMaxDate();

    console.log(this.mileageGap);
  }

  getMinDate(): void {
    const date = moment(new Date());
    const newDate = date.subtract(1, 'days');
    this.minDate = moment(newDate).toISOString();
  }

  getMaxDate(): void {
    const date = moment(new Date());
    const newDate = date.add(2, 'days');
    this.maxDate = moment(newDate).toISOString();
  }

  createForm() {
    this.MileageGroup = this.formBuilder.group({
      mReportNumber: [''],
      mLocoCatId: ['', [Validators.required]],
      mLocoNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      mLocoMileage: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      finalMileage: [null],
      nxtScheduleId: [null],
      mileageDate: ['', [Validators.required]],
      locoStatus: ['', Validators.required],
      managerNic: ['', [Validators.required]],
      emergencyCheck: ['', [Validators.required]],
      managerName: ['', [Validators.required]],
      mileageNote: ['', [Validators.required, Validators.maxLength(1000)]],
      status: [1],
      reason: ['Draft'],

      clerkEmail: [''],
      managerEmail: [''],
    });
  }

  getUserDetails() {
    const values = JSON.parse(localStorage.getItem('currentUser'));
    this.name = values.userEmail;

    this.MileageGroup.controls['clerkEmail'].setValue(this.name);
  }

  get getFM() {
    return this.MileageGroup.controls;
  }

  onChangeSelect(value: string) {
    const userNic = value;
    console.log(this.getFM.mLocoNumber.value);
    this.locomotiveService
      .getOneLocoNew(this.getFM.mLocoNumber.value)
      .pipe(first())
      .subscribe((res) => {
        this.MileageGroup.controls['mLocoCatId'].setValue(res[0].locoCatId);
        this.MileageGroup.controls['mLocoMileage'].setValue(res[0].locoMileage);
        this.MileageGroup.controls['locoStatus'].setValue(
          res[0].locoAvailability
        );
        this.MileageGroup.controls['finalMileage'].setValue(res[0].endMileage);

        this.finalMile = res[0].endMileage;
        this.currentMile = res[0].locoMileage;
        // this.MileageGroup.controls['gap'].setValue(this.finalMile - this.currentMile);
        // this.mileageGap =
        //this.MileageGroup.controls['gap'].setValue(this.mileageGap)
        //  this.calculateMileageGap(this.finalMile, this.currentMile);
      });
  }
  calculateMileageGap(endMile: number, currentMile: number) {
    console.log(endMile, currentMile);
    this.mileageGap = endMile - currentMile;
  }
  backClicked() {
    this._location.back();
  }
  viewNextSchedules(): void {
    this.bottomSheet.open(ViewNextSchedulesComponent, {
      panelClass: 'full-width',
    });
  }

  onSubmit() {
    let obj = {
      mReportNumber: this.MileageGroup.controls.mReportNumber.value,
      mLocoCatId: this.MileageGroup.controls.mLocoCatId.value,
      mLocoNumber: this.MileageGroup.controls.mLocoNumber.value,
      mLocoMileage: this.MileageGroup.controls.mLocoMileage.value,
      finalMileage: this.MileageGroup.controls.finalMileage.value,
      mileageDate: this.MileageGroup.controls.mileageDate.value,
      locoStatus: this.MileageGroup.controls.locoStatus.value,
      managerNic: this.MileageGroup.controls.managerNic.value,
      emergencyCheck: this.MileageGroup.controls.emergencyCheck.value,
      managerName: this.MileageGroup.controls.managerName.value,
      mileageNote: this.MileageGroup.controls.mileageNote.value,
      status: this.MileageGroup.controls.status.value,
      reason: this.MileageGroup.controls.reason.value,
      clerkEmail: this.MileageGroup.controls.clerkEmail.value,
      managerEmail: this.MileageGroup.controls.managerEmail.value,
    };

    if (
      obj.mLocoNumber != '' &&
      obj.mLocoCatId != '' &&
      obj.mReportNumber != '' &&
      obj.mLocoMileage != '' &&
      obj.finalMileage != '' &&
      obj.mileageDate != '' &&
      obj.locoStatus != '' &&
      obj.managerNic != '' &&
      obj.emergencyCheck != '' &&
      obj.managerName != '' &&
      obj.mileageNote != '' &&
      obj.status != '' &&
      obj.reason != '' &&
      obj.clerkEmail != '' &&
      obj.managerEmail != ''
    ) {
      const checkEmergency = this.MileageGroup.controls['emergencyCheck'].value;
      if (checkEmergency === 'No') {
        this.spinner = true;
        this.locomotiveService
          .saveMileage(this.MileageGroup.value)
          .pipe(first())
          .subscribe(
            (res) => {
              if (res.isSaved) {
                this.sendMileEmail(this.MileageGroup.value);
                this.assignedToMileage(this.MileageGroup.value);
                this.mileageId =
                  this.MileageGroup.controls['mReportNumber'].value;
                this.changeStatusNextSchedule(this.MileageGroup.value);
                this.addTask();
                swal({
                  title: 'New Mileage Report Added!',
                  icon: 'success',
                });
                setTimeout(() => {
                  //this.MileageGroup.reset();
                  this.router.navigate(['/clerkDashBoard/viewMileages']);
                  this.spinner = false;
                }, 3000);
              } else {
                swal({
                  title: 'Record already Exits',
                  text: 'Please Click OK',
                  icon: 'error',
                });
                setTimeout(() => {
                  // this.refresh();
                  this.spinner = false;
                }, 3000);
              }
            },

            (error) => {
              console.log(error);
            },
            () => {
              console.log('dss');
            }
          );
      } else {
        this.spinner = true;
        this.locomotiveService
          .saveMileage(this.MileageGroup.value)
          .pipe(first())
          .subscribe(
            (res) => {
              if (res.isSaved) {
                this.mileageId =
                  this.MileageGroup.controls['mReportNumber'].value;
                this.sendMileEmail(this.MileageGroup.value);
                this.assignedToMileage(this.MileageGroup.value);
                this.addTask();

                swal({
                  title: 'Record Saved!',
                  text: 'Please Click OK',
                  icon: 'success',
                });
                setTimeout(() => {
                  //this.MileageGroup.reset();
                  this.router.navigate(['/clerkDashBoard/viewMileages']);
                  this.spinner = false;
                }, 3000);
              } else {
                swal({
                  title: 'Record already Exits',
                  text: 'Please Click OK',
                  icon: 'error',
                });
                setTimeout(() => {
                  // this.refresh();
                  this.spinner = false;
                }, 3000);
              }
            },

            (error) => {
              console.log(error);
            },
            () => {
              console.log('dss');
            }
          );
        console.log('dsdsdsdsd');
      }
    } else {
      this.spinner = false;
      swal({
        title: 'Please fill required fields',
        icon: 'error',
      });
      setTimeout(() => {
        //this.refresh();
      }, 3000);
    }
  }
  refresh(): void {
    window.location.reload();
  }

  private loadMangerEmail() {
    this.loading = true;
    this.accessService.getMangers().subscribe((result) => {
      this.managerList = result;
      this.loading = true;
    });
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

  onChangeEmergency(value: string) {
    console.log(this.getFM.emergencyCheck.value);
    const isCheck = this.getFM.emergencyCheck.value;
    if (isCheck === 'No') {
      this.isEmergency = true;
      this.isLoco = false;
    } else {
      this.isEmergency = false;
      this.isLoco = true;
    }
  }

  sendOneNextSchedule(value: string) {
    const nxtScheduleId = this.getFM.nxtScheduleId.value;
    this.currentDate = new Date();

    this.scheduleService.sendOneNextSchedule(nxtScheduleId).subscribe((res) => {
      console.log(moment(this.currentDate).format('YYYY-MM-DD'));
      const cDate = moment(this.currentDate).format('YYYY-MM-DD');
      const nxtDate = res[0].date;

      if (nxtDate === cDate) {
        this.MileageGroup.controls['nxtScheduleId'].setValue(res[0].nxtSchId);
        this.MileageGroup.controls['mLocoCatId'].setValue(res[0].locoCatId);
        this.MileageGroup.controls['mLocoNumber'].setValue(res[0].locoNumber);
        this.MileageGroup.controls['mLocoMileage'].setValue(
          res[0].startMileage
        );
        this.MileageGroup.controls['finalMileage'].setValue(res[0].endMileage);
      } else {
        console.log('sdsd');
        this.MileageGroup.reset();
        this.isEmergency = false;
        this.isLoco = true;
        this.onError(
          'Current Date and next schedule is not match.Please Add Emergency Schedule!'
        );

        // this.MileageGroup.controls['emergencyCheck'].setValue('');
        // this.MileageGroup.controls['nxtScheduleId'].setValue('');
        // this.MileageGroup.controls['mLocoCatId'].setValue('');
        // this.MileageGroup.controls['mLocoNumber'].setValue('');
        // this.MileageGroup.controls['mLocoMileage'].setValue('');
      }
    });
  }
  loadLocoNum() {
    this.loading = true;
    this.locomotiveService.getLocoReport().subscribe((result) => {
      if ((this.locoList.length = 0)) {
        this.locoCount = true;
      }
      this.locoList = result;
      this.loading = true;
    });
  }

  sendMileEmail(MileObj) {
    this.locomotiveService.sendMileEmail(MileObj).subscribe((result) => {
      if (result) {
        //this.onSucess('Sent');
        console.log(result);
      } else {
        console.log('failed');
      }
    });
  }

  assignedToMileage(object): void {
    this.locomotiveService.assignedToMileage(object).subscribe((result) => {
      //this.onSucess('Sent');
      console.log(result);
    });
  }

  defaultMethod() {
    //Id Gen
    var chars = 'ABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890';

    var string_length = 8;
    var mReportNumber = 'MI_' + '';
    //var sysId = "ST_"+"";
    for (var i = 0; i < string_length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      mReportNumber += chars.substring(rnum, rnum + 1);
      ///sysId += chars.substring(rnum, rnum + 1);
      this.MileageGroup.controls['mReportNumber'].setValue(mReportNumber);
      //this.LocoGroup.controls["id"].setValue(sysId);
    }
    //this.staffGroup.controls['jDate'].setValue(moment().format('YYYY-MM-DD'));
  }

  getAllNextSchedulesNotFilter() {
    this.scheduleService.getAllNextSchedulesNotFilter().subscribe((res) => {
      this.nxtScheduleList = res;
      if (this.nxtScheduleList.length === 0) {
        this.isEmpty = true;
      }
    });
  }

  changeStatusNextSchedule(obj) {
    this.scheduleService.changeStatusNextSchedule(obj).subscribe((res) => {
      console.log('dsd');
    });
  }

  onError(message: string) {
    this.toastr.info(message, 'Warning');
  }

  addTask(): void {
    const values = JSON.parse(localStorage.getItem('currentUser'));
    const object = {
      userNic: values.userNic,
      userRole: values.userRole,
      taskId: this.taskId,
      recordId: this.mileageId,
      taskType: 'Add Mileage',
      taskPriority: 'High',
      taskDate: new Date(),
      taskStatus: 4,
    };

    if (object != null) {
      this.userTaskService
        .saveTask(object)
        .pipe(first())
        .subscribe(
          (res) => {
            console.log(res);
            if (res.isSaved) {
            } else {
            }
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  TaskIdGenerate() {
    //Id Gen
    var chars = 'ABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890';

    var string_length = 8;
    var taskId = 'T_' + '';
    //var sysId = "ST_"+"";
    for (var i = 0; i < string_length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      taskId += chars.substring(rnum, rnum + 1);
      ///sysId += chars.substring(rnum, rnum + 1);
      this.taskId = taskId;
      //this.LocoGroup.controls["id"].setValue(sysId);
    }
    //this.staffGroup.controls['jDate'].setValue(moment().format('YYYY-MM-DD'));
  }
}
