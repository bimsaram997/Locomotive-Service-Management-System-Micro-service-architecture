import { ToastrService } from 'ngx-toastr';
import { ScheduleService } from 'src/app/service/schedule.service';
import { AddCommentLoadComponent } from './add-comment-load/add-comment-load.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LoadTrialService } from 'src/app/service/load-trial.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view-ad-load-trial',
  templateUrl: './view-ad-load-trial.component.html',
  styleUrls: ['./view-ad-load-trial.component.css'],
})
export class ViewAdLoadTrialComponent implements OnInit {
  searchKey: string;
  isVisible = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'Load No',
    'Load Date',
    'Loco Category',
    'Loco Number',
    'Form',
    'To',
    'Schedule No',
    'Responsible',
    'Status',
    '#',
  ];
  statuses: string[] = [
    'All',
    'M1',
    'M2',
    'M3',
    'M4',
    'M5',
    'M6',
    'M7',
    'M8',
    'M9',
    'M10',
    'M11',
  ];
  tableArray: any;

  @ViewChild(MatSort) sort: MatSort;
  loadArray: any[] = [];
  status: any;
  disabled = true;
  reason: any;
  defChecked: boolean = false;
  shArray: any;
  searchKey1: string;

  constructor(
    private loadService: LoadTrialService,
    private _location: Location,
    private router: Router,
    private scheduleService: ScheduleService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getLoadTrial();
    this.getNxtScheduleByLocoNoAndStatus();
  }

  backClicked() {
    this._location.back();
  }
  private getLoadTrial() {
    const values = JSON.parse(localStorage.getItem('currentUser'));
    const object = {
      userNic: values.userNic,
      userRole: values.userRole,
    };

    this.loadService.getLoadTrialAssigned(object).subscribe((resp) => {
      this.loadArray = resp;
      console.log(this.loadArray);
      this.dataSource = new MatTableDataSource<any>(this.loadArray);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }

  isUrgent(loadTrial: any): boolean {
    let isUrgent: boolean = false;
    const reqDate = new Date(loadTrial.loadDate);
    reqDate.setHours(0, 0, 0, 0);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    if (currentDate <= reqDate && loadTrial.status != 2) {
      isUrgent = true;
    }
    return isUrgent;
  }

  clear() {
    // this.form.reset();
    this.searchKey = '';
    this.searchKey1 = '';
    this.getLoadTrial();
  }

  navigateSchedule(mReportNumber) {
    this.router.navigate(['/adminDashboard/viewSchedule', mReportNumber]);
  }

  onChangeSelect(value) {
    let _cloneArrat = [];
    const _findValue = this.loadArray.filter((x) => x.locoCatId == value.value);
    if (_findValue.length > 0) {
      this.tableArray = _findValue;
      this.dataSource = new MatTableDataSource<any>(this.tableArray);
    } else if (value.value == 'All') {
      this.dataSource = new MatTableDataSource<any>(this.loadArray);
    } else {
      this.onWarning('No records found on filter!');
      this.dataSource = new MatTableDataSource<any>(this.loadArray);
    }
  }
  public getNxtScheduleByLocoNoAndStatus() {
    //const values = JSON.parse(localStorage.getItem('currentUser'));

    const locoNumber = 627;
    const nxtSchStatus = 0;

    this.scheduleService
      .getNxtScheduleByLocoNoAndStatus(locoNumber, nxtSchStatus)
      .subscribe((resp) => {
        this.shArray = resp;
        console.log(this.shArray);
      });
  }

  statusBinder(status) {
    if (status === 1) {
      return 'hourglass_top';
    } else if (status === 2) {
      return 'check_circle_outline';
    } else if (status === 3) {
      return 'pending_actions';
    }
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }
  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }
  viewLoad(mReportNumber: string) {
    this.router.navigate(['/adminDashboard/viewAdLoadProd', mReportNumber]);
  }
  onWarning(message: string) {
    this.toastr.warning(message, 'Warning');
  }

  alert() {
    window.alert('hi');
  }

  isDisabled() {
    return true;
  }
}
