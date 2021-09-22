import { AccessService } from './../../../../service/access.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import UserDTO from 'src/app/dto/UserDTO';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-admin-view-users',
  templateUrl: './admin-view-users.component.html',
  styleUrls: ['./admin-view-users.component.css'],
})
export class AdminViewUsersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  dataSource: MatTableDataSource<UserDTO>;
  displayedColumns: string[] = [
    'UserEmail',
    'User Name',
    'Works At',
    'User NIC',
    'User Mobile',
    'Role',
    'Image',
    '#',
  ];
  userArray: UserDTO[] = [];
  selectedUser: UserDTO = null;
  loading = false;
  @ViewChild(MatSort) sort: MatSort;
  changeUserName = '';
  changeUserWork = '';
  changeUserNic = '';
  changeUserMobile = '';
  changeRole = '';
  changePassword = '';
  tableArray: any;

  places: string[] = [
    'All',
    'Electric Locomotive Shed',
    'Running Shed',
    'Chief Engineering Ratmalana',
  ];

  constructor(
    private accessService: AccessService,
    private _location: Location,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadAllUsers();
  }

  backClicked() {
    this._location.back();
  }
  private loadAllUsers() {
    this.loading = true;
    this.accessService.getUsers().subscribe((resp) => {
      this.userArray = resp;
      this.dataSource = new MatTableDataSource<UserDTO>(this.userArray);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }

  deleteCust(CustomerNic: string) {}

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

  onChangeSelect(value) {
    const _findValue = this.userArray.filter((x) => x.userWorks == value.value);
    if (_findValue.length > 0) {
      this.tableArray = _findValue;
      this.dataSource = new MatTableDataSource<any>(this.tableArray);
    } else if (value.value == 'All') {
      this.dataSource = new MatTableDataSource<any>(this.userArray);
    } else {
      this.onWarning('No records found on filter!');
      this.dataSource = new MatTableDataSource<any>(this.userArray);
    }
  }

  openDialog(tempUser: any) {}

  onWarning(message: string) {
    this.toastr.warning(message, 'Warning');
  }
}
