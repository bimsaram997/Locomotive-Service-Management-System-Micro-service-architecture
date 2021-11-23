import { Label } from 'ng2-charts';
import { ScheduleService } from 'src/app/service/schedule.service';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-next-schedule-variance',
  templateUrl: './next-schedule-variance.component.html',
  styleUrls: ['./next-schedule-variance.component.css'],
})
export class NextScheduleVarianceComponent implements OnInit {
  nxtScheduleList: any;
  isShow: boolean;

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
      data: [0, 0, 0, 0, 56, 55, 40, 20, 60, 20, 30, 45, 56],
      label: 'Series A',
    },
    {
      data: [28, 48, 40, 19, 86, 27, 90, 65, 59, 80, 81, 56, 55],
      label: 'Series B',
    },
  ];
  constructor(private scheduleService: ScheduleService) {}

  ngOnInit(): void {
    this.getAllNextSchedulesNotFilter();
  }

  getAllNextSchedulesNotFilter() {
    this.scheduleService.getNextAllSchedules().subscribe((res) => {
      if (res.length > 0) {
        this.nxtScheduleList = res;
        this.setDataOnChart();
        this.isShow = true;
      }
    });
  }

  setDataOnChart() {
    this.barChartData[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.barChartData[1].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    //Draft
    var draft = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const _draftArray = this.nxtScheduleList;
    const _filterDraft = _draftArray.filter((p) => p.nxtSchStatus == 0);
    if (_filterDraft.length > 0) {
      x;
      var _yearCount = 12;
      for (var x = 0; x <= _yearCount; x++) {
        const GetVal = _filterDraft.filter(
          (c) => new Date(c.date).getMonth() == x
        );
        if (GetVal.length > 0) {
          draft[x] = GetVal.length;
        }
      }
    }
    let Draft = {
      data: draft ? draft : null,
      label: 'Draft',
      backgroundColor: '#89c4f4',
    };
    this.barChartData[0] = Draft;

    //Accepeted
    var accept = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const _acceptArray = this.nxtScheduleList;
    const _filterAccept = _acceptArray.filter((p) => p.nxtSchStatus == 1);
    if (_filterAccept.length > 0) {
      x;
      var _yearCount = 12;
      for (var x = 0; x <= _yearCount; x++) {
        const GetVal = _filterAccept.filter(
          (c) => new Date(c.date).getMonth() == x
        );
        if (GetVal.length > 0) {
          accept[x] = GetVal.length;
        }
      }
    }
    let Accept = {
      data: accept ? accept : null,
      label: 'Assigned',
      backgroundColor: '#f1828d',
    };
    this.barChartData[1] = Accept;
  }
}
