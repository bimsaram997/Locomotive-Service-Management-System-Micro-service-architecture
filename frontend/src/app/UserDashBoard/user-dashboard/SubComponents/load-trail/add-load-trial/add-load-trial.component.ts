import { LoadTrialService } from './../../../../../service/load-trial.service';
import { AccessService } from './../../../../../service/access.service';
import { ScheduleService } from './../../../../../service/schedule.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UpdateFinalMileageComponent } from '../update-final-mileage/update-final-mileage.component';
import { first } from 'rxjs/operators';
import { isThisISOWeek } from 'date-fns';
import swal from "sweetalert";

@Component({
  selector: 'app-add-load-trial',
  templateUrl: './add-load-trial.component.html',
  styleUrls: ['./add-load-trial.component.css']
})
export class AddLoadTrialComponent implements OnInit {
  public selectedIndex: number = 0;
  LoadTrial: FormGroup;
  items: FormArray;
  itemsStop: FormArray;
  dynamicBrake: FormArray;
  notches: string[] = ['Notch 1', 'Notch 2'];
  testType: string[] = ['Working' , 'Not Working'];
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
  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, 
    private scheduleService: ScheduleService, private accessService: AccessService,
    private loadTrialService: LoadTrialService) { 
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 0, 7, -32);
    this.maxDate = new Date(currentYear + 0, 6, 31);
  }

  ngOnInit(): void {
    this.LoadTrial = this.formBuilder.group({
      loadNo: ['', [Validators.required]],
      loadDate: ['', [Validators.required]],
      loadFrom: ['', [Validators.required]],
      loadTo: ['', [Validators.required]],
      scheduleNo: ['', [Validators.required]],
      locoCatId: ['', [Validators.required]],
      locoNumber: ['', [Validators.required]],
      supervisorName: ['', [Validators.required]],
      supervisorNic: ['', [Validators.required]],
      supervisorEmail: ['', [Validators.required]],
      managerName: ['', [Validators.required]],
      managerNic: ['', [Validators.required]],
      managerEmail: ['', [Validators.required]],
      items: this.formBuilder.array([ this.createItem() ]),
      itemsStop: this.formBuilder.array([ this.createStopItem() ]),
      dynamicBrake: this.formBuilder.array([this.createDynItem()]),
      loadNote: ['', [Validators.required]],
      startMileage: [''],
      endMileage: ['']
    })
    this.getAllSchedules();
    this.loadSupervisor();
    this.loadMangers();
  }
  selectTab(index: number): void {
    const btn  = document.getElementById('btn-pop-up') as HTMLElement;
    btn.click(); 
    console.log(index);
  }
  get getFm(){
    return this.LoadTrial.controls;
  }
  onSubmit(){
    console.log(this.LoadTrial.value);

    // if(this.filesToUpload.)

    this.loadTrialService.saveLoadTrial(this.LoadTrial.value)
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
            //this.refresh();
            this.LoadTrial.reset();
            this.selectTab(0);
          }, 3000);

        } else {
          swal({
            title: 'Record already Exits',
            text: 'Please Click OK',
            icon: 'error',
          });
          setTimeout(() => {
           // this.refresh();
           this.selectTab(0);
           
          }, 3000);
        }
        this.selectTab(0);
      },

      error => {
        console.log(error);
      },
      () => {
        console.log('dss');
      }
    )
  }

  add(data){
console.log(data)
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      running: true,
      description: ['',  [Validators.required]],
      condition: '',
      action: ''
    });
  }
  createStopItem(): FormGroup {
    return this.formBuilder.group({
      running: true,
      description: ['',  [Validators.required]],
      condition: '',
      action: ''
    });
  }
  createDynItem(): FormGroup {
    return this.formBuilder.group({
      notch: '',
      tractionMtr: [0,  [Validators.required]],
      mainGen: 0,
      
    });
  }
  addItem(): void {
    this.items = this.LoadTrial.get('items') as FormArray;
    //if(this.LoadTrial.controls.items.value){}
    //const van = this.items.value.condition
  console.log(this.items.value)
    this.items.push(this.createItem());
  }
  addStopItem(): void {
    this.items = this.LoadTrial.get('itemsStop') as FormArray;
    //if(this.LoadTrial.controls.items.value){}
    //const van = this.items.value.condition
  //console.log(this.items.value.controls)
    this.items.push(this.createStopItem());
  }
  addDynItem(): void {
    let c = 0;
    this.items = this.LoadTrial.get('dynamicBrake') as FormArray;
    //if(this.LoadTrial.controls.items.value){}
    //const van = this.items.value.condition
    console.log(this.items.value)
  //console.log( while(c <4){
 
      this.items.push(this.createDynItem()); 
      this.buttonCount++;
      console.log(this.buttonCount)
   
    
    

  }
  removeItem(index = null, value) {
   // this.items.pop();
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
  const dialogRef = this.dialog.open(UpdateFinalMileageComponent, {
    width: '500px',
   
    
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    
  });
}
getAllSchedules(){
  this.loading = true;
  this.scheduleService.getAllSchedules().subscribe(res=>{
  this.scheduleArray = res;
  this.loading =  true
  })
}
private loadSupervisor() {
  this.loading = true;
  this.accessService.getAllUsers().subscribe(result => {
    this.supervisorList = result;
    this.loading = true;
  });
}
private loadMangers() {
  this.loading = true;
  this.accessService.getMangers().subscribe(result => {
    this.managerList = result;
    this.loading = true;
  });
}
onChangeSelect(value: string){
  const userNic = value ;
  console.log(this.getFm.supervisorNic.value);
  this.accessService.getOneSup(this.getFm.supervisorName.value).pipe(first())
    .subscribe(
      res=>{
        this.LoadTrial.controls['supervisorEmail'].setValue(res[0].userEmail);
        this.LoadTrial.controls['supervisorNic'].setValue(res[0].userNic);

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
        this.LoadTrial.controls['managerEmail'].setValue(res[0].userEmail);
        this.LoadTrial.controls['managerNic'].setValue(res[0].userNic);

        console.log(res);
      }
    )
}
onChangeSelectSch(value: string){
  console.log(this.getFm.scheduleNo.value)
  this.scheduleService.getOneSchedule(this.getFm.scheduleNo.value).pipe(first())
  .subscribe(
    res=>{
      this.LoadTrial.controls['locoCatId'].setValue(res[0].locoCatId);
      this.LoadTrial.controls['locoNumber'].setValue(res[0].locoNumber);
      console.log(res);
      this.getMileVal(res[0].locoCatId, res[0].locoNumber);

    }
  )
}
getMileVal(val1: string, val2: string){
  this.dataArray.push(val1, val2);
  console.log(this.dataArray); 
}
}
