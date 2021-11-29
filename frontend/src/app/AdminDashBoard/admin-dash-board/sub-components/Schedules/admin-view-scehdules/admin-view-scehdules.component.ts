import { ProgressReportService } from 'src/app/service/progress-report.service';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import LocoScheduleDTO from '../../../../../dto/LocoScheduleDTO';
import { MatSort } from '@angular/material/sort';
import { ScheduleService } from '../../../../../service/schedule.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import LocoDTO from '../../../../../dto/LocoDTO';
import { LocomotiveService } from '../../../../../service/locomotive.service';
import { ViewProgressComponent } from 'src/app/UserDashBoard/user-dashboard/SubComponents/Schedules/view-schedules/view-progress/view-progress.component';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
@Component({
  selector: 'app-admin-view-scehdules',
  templateUrl: './admin-view-scehdules.component.html',
  styleUrls: ['./admin-view-scehdules.component.css'],
  providers: [{ provide: Window, useValue: window }],
})
export class AdminViewScehdulesComponent implements OnInit {
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
  statuses: any[] = ['All', 100, 90, 75, 60, 45, 30, 0];
  isShowPrTable: boolean = true;
  tableArray: any[];
  searchKey1: string;
  constructor(
    private scheduleService: ScheduleService,
    private _location: Location,
    private router: Router,
    public dialog: MatDialog,
    public ProgressReportService: ProgressReportService,
    private toastr: ToastrService
  ) {
    this.loadAllSchedule();
  }

  ngOnInit(): void {}
  private loadAllSchedule() {
    this.scheduleService.getAllSchedules().subscribe((resp) => {
      this.scheduleList = resp;
      this.dataSource = new MatTableDataSource<any>(this.scheduleList);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }

  backClicked() {
    this._location.back();
  }
  navigateReport(mReportNumber) {
    this.router.navigate(['/adminDashboard/viewOneMileage', mReportNumber]);
  }
  onChangeSelect(value) {
    let _cloneArrat = [];
    const _findValue = this.scheduleList.filter(
      (x) => x.scheduleProgress == value.value
    );
    if (_findValue.length > 0) {
      this.tableArray = _findValue;
      this.dataSource = new MatTableDataSource<LocoDTO>(this.tableArray);
    } else if (value.value == 'All') {
      this.dataSource = new MatTableDataSource<LocoDTO>(this.scheduleList);
    } else {
      this.onWarning('No records found on filter!');
      this.dataSource = new MatTableDataSource<LocoDTO>(this.scheduleList);
    }
  }

  clear() {
    // this.form.reset();
    this.searchKey = '';
    this.searchKey1 = '';
    this.loadAllSchedule();
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

  onWarning(message: string) {
    this.toastr.warning(message, 'Warning');
  }
}
