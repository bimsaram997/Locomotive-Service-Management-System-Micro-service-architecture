import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ScheduleService } from 'src/app/service/schedule.service';
import { ViewProgressComponent } from 'src/app/UserDashBoard/user-dashboard/SubComponents/Schedules/view-schedules/view-progress/view-progress.component';

@Component({
  selector: 'app-view-assiged-schedules',
  templateUrl: './view-assiged-schedules.component.html',
  styleUrls: ['./view-assiged-schedules.component.css'],
})
export class ViewAssigedSchedulesComponent implements OnInit {
  @Input() userNic: string;
  @Input() userRole: number;
  searchKey: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'Schedule No',
    'Report No',
    'Loco Category',
    'Loco Number',
    'Supervisor inCharge',
    'Request Date',
    'To be Complete',
    'Progress',
    'status',
    '#',
  ];
  scheduleList: any[] = [];
  scheduleStatus: any;
  progressList: any[] = [];
  dataArray: any[] = [];
  dataArrayLength: any;
  isShowPrTable: boolean = true;

  constructor(
    private scheduleService: ScheduleService,
    private router: Router,

    private toastr: ToastrService,
    public dialog: MatDialog
  ) {
    //this.loadCount();
  }

  ngOnInit(): void {
    this.loadAllSchedule();
  }
  private loadAllSchedule() {
    const object = {
      userNic: this.userNic,
      userRole: this.userRole,
    };

    this.scheduleService.getAllScheduleAssigned(object).subscribe((resp) => {
      this.scheduleList = resp;
      this.dataSource = new MatTableDataSource<any>(this.scheduleList);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }

  statusBinder(scheduleStatus) {
    if (scheduleStatus === 0) {
      return 'not_started';
    } else if (scheduleStatus === 1) {
      return 'Flags';
    } else if (scheduleStatus === 2) {
      return 'pending_actions';
    } else if (scheduleStatus === 3) {
      return 'hourglass_top';
    } else if (scheduleStatus === 4) {
      return 'construction';
    } else if (scheduleStatus === 5) {
      return 'build_circle';
    } else if (scheduleStatus === 6) {
      return 'check_circle_outline';
    } else if (scheduleStatus === 7) {
      return 'sports_score';
    }
  }

  viewSchedule(id: string) {
    console.log(id);
    this.router.navigate(['/adminDashboard/viewSchedule', id]);
  }

  viewProgressHist(id: string) {
    this.dialog.open(ViewProgressComponent, {
      data: { id: id },
      width: '1200px',
    });
    console.log('ho');

    this.scheduleService.sendOneSchedule(id).subscribe((resp) => {
      //console.log(resp);
      if (resp != undefined) {
        this.dataArray = resp[0].schProgressReport;
        this.dataArrayLength = this.dataArray.length;
      }
    });
  }
}
