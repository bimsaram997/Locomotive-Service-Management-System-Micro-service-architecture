import { ViewProgressComponent } from 'src/app/UserDashBoard/user-dashboard/SubComponents/Schedules/view-schedules/view-progress/view-progress.component';
import { ScheduleService } from 'src/app/service/schedule.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProgressReportService } from 'src/app/service/progress-report.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-clerk-view-schedules',
  templateUrl: './clerk-view-schedules.component.html',
  styleUrls: ['./clerk-view-schedules.component.css']
})
export class ClerkViewSchedulesComponent implements OnInit {

  searchKey: string;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['Schedule No', 'Report No', 'Loco Category', 'Loco Number', 'Supervisor inCharge', 'Request Date', 'To be Complete', 'Progress', 'status', '#'];
  scheduleList: any[] = [];
  scheduleStatus: any;
  progressList: any[] = [];
  dataArray: any[] = [];
  dataArrayLength:any;
  isShowPrTable: boolean = true;
  paginator: MatPaginator;
  constructor(private scheduleService: ScheduleService, private _location: Location,
     private router: Router,public dialog: MatDialog, public ProgressReportService: ProgressReportService) {
    this.loadAllSchedule();
  }

  ngOnInit(): void {

  }
  private loadAllSchedule(){
    this.scheduleService.getAllSchedules().subscribe(resp =>{
      this.scheduleList = resp;
      this.dataSource =  new MatTableDataSource<any>(this.scheduleList);
      setTimeout(() => {
        this.dataSource.paginator =  this.paginator;
        this.dataSource.sort = this.sort;
      })
    })
  }

 backClicked() {
    this._location.back();
  }

  onSearchClear() {
    this.searchKey = '';
   // this.applyFilter();
  }


  applyFilter(filterValue: string) {
    if (filterValue.length > 1) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
    }
}

  statusBinder(scheduleStatus){
    if (scheduleStatus === 0){
      return 'not_started';
    }else if (scheduleStatus === 1){
      return 'Flags';
    }else if (scheduleStatus === 2){
      return 'pending_actions';
    }else if (scheduleStatus === 3){
      return 'hourglass_top';
    } else if (scheduleStatus === 4){
      return 'construction';
    } else if (scheduleStatus === 5){
      return 'build_circle';
    }
    else if (scheduleStatus === 6){
      return 'check_circle_outline';
    }
    else if (scheduleStatus === 7){
      return 'sports_score';
    }
  }
  viewSchedule(id: string){
    console.log(id);
    this.router.navigate(['/clerkDashBoard/viewSchedule', id]);
  }

 viewProgressHist(id: string){

    this.dialog.open(ViewProgressComponent, {
      data: {id: id},
      width: '1200px'
    });
    console.log('ho')

     this.scheduleService.sendOneSchedule(id).subscribe(resp =>{
     //console.log(resp);
        if(resp != undefined){
          this.dataArray = resp[0].schProgressReport
          this.dataArrayLength =  this.dataArray.length;


        }
      })
  }

}