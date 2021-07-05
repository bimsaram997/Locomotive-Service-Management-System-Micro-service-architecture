import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import UserDTO from "../../../../../../dto/UserDTO";
import {AccessService} from "../../../../../../service/access.service";
import swal from "sweetalert";
import LocoDTO from "../../../../../../dto/LocoDTO";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  roles = [
    {id: 1, value: 'Supervisor'},
    {id: 2, value: 'Technical Officer'},
    {id: 3, value: 'Clerk'},
    {id: 4, value: 'Chief Engineer'}
  ];
  places = [
    {id: 1, value: 'Electric Locomotive Shed'},
    {id: 2, value: 'Running Shed'},
    {id: 3, value: 'Chief Engineering Ratmalana'}
  ];
  selectedUser: UserDTO = null;
  appviewUser: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private accessService: AccessService) { }

  ngOnInit(): void {
  }
  updateUser() {


    console.log(this.selectedUser);
    this.selectedUser = this.data.EditId;

    const dto = new UserDTO(
      this.selectedUser.userEmail,
      this.data.EditName,
      this.data.EdtWork,
      this.data.EditNic,
      this.data.EditMobile,
      this.data.EditRole,

    );
    console.log(dto);
    this.accessService.updateUser(dto).subscribe(result => {

      if (result.message === 'updated'){

        swal({
          title: 'Record is Updated!',
          text: 'Please Click OK',
          icon: 'success',
        });
        setTimeout(() => {
        }, 3000);


      }else {
        swal({
          title: 'Update Failed!',
          text: 'Please Click OK',
          icon: 'error',
        });
        setTimeout(() => {

        }, 3000);




      }
    });
  }

}
