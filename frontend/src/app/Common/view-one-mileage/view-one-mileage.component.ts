import { first } from 'rxjs/operators';
import { LocomotiveService } from 'src/app/service/locomotive.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-one-mileage',
  templateUrl: './view-one-mileage.component.html',
  styleUrls: ['./view-one-mileage.component.css']
})
export class ViewOneMileageComponent implements OnInit {
  MileageGroup: FormGroup;
  id: any;
  nxtScheduleId:any;
  isNextSchedule: boolean;
  constructor(private formBuilder: FormBuilder,  private route: ActivatedRoute,
              private locomotiveService: LocomotiveService,) { }

  ngOnInit(): void {
this.MileageGroup = this.formBuilder.group({
      mReportNumber:  [''],
      mLocoCatId: [''],
      mLocoNumber: [''],
      mLocoMileage: [''],
      finalMileage: [''],
      nxtScheduleId: [''],
      mileageDate: [''],
      locoStatus: [''],
      managerNic: [''],
      emergencyCheck: [''],
      managerName: [''],
      mileageNote: [''],
      status: [1],
      reason: ['Draft'],
      clerkEmail: [''],
      managerEmail:['']
  });
  this.id = (this.route.snapshot.paramMap.get('id'));
  this.locomotiveService.getOneMileageById(this.id).pipe(first())
  .subscribe(
    res=>{
      if(res != undefined && res !=null){
        console.log(res)
          this.MileageGroup.controls['mReportNumber'].setValue(res[0].mReportNumber);
          this.MileageGroup.controls['mLocoCatId'].setValue(res[0].mLocoCatId);
          this.MileageGroup.controls['mLocoNumber'].setValue(res[0].mLocoNumber);
          this.MileageGroup.controls['emergencyCheck'].setValue(res[0].emergencyCheck);
          this.MileageGroup.controls['mileageDate'].setValue(res[0].mileageDate);
          this.MileageGroup.controls['nxtScheduleId'].setValue(res[0].nxtScheduleId);
          this.MileageGroup.controls['managerNic'].setValue(res[0].managerNic);
          this.MileageGroup.controls['managerEmail'].setValue(res[0].managerEmail);
          this.MileageGroup.controls['managerName'].setValue(res[0].managerName);
          this.MileageGroup.controls['managerEmail'].setValue(res[0].managerEmail);
           this.MileageGroup.controls['reason'].setValue(res[0].reason);
            this.MileageGroup.controls['mileageNote'].setValue(res[0].mileageNote);
             this.MileageGroup.controls['clerkEmail'].setValue(res[0].clerkEmail);
          this.nxtScheduleId =  res[0].nxtScheduleId;
          if(this.nxtScheduleId === ""){
            this.isNextSchedule = false;
          }
      }
    }
  )
}


}
