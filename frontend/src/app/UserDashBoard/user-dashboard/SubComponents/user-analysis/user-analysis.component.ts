import { ScheduleService } from 'src/app/service/schedule.service';
import { LocomotiveService } from 'src/app/service/locomotive.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-user-analysis',
  templateUrl: './user-analysis.component.html',
  styleUrls: ['./user-analysis.component.css'],
})
export class UserAnalysisComponent implements OnInit {
  locoArray: any;
  countOperateLoco: any;
  countServiceLoco: any;
  countLoadLoco: any;
  scheduleList: any;
  countSchedules: any;
  completedSchedules: any;
  draftSchedules: any;
  halfSchedules: any;
  constructor(
    private _location: Location,
    private locomotiveService: LocomotiveService,
    private scheduleService: ScheduleService
  ) {}

  ngOnInit(): void {
    this.getAllLoco();
    this.getAllSchedule();
  }

  getAllLoco() {
    const values = JSON.parse(localStorage.getItem('currentUser'));
    const object = {
      userNic: values.userNic,
      userRole: values.userRole,
    };
    console.log(object);
    this.locomotiveService.getAllLocoAssigned(object).subscribe((res) => {
      this.locoArray = res;
      console.log(this.locoArray);

      const _filterOperatingLoco = this.locoArray.filter(
        (p) => p.locoStatus === 0
      );
      this.countOperateLoco = _filterOperatingLoco.length;

      const _filterServiceLoco = this.locoArray.filter(
        (p) => p.locoStatus === 1
      );
      this.countServiceLoco = _filterServiceLoco.length;

      const _filterLoadLoco = this.locoArray.filter((p) => p.locoStatus === 2);
      this.countLoadLoco = _filterLoadLoco.length;
      console.log(this.countLoadLoco);
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
    });
  }

  backClicked() {
    this._location.back();
  }
}
