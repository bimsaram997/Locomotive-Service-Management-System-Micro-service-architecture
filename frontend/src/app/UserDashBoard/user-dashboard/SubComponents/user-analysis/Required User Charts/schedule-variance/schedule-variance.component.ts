import { ScheduleService } from 'src/app/service/schedule.service';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-schedule-variance',
  templateUrl: './schedule-variance.component.html',
  styleUrls: ['./schedule-variance.component.css'],
})
export class ScheduleVarianceComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    // scales: {
    //   yAxes: [
    //     {
    //       ticks: {
    //         max: 1,
    //         min: 0,
    //       },
    //     },
    //   ],
    // },
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
      data: [0, 0, 0, 0, 56, 55, 40, 20, 60, 20, 30, 45, 56],
      label: 'Series A',
    },
    {
      data: [28, 48, 40, 19, 86, 27, 90, 65, 59, 80, 81, 56, 55],
      label: 'Series B',
    },
    // {
    //   data: [28, 48, 40, 19, 86, 27, 90, 65, 59, 80, 81, 56, 55],
    //   label: 'Series B',
    // },
  ];
  scheduleList: any;
  isShow: boolean;
  constructor(private scheduleService: ScheduleService) {}

  ngOnInit(): void {
    this.getAllAssignedSchedule();
  }

  getAllAssignedSchedule(): void {
    const values = JSON.parse(localStorage.getItem('currentUser'));
    const object = {
      userNic: values.userNic,
      userRole: values.userRole,
    };
    this.scheduleService.getAllScheduleAssigned(object).subscribe((resp) => {
      if (resp.length > 0) {
        this.scheduleList = resp;
        this.setDataOnChart(this.scheduleList);
        this.isShow = true;
      }
    });
  }

  setDataOnChart(scheduleList): void {
    this.barChartData[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.barChartData[1].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    //completeSchedule
    var schs = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const _scheduleArray = this.scheduleList;
    const _filterSch = _scheduleArray.filter((p) => p.scheduleProgress == 100);
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
      label: 'Completed',
      backgroundColor: '#7befb2',
    };
    this.barChartData[0] = Sch;
    //incomplete Schedules
    var inSch = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const _inCompleteScheduleArray = this.scheduleList;
    const _inComSch = _inCompleteScheduleArray.filter(
      (p) => p.scheduleProgress != 100
    );
    if (_inComSch.length > 0) {
      x;
      var _yearCount = 12;
      for (var x = 0; x <= _yearCount; x++) {
        const GetVal = _inComSch.filter(
          (c) => new Date(c.scheduleDate).getMonth() == x
        );
        if (GetVal.length > 0) {
          inSch[x] = GetVal.length;
        }
      }
    }
    let inSchedules = {
      data: inSch ? inSch : null,
      label: 'InCompleted',
      backgroundColor: '#52b3d9',
    };
    this.barChartData[1] = inSchedules;
  }
}
