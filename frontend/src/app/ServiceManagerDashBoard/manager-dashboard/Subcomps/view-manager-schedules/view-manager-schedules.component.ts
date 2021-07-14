import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {ScheduleService} from "../../../../service/schedule.service";
import swal from "sweetalert";
import {SendProgressComponent} from "../../../../UserDashBoard/user-dashboard/SubComponents/Schedules/view-schedules/send-progress/send-progress.component";
import {EditReqScheduleComponent} from "../request-schedule/edit-req-schedule/edit-req-schedule.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-manager-schedules',
  templateUrl: './view-manager-schedules.component.html',
  styleUrls: ['./view-manager-schedules.component.css']
})
export class ViewManagerSchedulesComponent implements OnInit {
  searchKey: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['Schedule No', 'Report No', 'Loco Category', 'Loco Number', 'Supervisor inCharge', 'Request Date', 'To be Complete', 'Progress', 'status', '#'];
  scheduleList: any[] = [];
  scheduleStatus: any;
  constructor(private scheduleService: ScheduleService, private router: Router) { }

  ngOnInit(): void {
    this.loadAllSchedule();
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
  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
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
  }

  deleteSchedule(scheduleNo: string) {
    if (confirm('Are You Sure, whether You want to delete this Locomotive ?')) {
      this.scheduleService.deleteSchedule(scheduleNo).subscribe(result => {
        if (result.message === 'deleted') {
          swal('Record was deleted', {
            icon: 'success',
          });
          this.loadAllSchedule()
        } else {
          swal('Record was deleted', {
            icon: 'error',
          });
        }
      });
    }
  }
  viewSchedule(id: string){
    console.log(id);
    this.router.navigate(['/managerDashBoard/viewSchedule', id]);
  }
  /*
  openEdit(scheduleNo: string) {
    this.reqEdit.open(EditReqScheduleComponent, {
      data: {id: scheduleNo}
    });
  }*/
}
