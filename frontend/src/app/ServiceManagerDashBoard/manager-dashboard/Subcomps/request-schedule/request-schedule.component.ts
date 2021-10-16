import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import UserDTO from '../../../../dto/UserDTO';
import { AccessService } from '../../../../service/access.service';
import { ScheduleService } from '../../../../service/schedule.service';
import { first } from 'rxjs/operators';
import swal from 'sweetalert';
import { LocomotiveService } from '../../../../service/locomotive.service';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { formatDate } from '@angular/common';
import * as moment from 'moment';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-schedule',
  templateUrl: './request-schedule.component.html',
  styleUrls: ['./request-schedule.component.css'],
})
export class RequestScheduleComponent implements OnInit {
  ScheduleGroup: FormGroup;
  public selectedIndex: number = 0;
  myControl = new FormControl();
  mainMotorList: string[] = [
    'Main Generator',
    'Main Alternator',
    'Auxiliary Alternator',
    'Fuel Blower Motor',
    'Air baths',
  ];
  tMotorsList: string[] = [
    'Traction Motors',
    'Axle Generators',
    'Pinion & Gear',
  ];
  bodyLocoList: string[] = ['Axle', 'Body Plates', 'Wheels', 'Truck Frames'];
  electricControlList: string[] = [
    'Control Desk',
    'Main Generators',
    'Lights',
    'Electric Controls',
    'Battery',
  ];
  eMechanicalMaList: string[] = [
    'Turbo Charger',
    'Gear Box',
    'Radiator',
    'Drive Shaft',
  ];
  eSwitchList: string[] = [
    'Engine over Switch',
    'Engine Temperature Switch',
    'Power cut-out Switch',
    'Low Water Switch',
    'Blower Switch',
  ];
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
  top = new FormControl();
  spinner = false;
  name: any;
  tabId: number;
  constructor(
    private formBuilder: FormBuilder,
    private accessService: AccessService,
    private scheduleService: ScheduleService,
    private locomotiveService: LocomotiveService,
    private _location: Location,
    private router: Router
  ) {}
  locoStatus: string[] = ['In', 'Out'];
  managerList: UserDTO[] = [];
  supervisorList: UserDTO[] = [];
  loading = false;
  mileageReport: any[] = [];
  lengthCount = false;

  locoNumber: any;

  ngOnInit(): void {
    this.ScheduleGroup = this.formBuilder.group({
      scheduleNo: [''],
      mReportNumber: ['', [Validators.required]],
      scheduleDate: ['', [Validators.required]],
      completedDate: ['', [Validators.required]],
      locoCatId: ['', [Validators.required]],
      locoNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      locoMileage: ['', [Validators.required, Validators.minLength(5)]],
      locoStatus: ['', [Validators.required]],
      managerNic: ['', [Validators.required]],
      managerEmail: [''],
      managerName: [''],
      supervisorNic: [''],
      supervisorEmail: ['', [Validators.required]],
      supervisorName: ['', [Validators.required]],
      mechanical: [false],
      electrical: [false],
      mainMotorName: [''],
      trackMotorName: [''],
      locoBodyName: [''],
      otherMotors: new FormArray([]),
      mOther: [''],
      electricCUnitName: [''],
      eMechanicalName: [''],
      eSwitchName: [''],
      otherElectric: new FormArray([]),
      eOther: [''],
      specialNote: [''],
      scheduleStatus: [0],
      schReason: ['Draft'],
      scheduleProgress: [0],
      //mainMotor: new FormControl(this.mainMotorList[4])

      //mainMotor: ['', [Validators.required]]
    });

    this.loadMangers();
    this.loadSupervisor();
    this.loadMileageRep();
    this.defaultMethod();
  }

