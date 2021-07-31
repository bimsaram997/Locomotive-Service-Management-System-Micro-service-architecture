import { ScheduleService } from 'src/app/service/schedule.service';
import { LocomotiveService } from 'src/app/service/locomotive.service';


import { Router } from '@angular/router';
import { LoadTrialService } from 'src/app/service/load-trial.service';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import swal from "sweetalert";

@Component({
  selector: 'app-add-comment-load',
  templateUrl: './add-comment-load.component.html',
  styleUrls: ['./add-comment-load.component.css']
})
export class AddCommentLoadComponent implements OnInit {
  commentAdd: FormGroup;
  items: FormArray;
  buttonCount = 0;
  reason: any;
  statuses: any[] = [1,2,3];
  nameStatus: string[] = ['Viewed', 'Pending']
  options:string  [] = ['Viewed and Confirmed', 'Viewed, do actions for comments'];
  scheduleNo:any;
  isShow:boolean = false;
  constructor(private router: Router,private scheduleService:ScheduleService, private locomotiveService:LocomotiveService, private route: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data: any,private formBuilder: FormBuilder, private loadService: LoadTrialService) { }

  ngOnInit(): void {
    this.commentAdd = this.formBuilder.group({
      loadNo: ['',  [Validators.required]],
      commentId: ['', [Validators.required]],
      locoNumber: ['', [Validators.required]],
      status:[2],
      comDate: ['', [Validators.required]],
      reason:[' '],
      comments: ['',  [Validators.required]],
      checked: ['Unchecked'],
      scheduleNo: ['']
    })

    this.loadService.getOneLoad(this.data.id)
    .subscribe(res=>{
      console.log(res)
      if(res != undefined){
        this.commentAdd.controls['loadNo'].setValue(res[0].loadNo);
        this.commentAdd.controls['reason'].setValue(res[0].reason);
        this.commentAdd.controls['status'].setValue(res[0].status);
        this.commentAdd.controls['locoNumber'].setValue(res[0].locoNumber);
        this.commentAdd.controls['scheduleNo'].setValue(res[0].scheduleNo);
        this.scheduleNo =  res[0].scheduleNo;
        this.reason = res[0].reason;
        // console.log(this.scheduleNo)
      }
    })

    this.loadAll();
  }
  addComment(){

  console.log(this.scheduleNo)


      console.log(this.commentAdd.value);
      if (window.confirm('Are you sure?')) {
        let id = this.route.snapshot.paramMap.get('id');
        this.makeComment(this.commentAdd.value);
        this.updateLoadStatus(this.commentAdd.value)
        this.patchLoadLoco(this.commentAdd.value);
        this.changeScheduleSeven(this.commentAdd.value);

    }
  }
  get getFm(){
    return this.commentAdd.controls;
  }
  public loadAll(){
    this.loadService.getAllLoadTrial().subscribe(
      res=>{

      }
    )
  }

  changeScheduleSeven(obj:any){
    this.scheduleService.changeScheduleSeven(obj)
    .subscribe(res=>{
       console.log('Schedule updated successfully!');
    })
  }

  updateLoadStatus(obj: any){
    this.loadService.addComment(obj)
    .subscribe(res => {

      //this.router.navigateByUrl('/employees-list');
      console.log('Content updated successfully!');
      this.loadAll();
      this.router.navigate(['/adminDashboard/viewAdLoadTrial'])
      console.log(res);
    }, (error) => {
      console.log(error)
    })

  }
  makeComment(obj:any){
    this.loadService.makeComment(obj).pipe(first()).subscribe(
    res => {
      console.log(res);
      if (res.isSaved) {

        swal({
          title: 'Record Saved!',
          text: 'Please Click OK',
          icon: 'success',
        });
        setTimeout(() => {
         // this.refresh();
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

    error => {
      console.log(error);
    },
    () => {
      console.log('dss');
    }
  )

  }

  patchLoadLoco(object){

    this.locomotiveService.patchLoadLoco(object).pipe(first())
    .subscribe((
      res=>{
        console.log(res);
      }
    ))
  }
}
