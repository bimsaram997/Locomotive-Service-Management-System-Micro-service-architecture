import { LocomotiveService } from 'src/app/service/locomotive.service';
import { ScheduleService } from 'src/app/service/schedule.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-perfomance-bar-chart',
  templateUrl: './user-perfomance-bar-chart.component.html',
  styleUrls: ['./user-perfomance-bar-chart.component.css'],
})
export class USerPerfomanceBarChartComponent implements OnInit {
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  public lineChartLabels = [
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
  public lineChartType = 'line';
  public lineChartLegend = true;
  public lineChartData = [
    {
      data: [0, 0, 0, 0, 56, 55, 40, 20, 60, 20, 30, 45, 56],
      label: 'Series A',
    },
  ];
  scheduleList: any;
  newVal: any;
  newVal2: any;
  constructor(
    private scheduleService: ScheduleService,
    private locomotiveService: LocomotiveService
  ) {}

  ngOnInit(): void {
    this.myLogic();
  }

  myLogic(): void {
    this.lineChartData[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const values = JSON.parse(localStorage.getItem('currentUser'));
    const object = {
      userNic: values.userNic,
      userRole: values.userRole,
    };
    console.log(object);
    this.scheduleService.getAllScheduleAssigned(object).subscribe((resp) => {
      this.scheduleList = resp;
      var schs = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const _FilterData = this.scheduleList.filter(
        (p) => p.scheduleStatus == 7 || p.scheduleStatus == 8
      );
      var ShcCount = 0;
      if (_FilterData.length > 0) {
        this.newVal = _FilterData.filter((p) => p.actualCompletedDate != null);
        console.log(this.newVal);
      }
      if (this.newVal.length > 0) {
        this.newVal2 = this.newVal.filter(
          (p) =>
            new Date(p.actualCompletedDate).getTime() <
            new Date(p.completedDate).getTime()
        );
        console.log(this.newVal2);
        if (this.newVal2.length > 0) {
          var _yearCount = 12;
          for (var x = 0; x <= _yearCount; x++) {
            const GetVal = this.newVal2.filter(
              (c) => new Date(c.scheduleDate).getMonth() == x
            );
            if (GetVal.length > 0) {
              schs[x] = (GetVal.length / this.newVal2.length) * 100;
            }
          }
        }
        const _availableLocoData = {
          data: schs ? schs : null,
          label: 'Performance',
          backgroundColor: '#ffff7e',
        };
        this.lineChartData[0] = _availableLocoData;
      }
    });
  }
}
