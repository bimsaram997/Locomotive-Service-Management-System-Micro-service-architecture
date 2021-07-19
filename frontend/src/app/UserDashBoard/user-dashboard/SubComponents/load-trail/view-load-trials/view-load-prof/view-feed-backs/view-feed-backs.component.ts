import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoadTrialService } from 'src/app/service/load-trial.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-feed-backs',
  templateUrl: './view-feed-backs.component.html',
  styleUrls: ['./view-feed-backs.component.css']
})
export class ViewFeedBacksComponent implements OnInit {
comment: any;
action: any;
errorMsg: string;
lengthCount: boolean;
countArray: any[]=[];
viewFeedback: FormGroup;

constructor(@Inject(MAT_DIALOG_DATA) public data: any, private route: ActivatedRoute,
 private loadTrialService: LoadTrialService,private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.viewFeedback = this.formBuilder.group({
      comments: [''],
      action: [''],
    })

    this.loadTrialService.getOneFeedBack(this.data.commentId).pipe(first())
    .subscribe(
      resp=>{
        if(resp!==undefined){
          this.lengthCount =  false;
          this.countArray = resp;
          console.log(this.countArray);
          if(this.countArray.length>0){
            this.viewFeedback.controls['comments']?.setValue(resp[0].comments);
            this.viewFeedback.controls['action']?.setValue(resp[0].action);
            this.comment = resp[0].comments;
            this.action = resp[0].action;
            console.log(this.action)
          }else{
            this.lengthCount = true;
          }
        }
      }
    )
  }

}
