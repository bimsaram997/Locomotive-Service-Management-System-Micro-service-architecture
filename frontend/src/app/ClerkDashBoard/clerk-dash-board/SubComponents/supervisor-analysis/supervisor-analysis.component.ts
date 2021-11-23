import { ScheduleService } from './../../../../service/schedule.service';
import { LocomotiveService } from './../../../../service/locomotive.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-supervisor-analysis',
  templateUrl: './supervisor-analysis.component.html',
  styleUrls: ['./supervisor-analysis.component.css'],
})
export class SupervisorAnalysisComponent implements OnInit {
  public selectedIndex: number = 0;
  mileageList: any;
  countDraftMileage: any;
  countAcceptMileage: any;
  countRejectMileage: any;
  countAssignedMileage: any;
  isShow: boolean;
  nxtScheduleList: any;
  countDraftNext: any;
  countAssignedNext: any;
  totalMileage: any;
  totalNext: any;
  constructor(
    private _location: Location,
    private locomotiveService: LocomotiveService,
    private scheduleService: ScheduleService
  ) {}

  ngOnInit(): void {
    this.loadAllReport();
    this.getAllNextSchedulesNotFilter();
  }

  public loadAllReport() {
    const values = JSON.parse(localStorage.getItem('currentUser'));
    const object = {
      userNic: values.userNic,
      userRole: values.userRole,
    };
    this.locomotiveService.getAllMileage(object).subscribe((resp) => {
      this.mileageList = resp;
      this.totalMileage = this.mileageList.length;

      const _filterDraftMileage = this.mileageList.filter(
        (p) => p.status === 1
      );
      this.countDraftMileage = _filterDraftMileage.length;

      const _filterAcceptMileage = this.mileageList.filter(
        (p) => p.status === 2
      );
      this.countAcceptMileage = _filterAcceptMileage.length;

      const _filterRejectMileage = this.mileageList.filter(
        (p) => p.status === 3
      );
      this.countRejectMileage = _filterRejectMileage.length;

      const _filterAssignedMileage = this.mileageList.filter(
        (p) => p.status === 5
      );
      this.countAssignedMileage = _filterAssignedMileage.length;

      this.isShow = true;
    });
  }

  getAllNextSchedulesNotFilter() {
    this.scheduleService.getNextAllSchedules().subscribe((res) => {
      if (res.length > 0) {
        this.nxtScheduleList = res;
        this.totalNext = this.nxtScheduleList.length;

        const _filterDraftNext = this.nxtScheduleList.filter(
          (p) => p.nxtSchStatus === 0
        );
        this.countDraftNext = _filterDraftNext.length;

        const _filterAssignedtNext = this.nxtScheduleList.filter(
          (p) => p.nxtSchStatus === 1
        );
        this.countAssignedNext = _filterAssignedtNext.length;
      }
    });
  }

  backClicked() {
    this._location.back();
  }
}
