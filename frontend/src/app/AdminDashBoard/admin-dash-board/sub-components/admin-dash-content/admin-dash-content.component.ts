import { first } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

import { Label } from 'ng2-charts';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { LocomotiveService } from './../../../../service/locomotive.service';
import { LoadTrialService } from './../../../../service/load-trial.service';
import { ScheduleService } from './../../../../service/schedule.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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

  @Output() valueChange = new EventEmitter();
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    {
      data: [65, 59, 80, 81, 56, 55, 40, 20, 60, 20, 30, 45, 56],
      label: 'Series A',
    },
    {
      data: [28, 48, 40, 19, 86, 27, 90, 65, 59, 80, 81, 56, 55],
      label: 'Series B',
    },
    {
      data: [28, 48, 40, 19, 86, 27, 90, 65, 59, 80, 81, 56, 55],
      label: 'Series C',
    },
    {
      data: [28, 48, 40, 19, 86, 27, 90, 65, 59, 80, 81, 56, 55],
      label: 'Series D',
    },
    {
      data: [28, 48, 40, 19, 86, 27, 90, 65, 59, 80, 81, 56, 55],
      label: 'Series E',
    },

    {
      data: [28, 48, 40, 19, 86, 27, 90, 65, 59, 80, 81, 56, 55],
      label: 'Series E',
    },
    // {
    //   data: [28, 48, 40, 19, 86, 27, 90, 65, 59, 80, 81, 56, 55],
    //   label: 'Series B',
    // },
  ];
  isChecked: boolean;

  constructor(
    private schedulesService: ScheduleService,
    private loadService: LoadTrialService,
    private scheduleService: ScheduleService,
    private locomotiveService: LocomotiveService,
    private loadTrialService: LoadTrialService
  ) {}

  ngOnInit(): void {
    this.loadDefaultChartDat();
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
              color: sub.items == undefined ? 'blue' : '#81cfe0',
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

  loadDefaultChartDat() {
    //loadAllData;
    this.barChartData[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.barChartData[1].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.barChartData[2].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.barChartData[3].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.barChartData[4].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.barChartData[5].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const values = JSON.parse(localStorage.getItem('currentUser'));
    const object = {
      userNic: values.userNic,
      userRole: values.userRole,
    };
    const _allSch = this.schedulesService.getAllSchedules();
    const _getLoco = this.locomotiveService.getAllLocoAssignedHistory(object);
    const _getLoadTrail = this.loadTrialService.getLoadTrialAssigned(object);

    forkJoin([_allSch, _getLoco, _getLoadTrail])
      .pipe(first())
      .subscribe((res) => {
        var schs = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var barchartArray = [];
        var availableLocoArray = [];
        //locomotive

        // //All schedule
        const _scheduleArray = res[0];
        const _filterSch = _scheduleArray.filter((p) => p.scheduleStatus == 7);
        if (_filterSch.length > 0) {
          x;
          var _yearCount = 12;
          for (var x = 0; x <= _yearCount; x++) {
            const GetVal = _filterSch.filter(
              (c) => new Date(c.scheduleDate).getMonth() == x
            );
            if (GetVal.length > 0) {
              schs[x] = GetVal.length;
            }
          }
        }
        let Sch = {
          data: schs ? schs : null,
          label: 'Completed Schedules',
          borderColor: '#6c7a89',
        };
        this.barChartData[0] = Sch;

        //   barchartArray.push(Sch);
        var inSchs = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        //icomplete scheudle
        const _filterInComplete = _scheduleArray.filter(
          (p) => p.scheduleStatus != 7
        );
        if (_filterInComplete.length > 0) {
          var _yearCount = 12;
          for (var x = 0; x <= _yearCount; x++) {
            const GetVal = _filterInComplete.filter(
              (c) => new Date(c.scheduleDate).getMonth() == x
            );
            if (GetVal.length > 0) {
              inSchs[x] = GetVal.length;
            }
          }
        }
        let inComplete = {
          data: inSchs ? inSchs : null,
          label: 'InCompleted Schedules',
          backgroundColor: '#fff68f',
        };

        this.barChartData[1] = inComplete;

        //loco history
        //In
        const _locomotiveArray = res[1];
        var loco = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const _availableLoco = _locomotiveArray.filter(
          (p) => p.locoAvailability === 'In'
        );
        if (_availableLoco.length > 0) {
          var _yearCount = 12;
          for (var x = 0; x <= _yearCount; x++) {
            const GetVal = _availableLoco.filter(
              (c) => new Date(c.locoDate).getMonth() == x
            );
            if (GetVal.length > 0) {
              loco[x] = GetVal.length;
            }
          }
        }
        const _availableLocoData = {
          data: loco ? loco : null,
          label: 'Locomotives In',
          backgroundColor: '#52b3d9',
        };
        this.barChartData[2] = _availableLocoData;

        //out
        const _locomotiveOutArray = res[1];
        var unLoco = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const _unAvailableLoco = _locomotiveOutArray.filter(
          (p) => p.locoAvailability === 'Out'
        );
        if (_unAvailableLoco.length > 0) {
          var _yearCount = 12;
          for (var x = 0; x <= _yearCount; x++) {
            const GetVal = _unAvailableLoco.filter(
              (c) => new Date(c.locoDate).getMonth() == x
            );
            if (GetVal.length > 0) {
              unLoco[x] = GetVal.length;
            }
          }
        }
        const _unAvailableLocoData = {
          data: unLoco ? unLoco : null,
          label: 'Locomotives Out',
          backgroundColor: '#7befb2',
        };
        this.barChartData[3] = _unAvailableLocoData;

        //load trials
        //completed
        const _LoadArray = res[2];
        var comLoad = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const _completedLoad = _LoadArray.filter((p) => p.status === 2);
        if (_completedLoad.length > 0) {
          var _yearCount = 12;
          for (var x = 0; x <= _yearCount; x++) {
            const GetVal = _completedLoad.filter(
              (c) => new Date(c.loadDate).getMonth() == x
            );
            if (GetVal.length > 0) {
              comLoad[x] = GetVal.length;
            }
          }
        }
        const _completedLoadData = {
          data: comLoad ? comLoad : null,
          label: 'Completed LoadTrials',
          backgroundColor: '#f1828d',
        };

        this.barChartData[4] = _completedLoadData;

        //inCompete
        //completed
        const _inCompleteLoadArray = res[2];
        var inComLoad = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const _inCompletedLoad = _inCompleteLoadArray.filter(
          (p) => p.status != 2
        );
        if (_inCompletedLoad.length > 0) {
          var _yearCount = 12;
          for (var x = 0; x <= _yearCount; x++) {
            const GetVal = _inCompletedLoad.filter(
              (c) => new Date(c.loadDate).getMonth() == x
            );
            if (GetVal.length > 0) {
              inComLoad[x] = GetVal.length;
            }
          }
        }
        const _inCompletedLoadData = {
          data: inComLoad ? inComLoad : null,
          label: 'InCompleted LoadTrials',
          backgroundColor: '#9f5afd',
        };

        this.barChartData[5] = _inCompletedLoadData;
      });
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
    this.loadTrialService.getLoadTrialAssigned(object).subscribe((resp) => {
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
