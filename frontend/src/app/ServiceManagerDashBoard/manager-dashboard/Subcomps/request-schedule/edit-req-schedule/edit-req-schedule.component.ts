import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AccessService} from "../../../../../service/access.service";
import {ScheduleService} from "../../../../../service/schedule.service";
import UserDTO from "../../../../../dto/UserDTO";

@Component({
  selector: 'app-edit-req-schedule',
  templateUrl: './edit-req-schedule.component.html',
  styleUrls: ['./edit-req-schedule.component.css']
})
export class EditReqScheduleComponent implements OnInit {
  editScheduleGroup: FormGroup;
  public selectedIndex: number = 0;
  myControl = new FormControl();
  mainMotorList: string[] = ['Main Generator', 'Main Alternator', 'Auxiliary Alternator', 'Fuel Blower Motor', 'Air baths'];
  tMotorsList: string[] = [ 'Traction Motors', 'Axle Generators', 'Pinion & Gear'];
  bodyLocoList: string[] = [ 'Axle', 'Body Plates', 'Wheels', 'Truck Frames'];
  electricControlList: string[] = ['Control Desk', 'Main Generators', 'Lights', 'Electric Controls', 'Battery'];
  eMechanicalMaList: string[] = [ 'Turbo Charger', 'Gear Box', 'Radiator', 'Drive Shaft'];
  eSwitchList: string[] = ['Engine over Switch', 'Engine Temperature Switch', 'Power cut-out Switch', 'Low Water Switch', 'Blower Switch']
  options: string[] = ['M2', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12'];
  top = new FormControl();
  locoStatus: string[] = [
    'In', 'Out'
  ];
  managerList: UserDTO[] = [];
  supervisorList: UserDTO[] = [];
  loading =  false;
  constructor(private formBuilder: FormBuilder, private accessService: AccessService, private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.editScheduleGroup = this.formBuilder.group({
      scheduleNo: ['', [Validators.required]],
      mReportNumber:  ['', [Validators.required]],
      scheduleDate: ['', [Validators.required]],
      completedDate: ['', [Validators.required]],
      locoCatId: ['', [Validators.required]],
      locoNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      locoMileage: ['', [Validators.required, Validators.minLength(5)]],
      locoStatus: ['', [Validators.required]],
      managerEmail: ['', [Validators.required]],
      managerName: ['', [Validators.required]],
      supervisorNic: ['', [Validators.required]],
      supervisorName: ['', [Validators.required]],
      mechanical: [''],
      electrical: [''],
      mainMotorName: ['', [Validators.required]],
      trackMotorName: ['', [Validators.required]],
      locoBodyName: ['', [Validators.required]],
      otherMotors: new FormArray ([]),
      mOther: ['', Validators.required],
      electricCUnitName: ['', [Validators.required]],
      eMechanicalName: ['', [Validators.required]],
      eSwitchName: ['', [Validators.required]],
      otherElectric: new FormArray ([]),
      eOther: ['', Validators.required],
      specialNote: ['', [Validators.required]],
      scheduleStatus: [1],
      scheduleProgress: ['0%']
      //mainMotor: new FormControl(this.mainMotorList[4])




      //mainMotor: ['', [Validators.required]]
    });
    this.loadMangers();
    this.loadSupervisor();
  }


  get getFm(){
    return this.editScheduleGroup.controls;
  }
  get mainMotorName(){
    return this.editScheduleGroup.get('mainMotorName');
  }
  get trackMotorName(){
    return this.editScheduleGroup.get('trackMotorName');
  }
  get locoBodyName(){
    return this.editScheduleGroup.get('locoBodyName');
  }
  get otherMechArray(){
    return this.getFm.otherMotors as FormArray;
  }
  get electricCUnitName(){
    return this.editScheduleGroup.get('electricCUnitName');
  }
  get eMechanicalName(){
    return this.editScheduleGroup.get('eMechanicalName');
  }
  get eSwitchName(){
    return this.editScheduleGroup.get('eSwitchName');
  }
  get otherElectricArray(){
    return this.getFm.otherElectric as FormArray;
  }
  onClickMotor() {
    if (this.getFm.mOther.value !== ''){
      this.otherMechArray.push(this.formBuilder.group({
        Name: [this.getFm.mOther.value],


      }));
    }

  }
  onClickremoveField(index = null, value) {

    switch(value) {
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
    if (this.getFm.eOther.value !== ''){
      this.otherElectricArray.push(this.formBuilder.group({
        Name: [this.getFm.eOther.value],


      }));
    }

  }
  onClickremoveFieldElectic(index = null, value) {

    switch(value) {
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
  onSubmit(){}
  private loadMangers() {
    this.loading = true;
    this.accessService.getMangers().subscribe(result => {
      this.managerList = result;
      this.loading = true;
    });
  }
  private loadSupervisor() {
    this.loading = true;
    this.accessService.getAllUsers().subscribe(result => {
      this.supervisorList = result;
      this.loading = true;
    });
  }
}
