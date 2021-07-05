import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import UserDTO from "../../../../dto/UserDTO";
import {AccessService} from "../../../../service/access.service";
import {first} from "rxjs/operators";
import swal from "sweetalert";
import {LocomotiveService} from "../../../../service/locomotive.service";

@Component({
  selector: 'app-mileage-report',
  templateUrl: './mileage-report.component.html',
  styleUrls: ['./mileage-report.component.css']
})
export class MileageReportComponent implements OnInit {
  managerList: UserDTO[] = [];
  locoStatus: string[] = ['In', 'Out'];
  myControl = new FormControl();
  loading =  false;
  locoList:any[]= [];
  MileageGroup: FormGroup;
  options: string[] = ['M2', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12'];
  constructor(private accessService: AccessService, private formBuilder: FormBuilder,
              private locomotiveService: LocomotiveService) { }

  ngOnInit(): void {
    this.MileageGroup = this.formBuilder.group({
      mReportNumber:  ['', [Validators.required]],
      mLocoCatId: ['',  [Validators.required]],
      mLocoNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      mLocoMileage: ['', [Validators.required, Validators.minLength(5)]],
      mileageDate: ['', [Validators.required]],
      locoStatus: ['', Validators.required],
      managerNic: ['', [Validators.required]],
      managerEmail: ['', [Validators.required]],
      mileageNote: ['', [Validators.required, Validators.maxLength(1000)]],
      status: [1],
      reason: ['']

    });
    this.loadMangerEmail();
    this.loadLocoNum();
  }

  get getFM() {
    return this.MileageGroup.controls;
  }

  onSubmit(){
    console.log(this.MileageGroup.value);
    this.locomotiveService.saveMileage(this.MileageGroup.value)
      .pipe(first()).subscribe(
      res => {
        console.log(res)
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
           // this.refresh();
          }, 3000);
        }
      },

      error => {
        console.log(error)
      },
      () => {
        console.log('dss')
      }
    )



  }
  refresh(): void {
    window.location.reload();
  }

  private loadMangerEmail() {
    this.loading = true;
    this.accessService.getMangers().subscribe(result => {
      this.managerList = result;
      this.loading = true;
    });
  }
  onChangeSelect(value: string){
    const userNic = value ;
    console.log(this.getFM.mLocoNumber.value);
    this.locomotiveService.getOneLocoNew(this.getFM.mLocoNumber.value).pipe(first())
      .subscribe(
        res=>{
         this.MileageGroup.controls['mLocoCatId'].setValue(res[0].locoCatId);
         this.MileageGroup.controls['mLocoMileage'].setValue(res[0].locoMileage);
          this.MileageGroup.controls['locoStatus'].setValue(res[0].locoAvailability);

          console.log(res);
        }
      )
  }
  onChangeSelectMan(value: string){
    const userNic = value ;
    console.log(this.getFM.managerNic.value);
    this.accessService.getOneMan(this.getFM.managerNic.value).pipe(first())
      .subscribe(
        res=>{
          this.MileageGroup.controls['managerEmail'].setValue(res[0].userEmail);


          console.log(res);
        }
      )
  }
  loadLocoNum(){
    this.loading = true;
    this.locomotiveService.getAllLocomotives().subscribe(result => {
      this.locoList = result;
      this.loading = true;
    });
  }
}