  get getFm() {
    return this.ScheduleGroup.controls;
  }
  get mainMotorName() {
    return this.ScheduleGroup.get('mainMotorName');
  }
  get trackMotorName() {
    return this.ScheduleGroup.get('trackMotorName');
  }
  get locoBodyName() {
    return this.ScheduleGroup.get('locoBodyName');
  }
  get otherMechArray() {
    return this.getFm.otherMotors as FormArray;
  }
  get electricCUnitName() {
    return this.ScheduleGroup.get('electricCUnitName');
  }
  get eMechanicalName() {
    return this.ScheduleGroup.get('eMechanicalName');
  }
  get eSwitchName() {
    return this.ScheduleGroup.get('eSwitchName');
  }
  get otherElectricArray() {
    return this.getFm.otherElectric as FormArray;
  }
  onClickMotor() {
    if (this.getFm.mOther.value !== null) {
      const _findDupli = this.getFm.otherMotors.value.find(
        (f) => f.Name == this.getFm.mOther.value
      );
      if (!_findDupli) {
        this.otherMechArray.push(
          this.formBuilder.group({
            Name: [this.getFm.mOther.value],
          })
        );
      } else {
        swal({
          title: 'Value already Exits',
          text: 'Please Click OK',
          icon: 'error',
        });
      }
    } else {
      swal({
        title: 'Values can not be empty',
        icon: 'error',
      });
    }
  }
  onClickremoveField(index = null, value) {
    switch (value) {
      case 'main':
        while (this.otherMechArray.length !== 0) {
          this.otherMechArray.removeAt(0);
        }
        break;
      case 'sub':
        this.otherMechArray.removeAt(index);
        break;
    }
  }
  onClickElectric() {
    if (this.getFm.eOther.value !== null) {
      const _findDupli = this.getFm.otherElectric.value.find(
        (f) => f.Name == this.getFm.eOther.value
      );

      if (!_findDupli) {
        this.otherElectricArray.push(
          this.formBuilder.group({
            Name: [this.getFm.eOther.value],
          })
        );
      } else {
        swal({
          title: 'Value already Exits',
          text: 'Please Click OK',
          icon: 'error',
        });
      }
    } else {
      swal({
        title: 'Values can not be empty',
        icon: 'error',
      });
    }
  }
  onClickremoveFieldElectic(index = null, value) {
    switch (value) {
      case 'main':
        while (this.otherElectricArray.length !== 0) {
          this.otherElectricArray.removeAt(0);
        }
        break;
      case 'sub':
        this.otherElectricArray.removeAt(index);
        break;
    }
  }

