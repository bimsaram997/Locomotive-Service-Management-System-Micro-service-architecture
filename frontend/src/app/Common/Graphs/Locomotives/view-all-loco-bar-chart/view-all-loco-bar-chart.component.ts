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

  public barChartLabels: any[] = [];
  public barChartType: any = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Memberships' },
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Items' },
  ];

  // public barChartLabels = [
  //   'Jan',
  //   'Feb',
  //   'Mar',
  //   'Apr',
  //   'May',
  //   'Jun',
  //   'Jul',
  //   'Aug',
  //   'Sep',
  //   'Oct',
  //   'Nov',
  //   'Dec',
  // ];
  // public barChartType = 'bar';
  // public barChartLegend = true;
  // public barChartData = [
  //   {
  //     data: [65, 59, 80, 81, 56, 55, 40, 20, 60, 20, 30, 45, 56],
  //     label: 'Series A',
  //   },
  //   {
  //     data: [28, 48, 40, 19, 86, 27, 90, 65, 59, 80, 81, 56, 55],
  //     label: 'Series B',
  //   },
  //   {
  //     data: [28, 48, 40, 19, 86, 27, 90, 65, 59, 80, 81, 56, 55],
  //     label: 'Series ',
  //   },
  //   {
  //     data: [65, 59, 80, 81, 56, 55, 40, 20, 60, 20, 30, 45, 56],
  //     label: 'Series C',
  //     backgroundColor: '#7befb2',
  //   },
  // ];
  isshowData = false;
  ngOnInit(): void {
    this.loadAllData();
    return;
    // this.loadAllSchedule();
    // this.getAllLoco();
    // this.getLoadTrial();
    // console.log(this.availableLoco);
    //console.log(this.inCompleteSchedules)
    // console.log(this.available);
  }
  loadAllData() {
    //loadAllData;
    this.barChartData[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.barChartData[1].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    this.barChartData = this.childePassData[0];
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
}
