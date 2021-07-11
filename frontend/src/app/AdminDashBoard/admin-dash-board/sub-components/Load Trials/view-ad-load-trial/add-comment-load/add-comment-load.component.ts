import { Router } from '@angular/router';
import { LoadTrialService } from 'src/app/service/load-trial.service';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-comment-load',
  templateUrl: './add-comment-load.component.html',
  styleUrls: ['./add-comment-load.component.css']
})
export class AddCommentLoadComponent implements OnInit {
  commentAdd: FormGroup;
  items: FormArray;
  buttonCount = 0;
  options:string  [] = ['Viewed and Confirmed', 'Viewed, do actions for comments'];
  constructor(private router: Router, private route: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data: any,private formBuilder: FormBuilder, private loadService: LoadTrialService) { }

  ngOnInit(): void {
    this.commentAdd = this.formBuilder.group({
      loadNo: ['',  [Validators.required]],
      status:[2],
      reason:[' '],
      comments: ['',  [Validators.required]],
    })

    this.loadService.getOneLoad(this.data.id)
    .subscribe(res=>{
      if(res != undefined){
        this.commentAdd.controls['loadNo'].setValue(res[0].loadNo);
      }
    })
    this.loadAll();
  }
    addComment(){
      console.log(this.commentAdd.value);
      if (window.confirm('Are you sure?')) {
        let id = this.route.snapshot.paramMap.get('id');
        this.loadService.addComment(this.commentAdd.value)
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

}
