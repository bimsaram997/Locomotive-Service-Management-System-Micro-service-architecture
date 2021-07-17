
import { first } from 'rxjs/operators';

import { LoadTrialService } from 'src/app/service/load-trial.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-feed-backs',
  templateUrl: './add-feed-backs.component.html',
  styleUrls: ['./add-feed-backs.component.css']
})
export class AddFeedBacksComponent implements OnInit {
  feedBackGroup: FormGroup;
  items: FormArray;
  buttonCount = 0;
  loadNoo: string;
  comments: any[] = [];
  checkArray: any[] = ['Unchecked', 'Checked']

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private route: ActivatedRoute,
  private formBuilder: FormBuilder, private loadTrialService: LoadTrialService) { }

  ngOnInit(): void {
    this.feedBackGroup = this.formBuilder.group({
      loadNo: ['', [Validators.required]],
      locoNumber: ['', [Validators.required]],
      locoCatId: ['', [Validators.required]],
      items: this.formBuilder.array([ this.createItem() ]),
      checked: [],
    })
    this.loadTrialService.getOneLoad(this.data.id).pipe(first())
    .subscribe(
      res =>{
        if(res!== undefined){
         
          
          this.loadNoo = res[0].loadNo;
          console.log(this.loadNoo)
          this.loadOneComments(res[0].loadNo);
          this.feedBackGroup.controls['loadNo'].setValue(res[0].loadNo);
          this.feedBackGroup.controls['locoNumber'].setValue(res[0].locoNumber);
          this.feedBackGroup.controls['locoCatId'].setValue(res[0].locoCatId);
        }
      }
    )
//console.log(this.loadNo)
    
  }

  loadOneComments(loadNo){
    this.loadTrialService.getOneComment(loadNo).pipe(first())
    .subscribe(
      resp=>{
        if(resp!== undefined){
          
         
          this.comments = resp;
          console.log(this.comments);
          const _item = this.getFm.items as FormArray
          resp[0].items.forEach(( comments, index)=>{
            _item.push(
              this.formBuilder.group(({
                comments:[comments.comments, Validators.required],
                checked:[comments.checked, Validators.required]

              }))
            )
          })
        }
      }
    )
  }

  get getFm(){
    return this.feedBackGroup.controls;
  }
  get cmtArray(){
    return this.getFm.items as FormArray;
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      comments: ['',  Validators.required],
      checked: [],
      action: ''
    });
  }

  // onItem() {
  //   if (this.getFm.cmtType.value !== ''){
  //     this.cmtArray.push(this.formBuilder.group({
  //       comments: [this.getFm.cmtType.value],
  //       checked: [false],
  //       action: [this.getFm.actType.value],


  //     }));
  //   }

  // }


  // addItem(): void {
  //   this.items = this.feedBackGroup.get('items') as FormArray;
  //   //if(this.LoadTrial.controls.items.value){}
  //   //const van = this.items.value.condition
  // console.log(this.items.value)
  //   this.items.push(this.createItem());
  // }

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
  onSubmit(){}
}
