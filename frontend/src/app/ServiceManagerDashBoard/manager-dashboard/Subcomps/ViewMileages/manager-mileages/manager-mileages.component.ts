import {
  RejectDialogModel,
  RejectDialogComponent,
} from './../../../../../AdminDashBoard/admin-dash-board/sub-components/view-mileage/reject-dialog/reject-dialog.component';
import { first } from 'rxjs/operators';
import {
  ConfirmDialogModel,
  ConfirmDialogComponent,
} from './../../../../../AdminDashBoard/admin-dash-board/sub-components/view-mileage/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LocomotiveService } from './../../../../../service/locomotive.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-manager-mileages',
  templateUrl: './manager-mileages.component.html',
  styleUrls: ['./manager-mileages.component.css'],
})
export class ManagerMileagesComponent implements OnInit {
  mReportNumber: any;
  mLocoCatId: any;
  mLocoNumber: any;
  mLocoMileage: any;
  mileageDate: any;
  userNic: any;
  userEmail: any;
  mileageNote: any;
  status: any;
  searchKey: string;
  isVisible = false;
  loading = false;
  tableArray: any;
  loadArray: any[] = [];
  mileageList: any[] = [];
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
  result: any;
  reason: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'Report Number',
    'Loco Category',
    'Responsible',
    'Loco Number',
    'Mileage',
    'Date',
    'mileageNote',
    'status',
    '#',
  ];
  searchKey1: string;
  constructor(
    private locomotiveService: LocomotiveService,
    private _location: Location,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAllReport();
  }

  backClicked() {
    this._location.back();
  }

  clear() {
    // this.form.reset();
    this.searchKey = '';
    this.searchKey1 = '';
    this.loadAllReport();
  }

  public loadAllReport() {
    const values = JSON.parse(localStorage.getItem('currentUser'));
    const object = {
      userNic: values.userNic,
      userRole: values.userRole,
    };
    this.locomotiveService.getAllMileage(object).subscribe((resp) => {
      this.mileageList = resp;
      this.dataSource = new MatTableDataSource<any>(this.mileageList);

      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }

  onChangeSelect(value) {
    const _findValue = this.mileageList.filter(
      (x) => x.mLocoCatId == value.value
    );
    if (_findValue.length > 0) {
      this.tableArray = _findValue;
      this.dataSource = new MatTableDataSource<any>(this.tableArray);
    } else if (value.value == 'All') {
      this.dataSource = new MatTableDataSource<any>(this.mileageList);
    } else {
      this.onWarning('No records found on filter!');
      this.dataSource = new MatTableDataSource<any>(this.mileageList);
    }
  }
  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  viewMileage(id: string) {
    this.router.navigate(['/managerDashBoard/viewOneMileage', id]);
  }

  openAcceptDialog(data): void {
    const message = `Are you sure you want to Accept this?`;

    const dialogData = new ConfirmDialogModel('Confirm Action', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      this.result = dialogResult;
      if (this.result == true) {
        this.sendAcceptedEmail(data);
        this.locomotiveService
          .updateMileStatus(data._id)
          .pipe(first())
          .subscribe((res) => {
            this.loadAllReport();
          });
      }
    });
  }

  public sendAcceptedEmail(data): void {
    console.log(data);
    this.locomotiveService
      .sendAcceptedEmail(data)
      .pipe(first())
      .subscribe(
        (res) => {},
        (error) => {}
      );
  }
  public sendRejectedEmail(data): void {
    console.log(data);
    this.locomotiveService
      .sendRejectedEmail(data)
      .pipe(first())
      .subscribe(
        (res) => {},
        (error) => {}
      );
  }

  openRejectDialog(data) {
    const message = `Are you sure you want to Reject this?`;

    const dialogData = new RejectDialogModel('Confirm Action', message);

    const dialogRef = this.dialog.open(RejectDialogComponent, {
      width: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      this.result = dialogResult.val;
      const val = this.result;
      //console.log(this.result);
      if (val !== '') {
        this.sendRejectedEmail(data);
        this.locomotiveService
          .updateRejectStatus(data._id, val)
          .pipe(first())
          .subscribe((res) => {
            this.loadAllReport();
          });
      }
    });
  }

  statusBinder(status) {
    if (status === 1) {
      return 'hourglass_top';
    } else if (status === 2) {
      return 'check';
    } else if (status === 3) {
      return 'clear';
    } else if (status === 4) {
      return 'assignment';
    } else if (status === 5) {
      return 'assignment';
    }
  }

  onWarning(message: string) {
    this.toastr.warning(message, 'Warning');
  }
}
