import { AccessService } from 'src/app/service/access.service';
import { LoadTrialService } from 'src/app/service/load-trial.service';
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
  public selectedIndex: number = 0;
  loadArray: any;
  countDraftLoad: any;
  countPassedtLoad: any;
  countPendingLoad: any;
  userName: any;
  userRole: any;
  userWorks: any;
  image: any;
  finalScore: number;
  overallScore: number;
  val: number;
  averageInLoco: number;
  averageOutLoco: number;
  inLoco: any;
  outLoco: any;
  inCompletedSchedules: any;
  averageSchedule: number;
  countTotalPendingLoad: any;
  averageLoadTrials: number;
  constructor(
    private _location: Location,
    private locomotiveService: LocomotiveService,
    private scheduleService: ScheduleService,
    private loadService: LoadTrialService,
    private accessService: AccessService
  ) {}

  ngOnInit(): void {
    this.getAllLoco();
    this.getAllSchedule();
    this.getLoadTrial();
    this.getUserDetails();
    this.newLogic();
    this.getLocomotiveAverage();
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

      const _filterInLoco = this.locoArray.filter(
        (p) => p.locoAvailability === 'In'
      );
      this.inLoco = _filterInLoco.length;

      const _filterOutLoco = this.locoArray.filter(
        (p) => p.locoAvailability != 'In'
      );
      this.outLoco = _filterOutLoco.length;
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

  public getLoadTrial() {
    const values = JSON.parse(localStorage.getItem('currentUser'));
    const object = {
      userNic: values.userNic,
      userRole: values.userRole,
    };
    this.loadService.getLoadTrialAssigned(object).subscribe((resp) => {
      this.loadArray = resp;

      const _filterDraftLoad = this.loadArray.filter((p) => p.status === 1);
      this.countDraftLoad = _filterDraftLoad.length;

      const _filterPasstLoad = this.loadArray.filter((p) => p.status === 2);
      this.countPassedtLoad = _filterPasstLoad.length;

      const _filterPendingtLoad = this.loadArray.filter((p) => p.status === 3);
      this.countPendingLoad = _filterPendingtLoad.length;

      const _totalPendingtLoad = this.loadArray.filter((p) => p.status != 2);
      this.countTotalPendingLoad = _totalPendingtLoad.length;

      this.averageLoadTrials = Math.round(this.loadArray.length / 12);
    });
  }

  getUserDetails(): void {
    const values = JSON.parse(localStorage.getItem('currentUser'));
    const object = {
      userNic: values.userNic,
      userRole: values.userRole,
    };
    //console.log(object);
    this.accessService.getUserInfo(object).subscribe((res) => {
      this.userName = res[0].userName;
      this.userRole = res[0].userRole;
      this.userWorks = res[0].userWorks;
      this.image = res[0].image;
    });
  }

  newLogic() {
    const values = JSON.parse(localStorage.getItem('currentUser'));
    const object = {
      userNic: values.userNic,
      userRole: values.userRole,
    };
    console.log(object);
    this.scheduleService.getAllScheduleAssigned(object).subscribe((resp) => {
      this.scheduleList = resp;

      const _FilterData = this.scheduleList.filter(
        (p) => p.scheduleStatus == 7 || p.scheduleStatus == 8
      );
      var ShcCount = 0;
      if (_FilterData.length > 0) {
        _FilterData.forEach((result, index) => {
          if (result.actualCompletedDate != undefined) {
            if (
              new Date(result.actualCompletedDate).getTime() <
              new Date(result.completedDate).getTime()
            ) {
              ShcCount += 1;
            }
          }
        });
        this.finalScore = (ShcCount / _FilterData.length) * 100;
        this.overallScore = (Math.round(this.finalScore) / 100) * 100;
      }
    });
  }

  getLocomotiveAverage(): void {
    const values = JSON.parse(localStorage.getItem('currentUser'));
    const object = {
      userNic: values.userNic,
      userRole: values.userRole,
    };

    this.locomotiveService
      .getAllLocoAssignedHistory(object)
      .subscribe((res) => {
        this.locoArray = res;

        const _locomotiveArray = this.locoArray;
        const _availableLoco = _locomotiveArray.filter(
          (p) => p.locoAvailability === 'In'
        );
        if (_availableLoco.length > 0) {
          this.averageInLoco = Math.round(_availableLoco.length / 12);
        }
        //unavailable lcomotives
        const _unAvailableLoco = _locomotiveArray.filter(
          (p) => p.locoAvailability === 'Out'
        );
        if (_unAvailableLoco.length > 0) {
          this.averageOutLoco = Math.round(_unAvailableLoco.length / 12);
        }
      });
  }

  backClicked() {
    this._location.back();
  }
}
