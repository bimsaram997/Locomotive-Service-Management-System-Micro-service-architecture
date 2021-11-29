import { Component, OnInit, ViewChild } from '@angular/core';
import { AccessService } from '../../../../../service/access.service';
import { MatTableDataSource } from '@angular/material/table';
import UserDTO from '../../../../../dto/UserDTO';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import swal from 'sweetalert';
import { EditUserComponent } from './edit-user/edit-user.component';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css'],
})
export class ViewUsersComponent implements OnInit {
  searchKey1: string;
  constructor(
    private accessService: AccessService,
    private _location: Location,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {}
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
  ngOnInit(): void {
    this.loadAllUsers();
  }

  clear() {
    // this.form.reset();
    this.searchKey = '';
    this.searchKey1 = '';
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

  deleteUser(userEmail: string) {
    if (confirm('Are You Sure, whether You want to delete this Customer ?')) {
      this.accessService.deleteUser(userEmail).subscribe((result) => {
        if (result.message === 'deleted') {
          swal('Record was deleted', {
            icon: 'success',
          });
          this.loadAllUsers();
        } else {
          swal('Record was deleted', {
            icon: 'error',
          });
        }
      });
    }
  }

  OpenEdit(_id: string) {
    const dialogRef = this.dialog.open(EditUserComponent, {
      data: { id: _id, title: 'Edit User', userNic: '', isHide: true },
      width: '700px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.loadAllUsers();
    });
  }

  onWarning(message: string) {
    this.toastr.warning(message, 'Warning');
  }
}
