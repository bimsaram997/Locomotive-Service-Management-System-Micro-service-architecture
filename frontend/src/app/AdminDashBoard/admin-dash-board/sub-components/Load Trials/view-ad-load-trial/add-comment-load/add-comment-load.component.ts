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
  name: any;
  constructor(private router: Router,private scheduleService:ScheduleService, private locomotiveService:LocomotiveService, private route: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data: any,private formBuilder: FormBuilder, private loadService: LoadTrialService) { }

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
      }
    })
    this.defaultMethod();
    this.loadAll();
    const values =  JSON.parse( localStorage.getItem('currentUser'));
    this.name = values.userEmail

    this.commentAdd.controls['chiefEngEmail'].setValue(this.name);
  }
  addComment(){

  console.log(this.scheduleNo)


      console.log(this.commentAdd.value);
      if (window.confirm('Are you sure?')) {
        let id = this.route.snapshot.paramMap.get('id');

        this.makeComment(this.commentAdd.value);


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
        this.updateLoadStatus(obj)
        this.patchLoadLoco(obj);
        this.changeScheduleSeven(obj);
         this.commentEmail(obj)
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
        //var sysId = "ST_"+"";
        for (var i = 0; i < string_length; i++) {
          var rnum = Math.floor(Math.random() * chars.length);
          commentId += chars.substring(rnum, rnum + 1);
          ///sysId += chars.substring(rnum, rnum + 1);
          this.commentAdd.controls["commentId"].setValue(commentId);
          //this.LocoGroup.controls["id"].setValue(sysId);
        }
  //this.staffGroup.controls['jDate'].setValue(moment().format('YYYY-MM-DD'));

  }

}
