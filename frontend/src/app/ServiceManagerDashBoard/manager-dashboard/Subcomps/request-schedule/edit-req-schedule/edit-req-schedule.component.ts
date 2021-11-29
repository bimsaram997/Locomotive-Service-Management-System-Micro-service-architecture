import { first } from 'rxjs/operators';
import { LocomotiveService } from './../../../../../service/locomotive.service';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AccessService } from '../../../../../service/access.service';
import { ScheduleService } from '../../../../../service/schedule.service';
import UserDTO from '../../../../../dto/UserDTO';
import { Location } from '@angular/common';
import * as moment from 'moment';
@Component({
  selector: 'app-edit-req-schedule',
  templateUrl: './edit-req-schedule.component.html',
  styleUrls: ['./edit-req-schedule.component.css'],
})
export class EditReqScheduleComponent implements OnInit {
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
  taskId: string;
  scheduleId: any;
  disableDate: boolean = false;
  minDate: any;
  maxDate: any;
  mileageDate: any;
  minComDate: string;
  disableComDate: boolean = false;
  maxComDate: string;
  locoStatus: string[] = ['In', 'Out'];
  managerList: UserDTO[] = [];
  supervisorList: UserDTO[] = [];
  loading = false;
  mileageReport: any[] = [];
  lengthCount = false;

  locoNumber: any;
  constructor(
    private formBuilder: FormBuilder,
    private accessService: AccessService,
    private scheduleService: ScheduleService,
    private _location: Location,
    private locomotiveService: LocomotiveService
  ) {}

  ngOnInit(): void {
    this.loadMangers();
    this.loadSupervisor();
    this.createForm();
  }

  createForm() {
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
    if (this.getFm.mOther.value !== '') {
      this.otherMechArray.push(
        this.formBuilder.group({
          Name: [this.getFm.mOther.value],
        })
      );
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
    if (this.getFm.eOther.value !== '') {
      this.otherElectricArray.push(
        this.formBuilder.group({
          Name: [this.getFm.eOther.value],
        })
      );
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
  onSubmit() {}
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

  backClicked() {
    this._location.back();
  }

  onChangeSelectMil(value: string) {
    this.disableDate = true;
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
        this.mileageDate = res[0].mileageDate;
        this.getMinDate(this.mileageDate);
        this.getMaxDate(this.mileageDate);
        this.getLoco(this.locoNumber);
        this.setManagerDetails();
        this.ScheduleGroup.get('scheduleDate').valueChanges.subscribe((x) => {
          this.getMinComDate(x);
          this.getMaxComDate(x);
          this.disableComDate = true;
        });

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

  getMinDate(mileageDate): void {
    const date = moment(mileageDate);
    const newDate = date.subtract(3, 'days');
    this.minDate = moment(newDate).toISOString();
  }

  getMaxDate(mileageDate): void {
    const date = moment(mileageDate);
    const newDate = date.add(10, 'days');
    this.maxDate = moment(newDate).toISOString();
  }
  getMinComDate(scheduleDate): void {
    const date = moment(scheduleDate);
    //const newDate = date.subtract(3, 'days');
    this.minComDate = moment(date).toISOString();
  }

  getMaxComDate(scheduleDate): void {
    const date = moment(scheduleDate);
    const newDate = date.add(35, 'days');
    this.maxComDate = moment(newDate).toISOString();
    1;
    2;
    3;

    this.ScheduleGroup.get('completedDate').setValue('', { emitEvent: false });
  }
}
