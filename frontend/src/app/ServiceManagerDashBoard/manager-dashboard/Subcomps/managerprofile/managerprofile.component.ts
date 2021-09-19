import { LocomotiveService } from 'src/app/service/locomotive.service';
import { ScheduleService } from 'src/app/service/schedule.service';
import { AccessService } from './../../../../service/access.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
@Component({
  selector: 'app-managerprofile',
  templateUrl: './managerprofile.component.html',
  styleUrls: ['./managerprofile.component.css'],
})
export class ManagerprofileComponent implements OnInit {
  subject = '';
  email = '';
  text = '';
  receive = '';
  isVisible = false;
  userList: any[] = [];

  userEmail: any;
  userName: any;
  userGender: any;
  userNic: any;
  userMobile: any;
  address: any;
  userRole: any;
  appointmentDate: any;
  userWorks: any;
  userPassword: any;
  image: any;
  scheduleList: any[];
  countSchedules: number;
  completedSchedules: number;
  draftSchedules: number;
  halfSchedules: number;
  mileageList: any[];
  draftMileage: number;
  acceptMileage: number;
  assignedMileage: number;
  rejectMileage: number;
  constructor(
    private accessService: AccessService,
    private _location: Location,
    private toastr: ToastrService,
    private scheduleService: ScheduleService,
    public locomotiveService: LocomotiveService
  ) {}

  ngOnInit(): void {
    //this.getUserDetails();
    const values = JSON.parse(localStorage.getItem('currentUser'));
    const object = {
      userNic: values.userNic,
      userRole: values.userRole,
    };
    //console.log(object);
    this.getAllSchedule();
    this.loadAllReport();
    this.accessService.getUserInfo(object).subscribe((res) => {
      this.userList = res;
      console.log(this.userList);
      this.userName = res[0].userName;
      this.userEmail = res[0].userEmail;
      this.userGender = res[0].userGender;
      this.userNic = res[0].userNic;
      this.userMobile = res[0].userMobile;
      this.address = res[0].address;
      this.userRole = res[0].userRole;
      this.appointmentDate = res[0].appointmentDate;
      this.userWorks = res[0].userWorks;
      this.image = res[0].image;
    });
  }
  backClicked() {
    this._location.back();
  }
  sendMail() {
    this.accessService
      .sendEmail(this.email, this.receive, this.subject, this.text)
      .subscribe((result) => {
        if (result) {
          //console.log(this.email, this.receive, this.subject, this.text);
          this.onSucess('Sent');
          this.refresh();
        } else {
          this.refresh();
        }
      });
  }
  onError(message: string) {
    this.toastr.error(message, 'Warning');
  }
  onSucess(message: string) {
    this.toastr.success(message, 'Success');
  }

  refresh(): void {
    window.location.reload();
  }
  setState() {
    this.isVisible = !this.isVisible;
  }
  view() {
    const btn = document.getElementById('btn-pop-up') as HTMLElement;
    btn.click();
  }
  getUserDetails() {}

  getAllSchedule() {
    const values = JSON.parse(localStorage.getItem('currentUser'));
    const object = {
      userNic: values.userNic,
      userRole: values.userRole,
    };

    this.scheduleService
      .getAllScheduleAssignedManager(object)
      .subscribe((resp) => {
        this.scheduleList = resp;
        const _filterFullComplete = this.scheduleList.filter(
          (p) => p.scheduleStatus == 7
        );
        this.countSchedules = _filterFullComplete.length;

        const _filterCompleted = this.scheduleList.filter(
          (p) => p.scheduleStatus == 6
        );
        this.completedSchedules = _filterCompleted.length;
        //console.log(this.completedSchedules);

        const _filterDraft = this.scheduleList.filter(
          (p) => p.scheduleStatus === 0
        );
        this.draftSchedules = _filterDraft.length;

        const _filterHalfCompleted = this.scheduleList.filter(
          (p) =>
            p.scheduleStatus === 1 ||
            p.scheduleStatus === 2 ||
            p.scheduleStatus === 3 ||
            p.scheduleStatus === 4 ||
            p.scheduleStatus === 5
        );
        this.halfSchedules = _filterHalfCompleted.length;
        console.log(this.halfSchedules);
      });
  }

  public loadAllReport() {
    const values = JSON.parse(localStorage.getItem('currentUser'));
    const object = {
      userNic: values.userNic,
      userRole: values.userRole,
    };
    this.locomotiveService.getAllMileage(object).subscribe((resp) => {
      this.mileageList = resp;
      const _filterFDraftMileage = this.mileageList.filter(
        (p) => p.status === 1
      );
      this.draftMileage = _filterFDraftMileage.length;

      const _filterAcceptMileage = this.mileageList.filter(
        (p) => p.status === 2
      );
      this.acceptMileage = _filterAcceptMileage.length;

      const _filterAssignedMileage = this.mileageList.filter(
        (p) => p.status === 5
      );
      this.assignedMileage = _filterAssignedMileage.length;

      const _filterRejectMileage = this.mileageList.filter(
        (p) => p.status === 3
      );
      this.rejectMileage = _filterRejectMileage.length;
    });
  }
}
