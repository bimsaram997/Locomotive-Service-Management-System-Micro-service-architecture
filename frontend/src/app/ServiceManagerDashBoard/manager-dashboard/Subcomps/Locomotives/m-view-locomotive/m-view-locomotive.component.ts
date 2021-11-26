import { ViewImageComponent } from './../../../../../UserDashBoard/user-dashboard/SubComponents/Locomotives/user-view-locomotives/view-image/view-image.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import LocoDTO from 'src/app/dto/LocoDTO';
import { LocomotiveService } from 'src/app/service/locomotive.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-m-view-locomotive',
  templateUrl: './m-view-locomotive.component.html',
  styleUrls: ['./m-view-locomotive.component.css'],
})
export class MViewLocomotiveComponent implements OnInit {
  isVisible = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'Category',
    'Number',
    'Power',
    'Mileage',
    'Availability',
    'Responsible',
    'Update Date',
    'Status',
    'Image',
    '#',
  ];
  @ViewChild(MatSort) sort: MatSort;
  locoArray: LocoDTO[] = [];
  selectedLoco: LocoDTO = null;
  searchKey: string;

  isVisibleSecond = false;
  statuses: string[] = ['All', 'In', 'Out'];
  tMotors: string[] = ['Working', 'Not Working'];
  mainMotors: string[] = ['Working', 'Not Working'];
  vBreaks: string[] = ['Working', 'Not Working'];
  dBreaks: string[] = ['Working', 'Not Working'];
  tableArray: LocoDTO[];

  constructor(
    public dialog: MatDialog,
    private toastr: ToastrService,
    private _location: Location,
    private locomotiveService: LocomotiveService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.locomotiveService.getAllLocomotives().subscribe((resp) => {
      this.locoArray = resp;
      this.dataSource = new MatTableDataSource<LocoDTO>(this.locoArray);

      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }

  onChangeSelect(value) {
    let _cloneArrat = [];
    const _findValue = this.locoArray.filter(
      (x) => x.locoAvailability == value.value
    );
    if (_findValue.length > 0) {
      this.tableArray = _findValue;
      this.dataSource = new MatTableDataSource<LocoDTO>(this.tableArray);
    } else if (value.value == 'All') {
      this.dataSource = new MatTableDataSource<LocoDTO>(this.locoArray);
    } else {
      this.onWarning('No records found on filter!');
      this.dataSource = new MatTableDataSource<LocoDTO>(this.locoArray);
    }
  }

  backClicked() {
    this._location.back();
  }

  openImage(tempLoco: LocoDTO) {
    this.selectedLoco = tempLoco;
    const dialogRef = this.dialog.open(ViewImageComponent, {
      data: {
        ViewImage: this.selectedLoco.image,
        ViewID: this.selectedLoco.locoCatId,
        ViewNum: this.selectedLoco.locoNumber,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog: ${result}`);
    });
  }

  onSearchClear() {
    this.searchKey = '';
    //this.applyFilter();
  }

  applyFilter(filterValue: string) {
    if (filterValue.length > 1) {
      filterValue = filterValue.trim();
      filterValue = filterValue.toLowerCase();
      this.dataSource.filter = filterValue;
    }
  }
  viewLoco(locoNumber: string) {
    this.router.navigate(['/managerDashBoard/viewLoco', locoNumber]);
  }

  statusBinder(locoStatus) {
    if (locoStatus === 0) {
      return 'train';
    } else if (locoStatus === 1) {
      return 'garage';
    } else if (locoStatus === 2) {
      return 'gpp_good';
    } else if (locoStatus === 3) {
      return 'directions_run';
    } else if (locoStatus === 4) {
      return 'speed';
    }
  }
  onWarning(message: string) {
    this.toastr.warning(message, 'Warning');
  }
}
