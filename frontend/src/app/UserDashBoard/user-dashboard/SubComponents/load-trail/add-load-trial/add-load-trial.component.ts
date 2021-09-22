import { LocomotiveService } from './../../../../../service/locomotive.service';
import { LoadTrialService } from './../../../../../service/load-trial.service';
import { AccessService } from './../../../../../service/access.service';
import { ScheduleService } from './../../../../../service/schedule.service';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UpdateFinalMileageComponent } from '../update-final-mileage/update-final-mileage.component';
import { first } from 'rxjs/operators';
import { isThisISOWeek } from 'date-fns';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-load-trial',
  templateUrl: './add-load-trial.component.html',
  styleUrls: ['./add-load-trial.component.css'],
})
export class AddLoadTrialComponent implements OnInit {
  public selectedIndex: number = 0;
  LoadTrial: FormGroup;
  items: FormArray;
  itemsStop: FormArray;
  dynamicBrake: FormArray;
  notches: string[] = ['Notch 1', 'Notch 2'];
  testType: string[] = ['Working', 'Not Working'];
  minDate: Date;
  maxDate: Date;
  buttonCount = 0;
  studentCount = 4;
  clicked = false;
  scheduleArray: any[] = [];
  loading: boolean;
  supervisorList: any[] = [];
  managerList: any[] = [];
  dataArray: string[] = [];
  lNumber: string;
  lCatId: string;
  lDate: string;
  display = false;
  lengthCount: boolean = false;
  checkId: boolean = false;
  searchKey: string;
  spinner = false;

