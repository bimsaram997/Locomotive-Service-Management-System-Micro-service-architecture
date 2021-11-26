import { ToastrService } from 'ngx-toastr';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ScheduleService } from '../../../../service/schedule.service';
import swal from 'sweetalert';
import { SendProgressComponent } from '../../../../UserDashBoard/user-dashboard/SubComponents/Schedules/view-schedules/send-progress/send-progress.component';
import { EditReqScheduleComponent } from '../request-schedule/edit-req-schedule/edit-req-schedule.component';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { ViewProgressComponent } from 'src/app/UserDashBoard/user-dashboard/SubComponents/Schedules/view-schedules/view-progress/view-progress.component';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view-manager-schedules',
  templateUrl: './view-manager-schedules.component.html',
  styleUrls: ['./view-manager-schedules.component.css'],
})
export class ViewManagerSchedulesComponent implements OnInit {
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
  statuses: any[] = ['All', 100, 90, 75, 60, 45, 30, 0];
  scheduleList: any[] = [];
  scheduleStatus: any;

  pageYoffset = 0;
  tableArray: any[];

  @HostListener('window:scroll', ['$event']) onScroll(event) {
    this.pageYoffset = window.pageYOffset;
  }
  constructor(
    private scroll: ViewportScroller,
    private scheduleService: ScheduleService,
    private router: Router,
    public dialog: MatDialog,
    private _location: Location,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadAllSchedule();
  }
  scrollToTop() {
    this.scroll.scrollToPosition([0, 0]);
  }
  backClicked() {
    this._location.back();
  }
  private loadAllSchedule() {
    const values = JSON.parse(localStorage.getItem('currentUser'));
    const object = {
      userNic: values.userNic,
      userRole: values.userRole,
    };
    console.log(object);
    this.scheduleService
      .getAllScheduleAssignedManager(object)
      .subscribe((resp) => {
        this.scheduleList = resp;
        this.dataSource = new MatTableDataSource<any>(this.scheduleList);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      });
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
    } else if (scheduleStatus === 8) {
      return 'assignment';
    }
  }

  onChangeSelect(value) {
    let _cloneArrat = [];
    const _findValue = this.scheduleList.filter(
      (x) => x.scheduleProgress == value.value
    );
    if (_findValue.length > 0) {
      this.tableArray = _findValue;
      this.dataSource = new MatTableDataSource<any>(this.tableArray);
    } else if (value.value == 'All') {
      this.dataSource = new MatTableDataSource<any>(this.scheduleList);
    } else {
      this.onWarning('No records found on filter!');
      this.dataSource = new MatTableDataSource<any>(this.scheduleList);
    }
  }

  deleteSchedule(scheduleNo: string) {
    if (confirm('Are You Sure, whether You want to delete this Locomotive ?')) {
      this.scheduleService.deleteSchedule(scheduleNo).subscribe((result) => {
        if (result.message === 'deleted') {
          swal('Record was deleted', {
            icon: 'success',
          });
          this.loadAllSchedule();
        } else {
          swal('Record was deleted', {
            icon: 'error',
          });
        }
      });
    }
  }
  viewSchedule(id: string) {
    console.log(id);
    this.router.navigate(['/managerDashBoard/viewManSchedule', id]);
  }
  /*
  openEdit(scheduleNo: string) {
    this.reqEdit.open(EditReqScheduleComponent, {
      data: {id: scheduleNo}
    });
  }*/

  viewProgressHist(id: string) {
    this.dialog.open(ViewProgressComponent, {
      data: { id: id },
      width: '1200px',
    });
    console.log('ho');
  }

  onWarning(message: string) {
    this.toastr.warning(message, 'Warning');
  }
}
