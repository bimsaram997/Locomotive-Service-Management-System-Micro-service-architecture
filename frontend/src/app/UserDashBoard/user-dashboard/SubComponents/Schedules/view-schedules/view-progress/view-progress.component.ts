import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ScheduleService } from 'src/app/service/schedule.service';

@Component({
  selector: 'app-view-progress',
  templateUrl: './view-progress.component.html',
  styleUrls: ['./view-progress.component.css']
})
export class ViewProgressComponent implements OnInit {
   searchKey: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['Progress No', 'Schedule No', 'Date', 'Progress Value', 'CheckedItems', 'Note'];
  dataArray: any[] = [];
  dataArrayLength: number;
  isShowPrTable: boolean=true;
  isShowLabel: boolean = false;
  scheduleNo: string;

  constructor(private formBuilder: FormBuilder ,
              @Inject(MAT_DIALOG_DATA) public data: any, private scheduleService: ScheduleService, private router: Router) { }

  ngOnInit(): void {
      this.scheduleService.sendOneSchedule(this.data.id).subscribe(resp =>{
     //console.log(resp);
        if(resp != undefined){
          this.scheduleNo = resp[0].scheduleNo
          this.dataArray = resp[0].schProgressReport;
          this.dataArrayLength =  this.dataArray.length;
          this.dataSource =  new MatTableDataSource<any>(this.dataArray);
          if(this.dataArrayLength<1){
            this.isShowPrTable = false;
            this.isShowLabel = true;
          }else{
                this.isShowPrTable = true;
          }
          setTimeout(() => {
          this.dataSource.paginator =  this.paginator;
          this.dataSource.sort = this.sort;
          console.log(this.dataArray)
      })
        }


      })
  }


  onSearchClear() {
    this.searchKey = '';

  }
  applyFilter(filterValue: string) {
    if (filterValue.length > 1) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
    }
}
}
