import { AccessService } from 'src/app/service/access.service';
import { LocomotiveService } from 'src/app/service/locomotive.service';
import { ImageService } from './../../../../service/image.service';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import LocoDTO from 'src/app/dto/LocoDTO';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import UserDTO from 'src/app/dto/UserDTO';
import { Location } from '@angular/common';
import { ViewImageComponent } from 'src/app/UserDashBoard/user-dashboard/SubComponents/Locomotives/user-view-locomotives/view-image/view-image.component';

@Component({
  selector: 'app-clerk-view-locomotives',
  templateUrl: './clerk-view-locomotives.component.html',
  styleUrls: ['./clerk-view-locomotives.component.css'],
})
export class ClerkViewLocomotivesComponent implements OnInit {
  progresValue: number;
  rangeArray: number[];
  searchKey1: string;

  constructor(
    private dialog: MatDialog,
    private imageService: ImageService,
    private _location: Location,
    private locomotiveService: LocomotiveService,
    private router: Router,
    private toastr: ToastrService,
    private accessService: AccessService
  ) {
    // this.loadAll();
    this.progresValue = 0;
    this.rangeArray = new Array(100);
  }

  isVisible = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<LocoDTO>;
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
  myControl = new FormControl();
  options: string[] = [
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
  loading = false;
  userList: UserDTO[] = [];
  statuses: string[] = ['All', 'In', 'Out'];
  userNic: any;
  userRole: any;
  tableArray: any;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    var element = document.documentElement,
      body = document.body,
      scrollTop = 'scrollTop',
      scrollHeight = 'scrollHeight';
    this.progresValue =
      ((element[scrollTop] || body[scrollTop]) /
        ((element[scrollHeight] || body[scrollHeight]) -
          element.clientHeight)) *
      100;
  }

  ngOnInit(): void {
    this.loadAllIds();
    this.getAllLoco();
    this.getLocoReport();

    console.log(this.userNic);
  }

  backClicked() {
    this._location.back();
  }
  private loadAllIds() {
    this.loading = true;
    this.accessService.getAllUsers().subscribe((result) => {
      this.userList = result;
      this.loading = true;
    });
  }
  /*loadAll(){
    this.locomotiveService.getAllLocomotives().subscribe(resp => {
      this.locoArray = resp;
      this.dataSource = new MatTableDataSource<LocoDTO>(this.locoArray);

      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }*/

  getAllLoco() {
    const values = JSON.parse(localStorage.getItem('currentUser'));
    this.userNic = values.userNic;
    this.userRole = values.userRole;
    const object = {
      userNic: values.userNic,
      userRole: values.userRole,
    };
    console.log(object);
    this.locomotiveService.getAllLocoAssigned(object).subscribe((res) => {
      this.locoArray = res;
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

  editLoco(locoNumber: string) {
    this.router.navigate(['/adminDashboard/EditLocomotive', locoNumber]);
  }

  viewLoco(locoNumber: string) {
    this.router.navigate(['/clerkDashBoard/viewLoco', locoNumber]);
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

  clear() {
    // this.form.reset();
    this.searchKey = '';
    this.searchKey1 = '';
    this.loadAllIds();
    this.getAllLoco();
    this.getLocoReport();
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
    } else if (locoStatus === 5) {
      return 'railway_alert';
    }
  }

  onWarning(message: string) {
    this.toastr.warning(message, 'Warning');
  }

  getLocoReport() {
    this.locomotiveService.getLocoReport().subscribe((resp) => {
      console.log(resp);
    });
  }
}
