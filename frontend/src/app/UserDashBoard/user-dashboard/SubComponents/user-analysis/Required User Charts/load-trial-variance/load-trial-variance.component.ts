import { LoadTrialService } from 'src/app/service/load-trial.service';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-load-trial-variance',
  templateUrl: './load-trial-variance.component.html',
  styleUrls: ['./load-trial-variance.component.css'],
})
export class LoadTrialVarianceComponent implements OnInit {
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
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      label: 'Series A',
    },
    {
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      label: 'Series B',
    },
    // {
    //   data: [28, 48, 40, 19, 86, 27, 90, 65, 59, 80, 81, 56, 55],
    //   label: 'Series B',
    // },
  ];
  loadArray: any;
  isShow: boolean;

  constructor(private loadService: LoadTrialService) {}

  ngOnInit(): void {
    this.getLoadTrialAssigned();
  }

  getLoadTrialAssigned() {
    const values = JSON.parse(localStorage.getItem('currentUser'));
    const object = {
      userNic: values.userNic,
      userRole: values.userRole,
    };
    this.loadService.getLoadTrialAssigned(object).subscribe((resp) => {
      if (resp.length > 0) {
        this.loadArray = resp;
        this.setDataOnChart(this.loadArray);
        this.isShow = true;
      }
    });
  }

  setDataOnChart(loadArray): void {
    this.barChartData[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.barChartData[1].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    //acceptedLoadTrial
    var loadAc = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const _loadArray = this.loadArray;
    const _filterLoad = _loadArray.filter((p) => p.status == 2);
    if (_filterLoad.length > 0) {
      x;
      var _yearCount = 12;
      for (var x = 0; x <= _yearCount; x++) {
        const GetVal = _filterLoad.filter(
          (c) => new Date(c.loadDate).getMonth() == x
        );
        if (GetVal.length > 0) {
          loadAc[x] = GetVal.length;
        }
      }
    }
    let acceptedLoad = {
      data: loadAc ? loadAc : null,
      label: 'Accepted',
      backgroundColor: '#7befb2',
    };
    this.barChartData[0] = acceptedLoad;

    //rejectedLoad
    var loadRe = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const _loadArrayRejected = this.loadArray;
    const _filteRejLoad = _loadArrayRejected.filter((p) => p.status != 2);
    if (_filterLoad.length > 0) {
      x;
      var _yearCount = 12;
      for (var x = 0; x <= _yearCount; x++) {
        const GetVal = _filteRejLoad.filter(
          (c) => new Date(c.loadDate).getMonth() == x
        );
        if (GetVal.length > 0) {
          loadRe[x] = GetVal.length;
        }
      }
    }
    let rejectedLoad = {
      data: loadRe ? loadRe : null,
      label: 'inCompleted',
      backgroundColor: '#52b3d9 ',
    };
    this.barChartData[1] = rejectedLoad;
  }
}
