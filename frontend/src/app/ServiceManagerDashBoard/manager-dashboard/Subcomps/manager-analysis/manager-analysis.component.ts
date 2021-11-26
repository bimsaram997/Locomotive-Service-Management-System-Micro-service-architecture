import { LocomotiveService } from './../../../../service/locomotive.service';
import { ScheduleService } from './../../../../service/schedule.service';
import { ToastrService } from 'ngx-toastr';
import { AccessService } from './../../../../service/access.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-manager-analysis',
  templateUrl: './manager-analysis.component.html',
  styleUrls: ['./manager-analysis.component.css'],
})
export class ManagerAnalysisComponent implements OnInit {
  mileageList: any;
  draftMileage: any;
  acceptMileage: any;
  assignedMileage: any;
  rejectMileage: any;
  public selectedIndex: number = 0;
  total: any;
  scheduleList: any;
  countSchedules: any;
  completedSchedules: any;
  draftSchedules: any;
  halfSchedules: any;
  inCompletedSchedules: any;
  averageSchedule: number;
  constructor(
    private accessService: AccessService,
    private _location: Location,
    private toastr: ToastrService,
    private scheduleService: ScheduleService,
    public locomotiveService: LocomotiveService
  ) {}

  ngOnInit(): void {
    this.loadAllReport();
    this.getAllSchedule();
  }

  public loadAllReport() {
    const values = JSON.parse(localStorage.getItem('currentUser'));
    const object = {
      userNic: values.userNic,
      userRole: values.userRole,
    };
    this.locomotiveService.getAllMileage(object).subscribe((resp) => {
      this.mileageList = resp;
      this.total = this.mileageList.length;
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

  getAllSchedule() {
    const values = JSON.parse(localStorage.getItem('currentUser'));
    const object = {
      userNic: values.userNic,
      userRole: values.userRole,
    };

    this.scheduleService.getAllScheduleAssigned(object).subscribe((resp) => {
      this.scheduleList = resp;
      const _filterFullComplete = this.scheduleList.filter(
        (p) => p.scheduleStatus == 7
      );
      this.countSchedules = _filterFullComplete.length;

      const _filterHalf8 = this.scheduleList.filter(
        (p) => p.scheduleStatus === 8
      );
      const eight = _filterHalf8.length;

      const _filterCompleted = this.scheduleList.filter(
        (p) => p.scheduleStatus == 6
      );
      this.completedSchedules = _filterCompleted.length + eight;
      //
      const _filterDraft = this.scheduleList.filter(
        (p) => p.scheduleStatus === 0
      );
      this.draftSchedules = _filterDraft.length;
      const _filterHalf2 = this.scheduleList.filter(
        (p) => p.scheduleStatus === 2
      );
      const two = _filterHalf2.length;

      const _filterHalf3 = this.scheduleList.filter(
        (p) => p.scheduleStatus === 3
      );
      const three = _filterHalf3.length;

      const _filterHalf4 = this.scheduleList.filter(
        (p) => p.scheduleStatus === 4
      );
      const four = _filterHalf4.length;

      const _filterHalf5 = this.scheduleList.filter(
        (p) => p.scheduleStatus === 5
      );
      const five = _filterHalf5.length;

      const _filterHalfCompleted = this.scheduleList.filter(
        (p) => p.scheduleStatus === 1
      );
      this.halfSchedules =
        _filterHalfCompleted.length + two + three + four + five;

      const _filterInCompleted = this.scheduleList.filter(
        (p) => p.scheduleStatus != 7
      );
      this.inCompletedSchedules = _filterInCompleted.length;
      this.averageSchedule = Math.round(this.scheduleList.length / 12);
    });
  }

  backClicked() {
    this._location.back();
  }
}