  onSubmit() {
    let obj = {
      locoCatId: this.ScheduleGroup.controls.locoCatId.value,
      locoNumber: this.ScheduleGroup.controls.locoNumber.value,
      mReportNumber: this.ScheduleGroup.controls.mReportNumber.value,
      scheduleDate: this.ScheduleGroup.controls.scheduleDate.value,
      completedDate: this.ScheduleGroup.controls.completedDate.value,
      locoMileage: this.ScheduleGroup.controls.locoMileage.value,
      locoStatus: this.ScheduleGroup.controls.locoStatus.value,
      managerNic: this.ScheduleGroup.controls.managerNic.value,
      managerEmail: this.ScheduleGroup.controls.managerEmail.value,
      managerName: this.ScheduleGroup.controls.managerName.value,
      supervisorNic: this.ScheduleGroup.controls.supervisorNic.value,
      supervisorEmail: this.ScheduleGroup.controls.supervisorEmail.value,
      supervisorName: this.ScheduleGroup.controls.supervisorName.value,
    };
    console.log(this.ScheduleGroup.value);
    if (
      obj.locoCatId != '' &&
      obj.locoNumber != '' &&
      obj.mReportNumber != '' &&
      obj.scheduleDate != '' &&
      obj.completedDate != '' &&
      obj.locoMileage != '' &&
      obj.locoStatus != '' &&
      obj.managerNic != '' &&
      obj.managerEmail != '' &&
      obj.managerName != '' &&
      obj.supervisorNic != '' &&
      obj.supervisorEmail != '' &&
      obj.supervisorName != ''
    ) {
      this.scheduleEmail(this.ScheduleGroup.value);
      // if(this.filesToUpload.)
      this.spinner = true;
      this.scheduleService
        .saveOfSchedule(this.ScheduleGroup.value)
        .pipe(first())
        .subscribe(
          (res) => {
            console.log(res);
            if (res.isSaved) {
              this.patchSch(this.ScheduleGroup.value);
              this.patchSchMileage(this.ScheduleGroup.value);
              swal({
                title: 'Record Saved!',
                text: 'Please Click OK',
                icon: 'success',
              });
              this.spinner = false;
              setTimeout(() => {
                // this.refresh();
                this.router.navigate([
                  '/managerDashBoard/viewManagerSchedules',
                ]);
              }, 3000);
            } else {
              swal({
                title: 'Record already Exits',
                text: 'Please Click OK',
                icon: 'error',
              });
              setTimeout(() => {
                //this.refresh();
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
      this.spinner = false;
      swal({
        title: 'Please fill required fields',
        icon: 'error',
      });
      setTimeout(() => {
        //this.refresh();
        this.tabId = 0;
      }, 3000);
    }
  }

  private loadMangers() {
    this.loading = true;
    this.accessService.getMangers().subscribe((result) => {
      this.managerList = result;
      this.loading = true;
    });
  }

  private loadSupervisor() {
    this.loading = true;
    this.accessService.getAllUsers().subscribe((result) => {
      this.supervisorList = result;
      this.loading = true;
    });
  }
  private loadMileageRep() {
    this.loading = true;
    this.locomotiveService.getAcceptedMileage().subscribe((result) => {
      this.mileageReport = result;
      if (this.mileageReport.length === 0) {
        console.log('dsdsd');
        this.lengthCount = true;
      }
      console.log(this.mileageReport);
      this.loading = true;
    });
  }
  refresh(): void {
    window.location.reload();
  }
  onChangeSelect(value: string) {
    const userNic = value;
    console.log(this.getFm.supervisorNic.value);
    this.accessService
      .getOneSup(this.getFm.supervisorName.value)
      .pipe(first())
      .subscribe((res) => {
        this.ScheduleGroup.controls['supervisorEmail'].setValue(
          res[0].userEmail
        );
        this.ScheduleGroup.controls['supervisorNic'].setValue(res[0].userNic);

        console.log(res);
      });
  }

  onChangeSelectMan(value: string) {
    const userNic = value;
    console.log(this.getFm.managerNic.value);

    this.accessService
      .getOneMan(this.getFm.managerName.value)
      .pipe(first())
      .subscribe((res) => {
        this.ScheduleGroup.controls['managerEmail'].setValue(res[0].userEmail);
        this.ScheduleGroup.controls['managerNic'].setValue(res[0].userNic);

        console.log(res);
      });
  }
  onChangeSelectMil(value: string) {
    const userNic = value;
    console.log(this.getFm.mReportNumber.value);
    this.locomotiveService
      .getOneMileage(this.getFm.mReportNumber.value)
      .pipe(first())
      .subscribe((res) => {
        this.ScheduleGroup.controls['locoCatId'].setValue(res[0].mLocoCatId);
        this.ScheduleGroup.controls['locoNumber'].setValue(res[0].mLocoNumber);
        this.ScheduleGroup.controls['locoMileage'].setValue(
          res[0].mLocoMileage
        );
        this.ScheduleGroup.controls['locoStatus'].setValue(res[0].userEmail);
        this.locoNumber = res[0].mLocoNumber;
        this.getLoco(this.locoNumber);
        this.setManagerDetails();

        //console.log(res);
      });
  }

  setManagerDetails() {
    const values = JSON.parse(localStorage.getItem('currentUser'));
    this.name = values.userName;
    this.accessService
      .getOneMan(this.name)
      .pipe(first())
      .subscribe((res) => {
        this.ScheduleGroup.controls['managerName'].setValue(res[0].userName);
        this.ScheduleGroup.controls['managerEmail'].setValue(res[0].userEmail);
        this.ScheduleGroup.controls['managerNic'].setValue(res[0].userNic);

        console.log(res);
      });
  }
  getLoco(obj) {
    //console.log(obj)
    this.locomotiveService
      .getLocoNum(obj)
      .pipe(first())
      .subscribe((res) => {
        console.log(res);
        this.ScheduleGroup.controls['supervisorNic'].setValue(res[0].userNic);
        this.ScheduleGroup.controls['supervisorEmail'].setValue(
          res[0].supervisorEmail
        );
        this.ScheduleGroup.controls['supervisorName'].setValue(
          res[0].supervisorName
        );
      });
  }

  patchSch(object) {
    this.locomotiveService
      .patchSch(object)
      .pipe(first())
      .subscribe((res) => {
        console.log(res);
      });
  }
  patchSchMileage(object) {
    this.locomotiveService
      .patchSchMileage(object)
      .pipe(first())
      .subscribe((res) => {
        console.log(res);
        console.log('ss');
      });
  }

  defaultMethod() {
    //Id Gen
    var chars = 'ABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890';

    var string_length = 8;
    var scheduleNo = 'SH_' + '';
    //var sysId = "ST_"+"";
    for (var i = 0; i < string_length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      scheduleNo += chars.substring(rnum, rnum + 1);
      ///sysId += chars.substring(rnum, rnum + 1);
      this.ScheduleGroup.controls['scheduleNo'].setValue(scheduleNo);
      //this.LocoGroup.controls["id"].setValue(sysId);
    }
    //this.staffGroup.controls['jDate'].setValue(moment().format('YYYY-MM-DD'));
  }

  scheduleEmail(obj) {
    this.scheduleService
      .scheduleEmail(obj)
      .pipe(first())
      .subscribe(
        (res) => {},
        (error) => {
          console.log(error);
        }
      );
  }

  backClicked() {
    this._location.back();
  }
}
