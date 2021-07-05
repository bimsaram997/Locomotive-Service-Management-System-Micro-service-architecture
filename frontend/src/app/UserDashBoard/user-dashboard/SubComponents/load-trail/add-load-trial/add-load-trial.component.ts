import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UpdateFinalMileageComponent } from '../update-final-mileage/update-final-mileage.component';

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
  data = "dfdf";
  constructor(private formBuilder: FormBuilder, public dialog: MatDialog) { 
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 0, 7, -32);
    this.maxDate = new Date(currentYear + 0, 6, 31);
  }

  ngOnInit(): void {
    this.LoadTrial = this.formBuilder.group({
      items: this.formBuilder.array([ this.createItem() ]),
      itemsStop: this.formBuilder.array([ this.createStopItem() ]),
      dynamicBrake: this.formBuilder.array([this.createDynItem()])
    })
  }
  onSubmit(){

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
  //console.log(this.items.value.controls)
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

}
