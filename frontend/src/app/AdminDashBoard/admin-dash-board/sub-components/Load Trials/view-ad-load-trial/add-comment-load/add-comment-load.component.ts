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
  nextSchedule: FormGroup;
  items: FormArray;
  buttonCount = 0;
  reason: any;
  statuses: any[] = [1,2,3];
  nameStatus: string[] = ['Viewed', 'Pending']
  options:string  [] = ['Viewed and Confirmed', 'Viewed, do actions for comments'];
  scheduleNo:any;
  isShow:boolean = false;
  name: any;
  send_date: Date;
  formattedDate: string;
  commentStatus = 0;
  commentReason = '';
  constructor(private router: Router,private scheduleService:ScheduleService, private locomotiveService:LocomotiveService, private route: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data: any,
  private formBuilder: FormBuilder, private loadService: LoadTrialService) {


  }

  ngOnInit(): void {
    this.commentAdd = this.formBuilder.group({
      loadNo: ['',  [Validators.required]],
      commentId: [''],
      locoNumber: [''],
      locoCatId:[''],
      status:[2],
      comDate: ['', [Validators.required]],
      reason:[' '],
      comments: ['',  [Validators.required]],
      checked: ['Unchecked'],
      scheduleNo: [''],
      supervisorEmail: [''],
      chiefEngEmail: [''],
      loadSid: ['']
    })

    this.loadService.getOneLoad(this.data.id)
    .subscribe(res=>{
      console.log(res)
      if(res != undefined){
        this.commentAdd.controls['loadNo'].setValue(res[0].loadNo);
        this.commentAdd.controls['reason'].setValue(res[0].reason);
        this.commentAdd.controls['status'].setValue(res[0].status);
        this.commentAdd.controls['locoNumber'].setValue(res[0].locoNumber);
        this.commentAdd.controls['locoCatId'].setValue(res[0].locoCatId);
        this.commentAdd.controls['scheduleNo'].setValue(res[0].scheduleNo);
        this.commentAdd.controls['supervisorEmail'].setValue(res[0].supervisorEmail);
        this.commentAdd.controls['loadSid'].setValue(res[0]._id);

        this.scheduleNo =  res[0].scheduleNo;
        this.reason = res[0].reason;
        // console.log(this.scheduleNo)


        this.nextSchedule.controls['locoCatId'].setValue(res[0].locoCatId);
        this.nextSchedule.controls['locoNumber'].setValue(res[0].locoNumber);
      }
    })

    this.nextSchedule = this.formBuilder.group({
      nxtSchId:[''],
      locoNumber: [''],
      locoCatId:[''],
      date:[''],
      nxtSchStatus: [0],
      nxtSchReason: ['Draft']
    })

    this.defaultMethod();
    this.loadAll();
    this.setValuesForNextSchedule();
    const values =  JSON.parse( localStorage.getItem('currentUser'));
    this.name = values.userEmail

    this.commentAdd.controls['chiefEngEmail'].setValue(this.name);
  }

  setValuesForNextSchedule(){

      this.send_date=new Date();
      this.send_date.setMonth(this.send_date.getMonth()+1);
      this.formattedDate=this.send_date.toISOString().slice(0,10);
      this.nextSchedule.controls['date'].setValue(this.formattedDate);
  }
  checkNextScheduleDate(){
      //console.log(this.commentAdd.value);

      this.commentStatus = this.commentAdd.controls['status'].value;
      this.commentReason = this.commentAdd.controls['reason'].value;

      if(!(this.commentStatus === 2) && !(this.commentReason === 'Viewed and Confirmed')){

      }else{
 console.log(this.nextSchedule.value);
      }
    //   if (window.confirm('Are you sure?')) {
    //     let id = this.route.snapshot.paramMap.get('id');

    //     this.makeComment(this.commentAdd.value);


    // }
  }
  get getFm(){
    return this.commentAdd.controls;
  }
  public loadAll(){
    const values =  JSON.parse( localStorage.getItem('currentUser'));
      const object  = {
      userNic:values.userNic,
      userRole:values.userRole

    }

    this.loadService.getLoadTrialAssigned(object).subscribe(
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
  makeComment(){

    console.log(this.commentAdd.value);
    this.checkNextScheduleDate();

  //   this.loadService.makeComment(this.commentAdd.value).pipe(first()).subscribe(
  //   res => {
  //     console.log(res);
  //     if (res.isSaved) {

  //       swal({
  //         title: 'Record Saved!',
  //         text: 'Please Click OK',
  //         icon: 'success',
  //       });
  //       this.updateLoadStatus(this.commentAdd.value)
  //       this.patchLoadLoco(this.commentAdd.value);
  //       this.changeScheduleSeven(this.commentAdd.value);
  //        this.commentEmail(this.commentAdd.value)
  //       setTimeout(() => {
  //        // this.refresh();
  //       }, 3000);

  //     } else {
  //       swal({
  //         title: 'Record already Exits',
  //         text: 'Please Click OK',
  //         icon: 'error',
  //       });
  //       setTimeout(() => {
  //         //this.refresh();
  //       }, 3000);
  //     }
  //   },

  //   error => {
  //     console.log(error);
  //   },
  //   () => {
  //     console.log('dss');
  //   }
  // )

  }

  patchLoadLoco(object){

    this.locomotiveService.patchLoadLoco(object).pipe(first())
    .subscribe((
      res=>{
        console.log(res);
      }
    ))
  }

  commentEmail(obj){
    this.loadService.commentEmail(obj).pipe(first())
    .subscribe(res=>{

    }, (error) => {
      console.log(error)
    })
  }

  defaultMethod(){
  //Id Gen
        var chars = "ABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890";

        var string_length = 8;
        var  commentId = "CO_" + "";
        var nxtSchId = "NSCH_" + "";
        //var sysId = "ST_"+"";
        for (var i = 0; i < string_length; i++) {
          var rnum = Math.floor(Math.random() * chars.length);
          commentId += chars.substring(rnum, rnum + 1);
          nxtSchId += chars.substring(rnum, rnum + 1);
          ///sysId += chars.substring(rnum, rnum + 1);
          this.commentAdd.controls["commentId"].setValue(commentId);
          this.nextSchedule.controls['nxtSchId'].setValue(nxtSchId);
          //this.LocoGroup.controls["id"].setValue(sysId);
        }
  //this.staffGroup.controls['jDate'].setValue(moment().format('YYYY-MM-DD'));

  }

}
