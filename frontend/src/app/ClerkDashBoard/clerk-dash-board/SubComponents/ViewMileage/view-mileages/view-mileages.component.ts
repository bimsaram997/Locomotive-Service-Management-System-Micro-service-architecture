import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocomotiveService } from '../../../../../service/locomotive.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-view-mileages',
  templateUrl: './view-mileages.component.html',
  styleUrls: ['./view-mileages.component.css'],
})
export class ViewMileagesComponent implements OnInit {
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
  mileageList: any[] = [];
  result: any;
  reason: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  options: string[] = [
    'All',
    'M2',
    'M4',
    'M5',
    'M6',
    'M7',
    'M8',
    'M9',
    'M10',
    'M11',
    'M12',
  ];
  displayedColumns: string[] = [
    'Report Number',
    'Loco Category',
    'Loco Number',
    'Mileage',
    'Date',
    'mileageNote',
    'status',
    '#',
  ];
  tableArray: any[];
  searchKey1: string;
  constructor(
    private locomotiveService: LocomotiveService,
    private _location: Location,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadAllReport();
  }
  private loadAllReport() {
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
  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  backClicked() {
    this._location.back();
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

  viewMileage(id: string) {
    this.router.navigate(['/clerkDashBoard/viewOneMileage', id]);
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
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

  clear() {
    // this.form.reset();
    this.searchKey = '';
    this.searchKey1 = '';
    this.loadAllReport();
  }
}
