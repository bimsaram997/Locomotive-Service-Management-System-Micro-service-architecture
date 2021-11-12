import { first } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { LoadTrialService } from './../../../../service/load-trial.service';
import { LocomotiveService } from './../../../../service/locomotive.service';
import { ScheduleService } from './../../../../service/schedule.service';
import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-view-all-loco-bar-chart',
  templateUrl: './view-all-loco-bar-chart.component.html',
  styleUrls: ['./view-all-loco-bar-chart.component.css'],
})
export class ViewAllLocoBarChartComponent implements OnInit {
  locoArray: any[] = [];
  @Input() childePassData: any[];
  @Input() inCompleteSchedules: any;

  @Input() availableLoco: any;
  @Input() hello: string;
  userNic: any;
  userRole: any;
  scheduleList: any;
  loadArray: any;

  startDate = moment().startOf('month').format('YYYY-MM-DD');
  endDate = moment().endOf('month').format('YYYY-MM-DD');

  //New Entered Value
  @Input() CompletedNewSch: any;
  @Input() inCompletedNewSch: any;
  @Input() availbleNewLoco: any;
  @Input() unavailbleNewLoco: any;

  constructor(
    private scheduleService: ScheduleService,
    private locomotiveService: LocomotiveService,
    private loadTrialService: LoadTrialService
  ) {}

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };

  // public barChartLabels: any[] = [];
  // public barChartType: any = 'bar';
  // public barChartLegend = true;
  // public barChartPlugins = [];

  // public barChartData: ChartDataSets[] = [
  //   { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Memberships' },
  //   { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Items' },
  // ];

  public barChartLabels = [
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
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
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
      label: 'Series ',
    },
    {
      data: [65, 59, 80, 81, 56, 55, 40, 20, 60, 20, 30, 45, 56],
      label: 'Series C',
      backgroundColor: '#7befb2',
    },
  ];
  isshowData = false;
  ngOnInit(): void {
    this.loadAllData();
    this.showChartData(); // load the chart data in dashboad
  }
  loadAllData() {
    //loadAllData;
    this.barChartData[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.barChartData[1].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.barChartData[2].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.barChartData[3].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    this.barChartData[0] = this.CompletedNewSch;
    this.barChartData[1] = this.inCompletedNewSch;
    this.isshowData = true;
  }
  // public barChartOptions = {
  //   scaleShowVerticalLines: false,
  //   responsive: true,
  // };

  //   {data: [0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0], label: 'Incomplete Schedules' },
  // {data:  [0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0], label: 'Complete Schedules'},
  //  {data:  [0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0], label: 'Locomotives'},
  //  {data:  [0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0], label: 'Load Trials', backgroundColor:'#7befb2'},

  public backgroundColor: [{ Color: ['#ff6384'] }];

  getAllLoco() {
    const values = JSON.parse(localStorage.getItem('currentUser'));
    this.userNic = values.userNic;
    this.userRole = values.userRole;
    const object = {
      userNic: values.userNic,
      userRole: values.userRole,
    };
    //console.log(object);
    this.locomotiveService.getAllLocoAssigned(object).subscribe((res) => {
      this.locoArray = res;
    });
  }

  loadAllSchedule() {
    this.scheduleService.getAllSchedules().subscribe((resp) => {
      this.scheduleList = resp;
      const _filterCompltShc = this.scheduleList.filter(
        (p) => p.scheduleStatus == 6
      );

      _filterCompltShc.forEach((sch, index) => {
        const _geMonth = moment(sch.scheduleDate).format('MM');
        console.log('Getmonth');
        //console.log(_geMonth)
      });
    });
  }

  getLoadTrial() {
    const values = JSON.parse(localStorage.getItem('currentUser'));
    const object = {
      userNic: values.userNic,
      userRole: values.userRole,
    };

    this.loadTrialService.getLoadTrialAssigned(object).subscribe((resp) => {
      this.loadArray = resp;
      //console.log(this.loadArray);
    });
  }

  showChartData() {
    const values = JSON.parse(localStorage.getItem('currentUser'));
    const object = {
      userNic: values.userNic,
      userRole: values.userRole,
    };
    const _allSch = this.scheduleService.getAllSchedules();
    const _getLoco = this.locomotiveService.getAllLocoAssigned(object);
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
          data: schs,
          label: 'Completed Schedules',
        };
        barchartArray.push(Sch);
        this.CompletedNewSch = Sch;
        console.log('Complete man');
        console.log(this.CompletedNewSch);
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
              schs[x] = GetVal.length;
            }
          }
        }
        let inComplete = {
          data: schs,
          label: 'InCompleted Schedules',
        };
        barchartArray.push(inComplete);
        this.inCompletedNewSch = inComplete;
        console.log('un Complete man');
        console.log(this.inCompletedNewSch);
        //  this.barChartData = barchartArray;
        this.isshowData = true;
        return;
        //available loco
        const _locomotiveArray = res[1];
        const _availableLoco = _locomotiveArray.filter(
          (p) => p.locoStatus === 0
        );
        if (_availableLoco.length > 0) {
          var _yearCount = 12;
          for (var x = 0; x <= _yearCount; x++) {
            const GetVal = _availableLoco.filter(
              (c) => new Date(c.locoDate).getMonth() == x
            );
            if (GetVal.length > 0) {
              schs[x] = GetVal.length;
            }
          }
        }
        const _availableLocoData = {
          data: schs,
          label: 'Available Locomotives',
        };
        //  barchartArray.push(_availableLocoData);
        this.availableLoco = barchartArray;
      });
  }
}
