import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccessService } from 'src/app/service/access.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

 subject = '';
  email = '';
  text = '';
  receive = '';
  isVisible =  false;
  userList: any[]=[];

  userEmail:any;
  userName:any;
  userGender:any;
  userNic:any;
  userMobile:any;
  address:any;
  userRole:any;
  appointmentDate:any;
  userWorks:any;
  userPassword:any;
  image:any;

  constructor(private accessService: AccessService, private toastr: ToastrService) { }

  ngOnInit(): void {
    //this.getUserDetails();
      const values =  JSON.parse( localStorage.getItem('currentUser'));
    const object  = {
      userNic:values.userNic,
      userRole:values.userRole

    }
    console.log(object)
    this.accessService.getUserInfo(object)
    .subscribe(
      res=>{
        this.userList =  res;
        console.log(this.userList);
        this.userName =  res[0].userName;
        this.userEmail = res[0].userEmail;
        this.userGender =  res[0].userGender;
        this.userNic =  res[0].userNic;
        this.userMobile =  res[0].userMobile;
        this.address =  res[0].address;
        this.userRole =  res[0].userRole;
        this.appointmentDate =  res[0].appointmentDate;
        this.userWorks =  res[0].userWorks;
        this.image =  res[0].image;


      }
    )

  }


}
