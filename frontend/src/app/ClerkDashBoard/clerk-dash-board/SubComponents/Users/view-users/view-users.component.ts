import {Component, OnInit, ViewChild} from '@angular/core';
import {AccessService} from "../../../../../service/access.service";
import {MatTableDataSource} from "@angular/material/table";
import UserDTO from "../../../../../dto/UserDTO";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import swal from "sweetalert";
import {EditUserComponent} from "./edit-user/edit-user.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {

  constructor(private accessService: AccessService, public dialog: MatDialog) {
    this.loadAllUsers();
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  dataSource: MatTableDataSource<UserDTO>;
  displayedColumns: string[] = ['User Email', 'User Name', 'Works At', 'User NIC', 'User Mobile', 'Role', '#'];
  userArray: UserDTO[] = [];
  selectedUser: UserDTO = null;
  loading =  false;
  @ViewChild(MatSort) sort: MatSort;
  changeUserName = '';
  changeUserWork = '';
  changeUserNic = '';
  changeUserMobile = '';
  changeRole = '';
  changePassword = '';

  ngOnInit(): void {
  }

  private loadAllUsers(){
    this.loading = true;
    this.accessService.getUsers().subscribe(resp =>{
      this.userArray = resp;
      this.dataSource = new MatTableDataSource<UserDTO>(this.userArray)
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }

  deleteCust(CustomerNic: string) {

  }



  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  openDialog(tempUser: any) {

  }

  deleteUser(userEmail: string) {
    if (confirm('Are You Sure, whether You want to delete this Customer ?')){
      this.accessService.deleteUser(userEmail).subscribe(result => {
        if (result.message === 'deleted'){
          swal('Record was deleted', {
            icon: 'success',
          });
          this.loadAllUsers()
        } else{
          swal('Record was deleted', {
            icon: 'error',
          });
        }
      });
    }
  }

  OpenEdit(tempUser: UserDTO) {
    this.selectedUser = tempUser;
    this.changeUserName = tempUser.userName;
    this.changeUserWork = tempUser.userWorks;
    this.changeUserNic = tempUser.userNic;
    this.changeUserMobile = tempUser.userMobile;
    this.changeRole = tempUser.userRole;


    this.changePassword =  tempUser.userPassword;
    const dialogRef = this.dialog.open(EditUserComponent, {data: {
      EditId: this.selectedUser,
      EditName: this.changeUserName,
      EdtWork: this.changeUserWork,
        EditNic: this.changeUserNic,
      EditMobile: this.changeUserMobile,
      EditRole: this.changeRole,

     }})
    dialogRef.afterClosed().subscribe(result =>{
      console.log(`Dialog: ${result}`);
      this.loadAllUsers();
    });
  }
}
