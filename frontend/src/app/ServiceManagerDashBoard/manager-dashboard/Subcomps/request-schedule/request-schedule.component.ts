import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import UserDTO from "../../../../dto/UserDTO";
import {AccessService} from "../../../../service/access.service";
import {ScheduleService} from "../../../../service/schedule.service";
import {first} from "rxjs/operators";
import swal from "sweetalert";
import {LocomotiveService} from "../../../../service/locomotive.service";

@Component({
  selector: 'app-request-schedule',
  templateUrl: './request-schedule.component.html',
  styleUrls: ['./request-schedule.component.css']
})
export class RequestScheduleComponent implements OnInit {
  ScheduleGroup: FormGroup;
  public selectedIndex: number = 0;
  myControl = new FormControl();
  mainMotorList: string[] = ['Main Generator', 'Main Alternator', 'Auxiliary Alternator', 'Fuel Blower Motor', 'Air baths'];
  tMotorsList: string[] = [ 'Traction Motors', 'Axle Generators', 'Pinion & Gear'];
  bodyLocoList: string[] = [ 'Axle', 'Body Plates', 'Wheels', 'Truck Frames'];
  electricControlList: string[] = ['Control Desk', 'Main Generators', 'Lights', 'Electric Controls', 'Battery'];
  eMechanicalMaList: string[] = [ 'Turbo Charger', 'Gear Box', 'Radiator', 'Drive Shaft'];
  eSwitchList: string[]= ['Engine over Switch', 'Engine Temperature Switch', 'Power cut-out Switch', 'Low Water Switch', 'Blower Switch']
  options: string[] = ['M2', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12'];
  top = new FormControl();

  constructor(private formBuilder: FormBuilder, private accessService: AccessService, private scheduleService: ScheduleService,
              private locomotiveService: LocomotiveService) { }
  locoStatus: string[] = [
    'In', 'Out'
  ];
  managerList: UserDTO[] = [];
  supervisorList: UserDTO[] = [];
  loading =  false;
  mileageReport: any[] = [];

  ngOnInit(): void {
    this.ScheduleGroup = this.formBuilder.group({
      scheduleNo: ['', [Validators.required]],
      mReportNumber:  ['', [Validators.required]],
      scheduleDate: ['', [Validators.required]],
      completedDate: ['', [Validators.required]],
      locoCatId: ['', [Validators.required]],
      locoNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      locoMileage: ['', [Validators.required, Validators.minLength(5)]],
      locoStatus: ['', [Validators.required]],
      managerNic: ['', [Validators.required]],
      managerEmail: ['', [Validators.required]],
      managerName: ['', [Validators.required]],
      supervisorNic: ['', [Validators.required]],
      supervisorEmail: ['', [Validators.required]],
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
      scheduleStatus: [0],
      schReason: ['Draft'],
      scheduleProgress: [0]
      //mainMotor: new FormControl(this.mainMotorList[4])




      //mainMotor: ['', [Validators.required]]
    });
    this.loadMangers();
    this.loadSupervisor();
    this.loadMileageRep();
  }
  get getFm(){
    return this.ScheduleGroup.controls;
  }
  get mainMotorName(){
    return this.ScheduleGroup.get('mainMotorName');
  }
  get trackMotorName(){
    return this.ScheduleGroup.get('trackMotorName');
  }
  get locoBodyName(){
    return this.ScheduleGroup.get('locoBodyName');
  }
  get otherMechArray(){
    return this.getFm.otherMotors as FormArray;
  }
  get electricCUnitName(){
    return this.ScheduleGroup.get('electricCUnitName');
  }
  get eMechanicalName(){
    return this.ScheduleGroup.get('eMechanicalName');
  }
  get eSwitchName(){
    return this.ScheduleGroup.get('eSwitchName');
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

  onSubmit(){
    console.log(this.ScheduleGroup.value);

    // if(this.filesToUpload.)




    this.scheduleService.saveOfSchedule(this.ScheduleGroup.value)
      .pipe(first()).subscribe(
      res => {
        console.log(res);
        if (res.isSaved) {
          swal({
            title: 'Record Saved!',
            text: 'Please Click OK',
            icon: 'success',
          });
          setTimeout(() => {
            this.refresh();
          }, 3000);

        } else {
          swal({
            title: 'Record already Exits',
            text: 'Please Click OK',
            icon: 'error',
          });
          setTimeout(() => {
            this.refresh();
          }, 3000);
        }
      },

      error => {
        console.log(error);
      },
      () => {
        console.log('dss');
      }
    )
  }
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
  private loadMileageRep(){
    this.loading = true;
    this.locomotiveService.getAcceptedMileage().subscribe(result => {
      this.mileageReport =  result;
      console.log(this.mileageReport)
      this.loading =  true;
    })
  }
  refresh(): void {
    window.location.reload();
  }
  onChangeSelect(value: string){
    const userNic = value ;
    console.log(this.getFm.supervisorNic.value);
    this.accessService.getOneSup(this.getFm.supervisorName.value).pipe(first())
      .subscribe(
        res=>{
          this.ScheduleGroup.controls['supervisorEmail'].setValue(res[0].userEmail);
          this.ScheduleGroup.controls['supervisorNic'].setValue(res[0].userNic);

          console.log(res);
        }
      )
  }
  onChangeSelectMan(value: string){
    const userNic = value ;
    console.log(this.getFm.managerNic.value);
    this.accessService.getOneMan(this.getFm.managerName.value).pipe(first())
      .subscribe(
        res=>{
          this.ScheduleGroup.controls['managerEmail'].setValue(res[0].userEmail);
          this.ScheduleGroup.controls['managerNic'].setValue(res[0].userNic);

          console.log(res);
        }
      )
  }
  onChangeSelectMil(value: string){
    const userNic = value ;
    console.log(this.getFm.mReportNumber.value);
    this.locomotiveService.getOneMileage(this.getFm.mReportNumber.value).pipe(first())
      .subscribe(
        res=>{
          this.ScheduleGroup.controls['locoCatId'].setValue(res[0].mLocoCatId);
          this.ScheduleGroup.controls['locoNumber'].setValue(res[0].mLocoNumber);
          this.ScheduleGroup.controls['locoMileage'].setValue(res[0].mLocoMileage);
          this.ScheduleGroup.controls['locoStatus'].setValue(res[0].userEmail);
          //console.log(res);
        }
      )
  }

}
