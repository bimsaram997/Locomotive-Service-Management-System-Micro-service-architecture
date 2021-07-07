import { ProgressReportService } from 'src/app/service/progress-report.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface  DialogData{

  id:string

}
@Component({
  selector: 'app-view-more-progress',
  templateUrl: './view-more-progress.component.html',
  styleUrls: ['./view-more-progress.component.css']
})
export class ViewMoreProgressComponent implements OnInit {
  ReportGroup: FormGroup;
  dataSource1: any[] = [];
  constructor(private formBuilder: FormBuilder ,
    @Inject(MAT_DIALOG_DATA) public data: any, private progressReport: ProgressReportService) { }

  ngOnInit(): void {
    this.ReportGroup = this.formBuilder.group({
      
     
     
 
      supervisorEmail: [''],
      supervisorName: [''],
      managerName: [''],
      managerEmail: [''],
      progressValue: [],
      extraNote: ['']

    });

    this.progressReport.sendOneProgress(this.data.id).subscribe(resp =>{
      console.log(resp);
      if(resp != undefined){
    
      
        this.ReportGroup.controls['supervisorEmail'].setValue(resp[0].supervisorEmail);
        this.ReportGroup.controls['supervisorName'].setValue(resp[0].supervisorName);
        this.ReportGroup.controls['managerName'].setValue(resp[0].managerName);
        this.ReportGroup.controls['managerEmail'].setValue(resp[0].managerEmail);
        this.ReportGroup.controls['progressValue'].setValue(resp[0].progressValue);
        this.ReportGroup.controls['extraNote'].setValue(resp[0].extraNote);
        this.dataSource1= resp[0].checkArray;
      console.log(this.dataSource1)
      }
    })
  }

}
