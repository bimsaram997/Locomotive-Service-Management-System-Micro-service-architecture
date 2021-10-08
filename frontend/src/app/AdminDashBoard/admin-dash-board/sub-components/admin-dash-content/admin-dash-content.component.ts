import { LocomotiveService } from './../../../../service/locomotive.service';
import { LoadTrialService } from './../../../../service/load-trial.service';
import { ScheduleService } from './../../../../service/schedule.service';
import { Component, OnInit } from '@angular/core';
import LocoScheduleDTO from 'src/app/dto/LocoScheduleDTO';
import * as moment from 'moment';
import { CalendarOptions } from '@fullcalendar/angular';
@Component({
  selector: 'app-admin-dash-content',
  templateUrl: './admin-dash-content.component.html',
  styleUrls: ['./admin-dash-content.component.css'],
})
export class AdminDashContentComponent implements OnInit {
  dateList: LocoScheduleDTO[] = [];
  dateList1: LocoScheduleDTO[] = [];
  loading = false;
  cont: Array<any>[] = [];
  currentDate = new Date();
  name: any;

  calanderArray: any[] = [];

  calendarOptions: CalendarOptions;
  locoArray: any;
  countOperateLoco: any;
  countServiceLoco: any;
  countLoadLoco: any;
  scheduleList: any;
  countSchedules: any;
  completedSchedules: any;
  draftSchedules: any;
  totalCompletd: any;
  totalIncompletd: any;
  halfSchedules: any;
  loadArray: any;
  countDraftLoad: any;
  countPassedtLoad: any;
  countPendingLoad: any;
  incompleteLoad: any;
  mileageList: any;
  acceptedMileage: any;
  assignedMileage: any;
  draftRjectedMile: any;
  constructor(
    private schedulesService: ScheduleService,
    private loadService: LoadTrialService,
    private scheduleService: ScheduleService,
    private locomotiveService: LocomotiveService
  ) {}

  ngOnInit(): void {
    this.getAllLoco();
    this.getAllSchedule();
    this.getLoadTrial();
    this.loadAllReport();
    const values = JSON.parse(localStorage.getItem('currentUser'));
    this.name = values.userName;

    this.schedulesService.getAllScheduleCalendar().subscribe((res) => {
      console.log(res);
      if (res && res.length > 0) {
        for (const param of res) {
          for (const sub of param) {
            let eventObject = {
              title: `${sub.loadNo == undefined ? sub.scheduleNo : sub.loadNo}`,
              id: sub._id,
              start: `${moment(
                sub.completedDate ? sub.completedDate : sub.loadDate
              ).format('YYYY-MM-DD')}`,
              //end:moment(sub.scheduleDate).format("YYYY-MM-DD"),
              color: sub.items == undefined ? 'blue' : 'gold',
            };
            this.calanderArray.push(eventObject);
          }
        }
      }
      console.log(this.calanderArray);
    });
    setTimeout(() => {
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        dateClick: function () {},
        events: this.calanderArray,
        contentHeight: '350px',
      };
    }, 500);
  }

  loadDate() {
    this.loading = true;
    this.schedulesService.getAllSchedules().subscribe((result) => {
      this.dateList = result;
      this.loading = true;
    });
  }
  selectDay(event) {
    this.loading = true;
    this.schedulesService.getAllSchedules().subscribe((result) => {
      event = result.scheduleNo;
      this.loading = true;
    });
  }

  getAllLoco() {
    let userRole = 'Chief Engineer';
    let userNic = '';
    const object = {
      userNic: userNic,
      userRole: userRole,
    };
    console.log(object);
    this.locomotiveService.getAllLocoAssigned(object).subscribe((res) => {
      this.locoArray = res;
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
    });
  }

  getAllSchedule() {
    this.scheduleService.getAllSchedules().subscribe((resp) => {
      this.scheduleList = resp;
      const _filterFullComplete = this.scheduleList.filter(
        (p) => p.scheduleStatus == 7
      );
      this.countSchedules = _filterFullComplete.length;

      const _filterCompleted = this.scheduleList.filter(
        (p) => p.scheduleStatus == 6
      );
      this.completedSchedules = _filterCompleted.length;
      //
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
      this.totalCompletd = this.countSchedules + this.completedSchedules;
      this.totalIncompletd = this.draftSchedules + this.halfSchedules;
    });
  }

  public getLoadTrial() {
    let userRole = 'Chief Engineer';
    let userNic = '';
    const object = {
      userNic: userNic,
      userRole: userRole,
    };
    this.loadService.getLoadTrialAssigned(object).subscribe((resp) => {
      this.loadArray = resp;

      const _filterDraftLoad = this.loadArray.filter((p) => p.status === 1);
      this.countDraftLoad = _filterDraftLoad.length;

      const _filterPasstLoad = this.loadArray.filter((p) => p.status === 2);
      this.countPassedtLoad = _filterPasstLoad.length;

      const _filterPendingtLoad = this.loadArray.filter((p) => p.status === 3);
      this.countPendingLoad = _filterPendingtLoad.length;
      this.incompleteLoad = this.countDraftLoad + this.countPendingLoad;
    });
  }

  private loadAllReport() {
    let userRole = 'Chief Engineer';
    let userNic = '';
    const object = {
      userNic: userNic,
      userRole: userRole,
    };
    this.locomotiveService.getAllMileage(object).subscribe((resp) => {
      this.mileageList = resp;
      const _filterAcceptMile = this.mileageList.filter((p) => p.status === 2);
      this.acceptedMileage = _filterAcceptMile.length;
      const _filterAssignedMile = this.mileageList.filter(
        (p) => p.status === 5
      );
      this.assignedMileage = _filterAssignedMile.length;
      const _filterDraftRejected = this.mileageList.filter(
        (p) => p.status === 1 || p.status === 3
      );
      this.draftRjectedMile = _filterDraftRejected.length;
    });
  }
}