  ids: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private scheduleService: ScheduleService,
    private accessService: AccessService,
    private loadTrialService: LoadTrialService,
    private router: Router,
    private _location: Location,
    private locomotiveService: LocomotiveService
  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 0, 8, -9);
    this.maxDate = new Date(currentYear + 1, -5, 30);
  }

  ngOnInit(): void {
    this.LoadTrial = this.formBuilder.group({
      loadNo: [''],
      loadDate: ['', [Validators.required]],
      loadFrom: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      loadTo: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      scheduleNo: ['', [Validators.required]],
      locoCatId: ['', [Validators.required]],
      locoNumber: ['', [Validators.required]],
      supervisorName: ['', [Validators.required]],
      supervisorNic: ['', [Validators.required]],
      supervisorEmail: ['', [Validators.required]],
      managerName: ['', [Validators.required]],
      managerNic: ['', [Validators.required]],
      managerEmail: ['', [Validators.required]],
      items: this.formBuilder.array([this.createItem()]),
      itemsStop: this.formBuilder.array([this.createStopItem()]),
      dynamicBrake: this.formBuilder.array([this.createDynItem()]),
      loadNote: ['', [Validators.required]],
      startMileage: ['', [Validators.pattern('^[0-9]*$')]],
      endMileage: ['', [Validators.pattern('^[0-9]*$')]],
      status: [1],
      reason: ['Draft'],
      comments: [''],
    });
    this.getAllSchedules();
    this.loadSupervisor();
    this.loadMangers();
    this.showIds();
    this.defaultMethod();
  }

  get getFm() {
    return this.LoadTrial.controls;
  }

  backClicked() {
    this._location.back();
  }

  onSubmit() {
    console.log(this.LoadTrial.value);

    // if(this.filesToUpload.)
    this.spinner = true;
    this.loadTrialService
      .saveLoadTrial(this.LoadTrial.value)
      .pipe(first())
      .subscribe(
        (res) => {
          console.log(res);
          if (res.isSaved) {
            this.patchFinalMile(this.LoadTrial.value);
            this.assignedLoadTrial(this.LoadTrial.value);
            swal({
              title: 'Record Saved!',
              icon: 'success',
            });

            setTimeout(() => {
              //this.refresh();
              this.LoadTrial.reset();
              this.spinner = false;
              this.router.navigate(['/userDashboard/viewLoad']);
            }, 3000);
          } else {
            swal({
              title: 'Record already Exits',
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
  }

  add(data) {
    console.log(data);
  }

  assignedLoadTrial(obj: any) {
    this.scheduleService.assignedLoadTrial(obj).subscribe((res) => {
      console.log('Schedule updated successfully!');
    });
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      running: true,
      description: ['', Validators.required],
      condition: '',
      action: '',
    });
  }
  createStopItem(): FormGroup {
    return this.formBuilder.group({
      running: true,
      description: ['', [Validators.required]],
      condition: '',
      action: '',
    });
  }
  createDynItem(): FormGroup {
    return this.formBuilder.group({
      notch: '',
      tractionMtr: [0, [Validators.required]],
      mainGen: 0,
    });
  }
  addItem(): void {
    this.items = this.LoadTrial.get('items') as FormArray;
    console.log(this.items.value);
    this.items.push(this.createItem());
  }
  addStopItem(): void {
    this.items = this.LoadTrial.get('itemsStop') as FormArray;
    this.items.push(this.createStopItem());
  }
  addDynItem(): void {
    let c = 0;
    this.items = this.LoadTrial.get('dynamicBrake') as FormArray;
    console.log(this.items.value);
    this.items.push(this.createDynItem());
    this.buttonCount++;
    console.log(this.buttonCount);
  }
  removeItem(index = null, value) {
    switch (value) {
      case 'main':
        while (this.items.length !== 1) {
          this.items.removeAt(1);
        }
        break;
      case 'sub':
        this.items.removeAt(index);
        this.buttonCount = 0;
        break;
    }
    //this.items.removeAt(this.items.length - 1);
  }
  openDialog(): void {
    this.display = !this.display;
  }
  getAllSchedules() {
    const values = JSON.parse(localStorage.getItem('currentUser'));
    const object = {
      userNic: values.userNic,
      userRole: values.userRole,
    };
    this.scheduleService.getAllCompSchedule(object).subscribe((res) => {
      this.scheduleArray = res;
      console.log(this.scheduleArray);
      if (this.scheduleArray.length === 0) {
        this.lengthCount = true;
      }
    });
  }
  private loadSupervisor() {
    this.loading = true;
    this.accessService.getAllUsers().subscribe((result) => {
      this.supervisorList = result;
      this.loading = true;
    });
  }
  private loadMangers() {
    this.loading = true;
    this.accessService.getMangers().subscribe((result) => {
      this.managerList = result;
      this.loading = true;
    });
  }
  onChangeSelect(value: string) {
    const userNic = value;
    console.log(this.getFm.supervisorNic.value);
    this.accessService
      .getOneSup(this.getFm.supervisorName.value)
      .pipe(first())
      .subscribe((res) => {
        this.LoadTrial.controls['supervisorEmail'].setValue(res[0].userEmail);
        this.LoadTrial.controls['supervisorNic'].setValue(res[0].userNic);

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
        this.LoadTrial.controls['managerEmail'].setValue(res[0].userEmail);
        this.LoadTrial.controls['managerNic'].setValue(res[0].userNic);

        console.log(res);
      });
  }
  onChangeSelectSch(value: string) {
    console.log(this.getFm.scheduleNo.value);
    this.scheduleService
      .getOneSchedule(this.getFm.scheduleNo.value)
      .pipe(first())
      .subscribe((res) => {
        this.LoadTrial.controls['locoCatId'].setValue(res[0].locoCatId);
        this.LoadTrial.controls['locoNumber'].setValue(res[0].locoNumber);
        this.LoadTrial.controls['startMileage'].setValue(res[0].locoMileage);
        this.LoadTrial.controls['supervisorName'].setValue(
          res[0].supervisorName
        );
        this.LoadTrial.controls['supervisorEmail'].setValue(
          res[0].supervisorEmail
        );
        this.LoadTrial.controls['supervisorNic'].setValue(res[0].supervisorNic);
        this.LoadTrial.controls['managerName'].setValue(res[0].managerName);
        this.LoadTrial.controls['managerEmail'].setValue(res[0].managerEmail);
        this.LoadTrial.controls['managerNic'].setValue(res[0].managerNic);

        console.log(res);
        this.lNumber = res[0].locoNumber;
        this.lCatId = res[0].locoCatId;
        this.getMileVal(res[0].locoCatId, res[0].locoNumber);
      });
  }
  getMileVal(val1: string, val2: string) {
    this.dataArray.push(val1, val2);
    //console.log(this.dataArray);
  }

  patchFinalMile(object) {
    this.locomotiveService
      .patchFinalMile(object)
      .pipe(first())
      .subscribe((res) => {
        console.log(res);
      });
  }

  showIds() {
    //  this.loadTrialService.getAllLoadTrial().subscribe(resp=>{
    //    console.log(resp)
    //     for(let i=0; i<resp.length; i++){
    //     this.ids.push(resp[i].loadNo)
    //     }
    //   })
    //    console.log(this.ids);
  }

  checkIDs(value: string) {
    const id = this.getFm.loadNo.value;

    for (let i = 0; i < this.ids.length; i++) {
      if (id === this.ids[i]) {
        console.log('error');
        this.checkId = true;
      } else {
        console.log('hshs');
        //this.checkId = false;
      }
    }
  }

  onSearchClear() {
    this.searchKey = '';
    //this.applyFilter();
    this.checkId = false;
  }

  defaultMethod() {
    //Id Gen
    var chars = 'ABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890';

    var string_length = 8;
    var loadNo = 'L_' + '';
    //var sysId = "ST_"+"";
    for (var i = 0; i < string_length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      loadNo += chars.substring(rnum, rnum + 1);
      ///sysId += chars.substring(rnum, rnum + 1);
      this.LoadTrial.controls['loadNo'].setValue(loadNo);
      //this.LocoGroup.controls["id"].setValue(sysId);
    }
    //this.staffGroup.controls['jDate'].setValue(moment().format('YYYY-MM-DD'));
  }
}
