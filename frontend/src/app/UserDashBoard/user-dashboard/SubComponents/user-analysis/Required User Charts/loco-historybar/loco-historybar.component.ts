import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { LocomotiveService } from 'src/app/service/locomotive.service';
import { Component, OnInit } from '@angular/core';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-loco-historybar',
  templateUrl: './loco-historybar.component.html',
  styleUrls: ['./loco-historybar.component.css'],
})
export class LocoHistorybarComponent implements OnInit {
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
  options: {};
  locoArray: any;
  countOperateLoco: any;
  countServiceLoco: any;

  constructor(private locomotiveService: LocomotiveService) {}

  ngOnInit(): void {
    this.getAllLoco();
  }

  getAllLoco() {
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
          label: 'Available',
          backgroundColor: '#7befb2',
        };
        this.barChartData[0] = _availableLocoData;

        //unavailable lcomotives

        var unLoco = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const _unAvailableLoco = _locomotiveArray.filter(
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
          label: 'Unavailable',
          backgroundColor: '#52b3d9',
        };
        this.barChartData[1] = _unAvailableLocoData;
      });
  }
}
