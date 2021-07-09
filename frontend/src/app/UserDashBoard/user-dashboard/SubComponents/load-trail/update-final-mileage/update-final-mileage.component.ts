import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-final-mileage',
  templateUrl: './update-final-mileage.component.html',
  styleUrls: ['./update-final-mileage.component.css']
})
export class UpdateFinalMileageComponent implements OnInit {
  minDate: Date;
  maxDate: Date;
  updateMile: FormGroup;
  lNumber: string;
  lCatId: string;
  constructor(private formBuilder: FormBuilder,  @Inject(MAT_DIALOG_DATA) public data: any) { 
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 0, 7, -32);
    this.maxDate = new Date(currentYear + 0, 6, 31);
    console.log(data);
    this.lNumber =  data.lNumber;
    this.lCatId =  data.lCatId;
  }

  ngOnInit(): void {
    this.updateMile = this.formBuilder.group({
      locoCatId: ['', [Validators.required]],
      locoNumber: ['', [Validators.required]],
      updateDate: ['', [Validators.required]],
      endMileage: ['', [Validators.required]],
    });
    this.updateMile.controls['locoCatId'].setValue(this.lCatId);
    this.updateMile.controls['locoNumber'].setValue(this.lNumber);
  }
  onSubmit(){

  }
}
