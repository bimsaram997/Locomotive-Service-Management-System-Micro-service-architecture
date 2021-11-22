import { UserTaskService } from './../../../../../../service/user-task.service';
import { first } from 'rxjs/operators';

import { LoadTrialService } from 'src/app/service/load-trial.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import swal from 'sweetalert';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-feed-backs',
  templateUrl: './add-feed-backs.component.html',
  styleUrls: ['./add-feed-backs.component.css'],
})
export class AddFeedBacksComponent implements OnInit {
  feedBackGroup: FormGroup;
  id: any;
  spinner = false;
  loadNo: any;
  taskId: string;
  feedbackId: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<AddFeedBacksComponent>,
    private formBuilder: FormBuilder,
    private loadTrialService: LoadTrialService,
    private userTaskService: UserTaskService
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.feedBackGroup = this.formBuilder.group({
      loadNo: ['', [Validators.required]],
      feedId: [''],
      locoNumber: ['', [Validators.required]],
      locoCatId: [''],
      comments: ['', [Validators.required]],
      action: ['', [Validators.required]],
      status: [1],
      reason: ['Resolved Issues on'],
      commentId: ['', [Validators.required]],
      supervisorEmail: [''],
      chiefEngEmail: [''],
    });
    this.loadTrialService
      .getOneComment(this.data.id)
      .pipe(first())
      .subscribe((resp) => {
        if (resp !== undefined) {
          console.log(resp);
          this.feedBackGroup.controls['loadNo'].setValue(resp[0].loadNo);
          this.loadNo = resp[0].loadNo;
          this.feedBackGroup.controls['locoNumber'].setValue(
            resp[0].locoNumber
          );
          this.feedBackGroup.controls['comments'].setValue(resp[0].comments);
          this.feedBackGroup.controls['commentId'].setValue(resp[0].commentId);
          this.feedBackGroup.controls['supervisorEmail'].setValue(
            resp[0].supervisorEmail
          );
          this.feedBackGroup.controls['chiefEngEmail'].setValue(
            resp[0].chiefEngEmail
          );
          this.feedBackGroup.controls['locoCatId'].setValue(resp[0].locoCatId);
          this.id = resp[0].commentId.value;
          console.log(this.id);
        }
      });
    //console.log(this.loadNo)
    this.defaultMethod();
    this.defaultTaskId();
  }

  onSubmit() {
    console.log(this.feedBackGroup.value);
    this.spinner = true;
    {
      this.loadTrialService
        .addFeedBack(this.feedBackGroup.value)
        .pipe(first())
        .subscribe(
          (res) => {
            console.log(res);
            if (res.isSaved) {
              this.feedbackId = this.feedBackGroup.controls['loadNo'].value;
              this.changeStatusComment(this.feedBackGroup.value);
              this.loadComments();
              this.feedbackEmail(this.feedBackGroup.value);
              this.addTask();
              swal({
                title: 'Feedback Saved!',
                icon: 'success',
              });
              setTimeout(() => {
                // this.refresh();
                this.spinner = false;
              }, 3000);
            } else {
              swal({
                title: 'Feddback already Exits',
                icon: 'error',
              });
              setTimeout(() => {
                //this.refresh();
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
  }

  changeStatusComment(obj) {
    this.loadTrialService
      .changeStatusComment(obj)
      .pipe(first())
      .subscribe((res) => {
        console.log(res);
      });
  }

  loadComments() {
    //this.id = (this.route.snapshot.paramMap.get('id'));
    this.loadTrialService.getRelevantComments(this.loadNo).subscribe((res) => {
      console.log(res);
    });
  }

  feedbackEmail(obj) {
    if (obj != null) {
      this.loadTrialService
        .feedbackEmail(obj)
        .pipe(first())
        .subscribe(
          (res) => {},
          (error) => {
            console.log(error);
          }
        );
    }
  }

  defaultMethod() {
    //Id Gen
    var chars = 'ABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890';

    var string_length = 8;
    var feedId = 'FE_' + '';
    //var sysId = "ST_"+"";
    for (var i = 0; i < string_length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      feedId += chars.substring(rnum, rnum + 1);
      ///sysId += chars.substring(rnum, rnum + 1);
      this.feedBackGroup.controls['feedId'].setValue(feedId);
      //this.LocoGroup.controls["id"].setValue(sysId);
    }
    //this.staffGroup.controls['jDate'].setValue(moment().format('YYYY-MM-DD'));
  }

  addTask(): void {
    const values = JSON.parse(localStorage.getItem('currentUser'));
    const object = {
      userNic: values.userNic,
      userRole: values.userRole,
      taskId: this.taskId,
      recordId: this.feedbackId,
      taskType: 'Add Feedback',
      taskPriority: 'Low',
      taskDate: new Date(),
      taskStatus: 3,
    };

    if (object != null) {
      this.userTaskService
        .saveTask(object)
        .pipe(first())
        .subscribe(
          (res) => {
            console.log(res);
            if (res.isSaved) {
            } else {
            }
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  defaultTaskId() {
    //Id Gen
    var chars = 'ABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890';

    var string_length = 8;
    var taskId = 'T_' + '';
    //var sysId = "ST_"+"";
    for (var i = 0; i < string_length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      taskId += chars.substring(rnum, rnum + 1);
      ///sysId += chars.substring(rnum, rnum + 1);
      this.taskId = taskId;
      //this.LocoGroup.controls["id"].setValue(sysId);
    }
    //this.staffGroup.controls['jDate'].setValue(moment().format('YYYY-MM-DD'));
  }
}
