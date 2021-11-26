import { Label } from 'ng2-charts';
import { first } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { LocomotiveService } from './../../../../service/locomotive.service';
import { LoadTrialService } from './../../../../service/load-trial.service';
import { ScheduleService } from './../../../../service/schedule.service';
import { AddFeedBacksComponent } from './../../../../UserDashBoard/user-dashboard/SubComponents/load-trail/view-load-trials/add-feed-backs/add-feed-backs.component';

import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import LocoScheduleDTO from 'src/app/dto/LocoScheduleDTO';

import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';

@Component({
  selector: 'app-manager-dash-content',
  templateUrl: './manager-dash-content.component.html',
  styleUrls: ['./manager-dash-content.component.css'],
})
export class ManagerDashContentComponent implements OnInit {
  dateList: LocoScheduleDTO[] = [];
  dateList1: LocoScheduleDTO[] = [];
  loading = false;
  showLocoChart = false;
  childePassData = [];

  CompletedNewSch: any;
  inCompletedNewSch: any;

  availableLoco: any[];
  inCompleteSchedules: any[];
  cont: Array<any>[] = [];
  currentDate = new Date();
  name: any;
  arr: any[];
  calanderArray: any[] = [];

  hello: string = 'hdhd';

  calendarOptions: CalendarOptions;

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
  SchLength: any;
  inSchLength: any;
  comLoadlength: any;
  inComLoadlength: any;
  locoArray: any;
  inLocoLength: any;
  outLocoLength: any;
  inLoco: any;
  outLoco: any;
  scheduleList: any;
  mileageList: any;
  acceptMileLength: any;
  rejectMileLength: any;
  assignedMileLength: any;
  constructor(
    private schedulesService: ScheduleService,
    private router: Router,
    public dialog: MatDialog,
    private loadTrialService: LoadTrialService,
    private scheduleService: ScheduleService,
    private locomotiveService: LocomotiveService
  ) {
    this.loadDate();
  }

  ngOnInit(): void {
    this.getAllLoco();
    this.loadAllSchedule();
    this.loadDefaultChartDat();
    this.loadAllReport();
    const values = JSON.parse(localStorage.getItem('currentUser'));
    this.name = values.userName;
    const value = JSON.parse(localStorage.getItem('currentUser'));
    const object = {
      userNic: value.userNic,
      userRole: value.userRole,
      type: 'calender',
    };

    this.schedulesService
      .getAllScheduleAssignedManager(object)
      .subscribe((res) => {
        console.log(res);
        if (res && res.length > 0) {
          for (const param of res) {
            for (const sub of param) {
              let eventObject = {
                title: `${
                  sub.loadNo == undefined ? sub.scheduleNo : sub.loadNo
                }`,
                id: sub._id,
                start: `${moment(
                  sub.completedDate ? sub.completedDate : sub.loadDate
                ).format('YYYY-MM-DD')}`,
                //end:moment(sub.scheduleDate).format("YYYY-MM-DD"),
                color: sub.items == undefined ? 'blue' : '#81cfe0 ',
              };
              this.calanderArray.push(eventObject);
            }
          }
        }
        this.showLocoChart = true;
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

  getAllLoco() {
    const values = JSON.parse(localStorage.getItem('currentUser'));
    const object = {
      userNic: values.userNic,
      userRole: values.userRole,
    };
    console.log(object);
    this.locomotiveService.getAllLocoAssigned(object).subscribe((res) => {
      const locoArray = res;
      const inLoco = locoArray.filter((p) => p.locoAvailability === 'In');
      this.inLocoLength = inLoco.length;

      const outLoco = locoArray.filter((p) => p.locoAvailability === 'Out');
      this.outLocoLength = outLoco.length;
    });

    // const outLoco = this.locoArray.filter((p) => p.locoAvailability === 'Out');
    // this.outLocoLength = outLoco.length;
  }

  public loadAllSchedule() {
    const values = JSON.parse(localStorage.getItem('currentUser'));
    const object = {
      userNic: values.userNic,
      userRole: values.userRole,
    };
    console.log(object);
    this.schedulesService.getAllScheduleAssigned(object).subscribe((resp) => {
      this.scheduleList = resp;

      const completSchedule = this.scheduleList.filter(
        (p) => p.scheduleStatus == 7
      );
      this.SchLength = completSchedule.length;

      const incompleteSchedule = this.scheduleList.filter(
        (p) => p.scheduleStatus != 7
      );
      this.inSchLength = incompleteSchedule.length;
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
      if (this.mileageList.length > 0) {
        const acceptMileage = this.mileageList.filter((p) => p.status === 2);
        this.acceptMileLength = acceptMileage.length;

        const rejectMileage = this.mileageList.filter((p) => p.status === 3);
        this.rejectMileLength = rejectMileage.length;

        const assignedMileage = this.mileageList.filter((p) => p.status === 5);
        this.assignedMileLength = assignedMileage.length;
      }
    });
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
        this.SchLength = _filterSch.length;
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
        this.inSchLength = _filterInComplete.length;
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
        this.comLoadlength = _completedLoad.length;
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
        this.inComLoadlength = _inCompletedLoad.length;
        this.barChartData[5] = _inCompletedLoadData;
      });
  }

  onDateClick(res) {
    alert('Clicked on date : ' + res._id);
  }
  // calendarOptions: CalendarOptions = {
  //   initialView: 'dayGridMonth',
  //   dateClick: this.handleDateClick.bind(this), // bind is important!
  //   events: this.calanderArray
  // };

  loadSchedules() {
    const dialogRef = this.dialog.open(AddFeedBacksComponent, {
      width: '250px',
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
}
