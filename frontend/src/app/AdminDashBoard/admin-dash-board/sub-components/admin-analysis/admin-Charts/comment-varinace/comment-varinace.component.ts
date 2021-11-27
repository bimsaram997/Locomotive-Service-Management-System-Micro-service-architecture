import { LoadTrialService } from 'src/app/service/load-trial.service';
import { Label } from 'ng2-charts';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment-varinace',
  templateUrl: './comment-varinace.component.html',
  styleUrls: ['./comment-varinace.component.css'],
})
export class CommentVarinaceComponent implements OnInit {
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
  isShow: boolean;
  public barChartData: ChartDataSets[] = [
    {
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      label: 'Series A',
    },
    {
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      label: 'Series B',
    },
    {
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      label: 'Series C',
    },
    // {
    //   data: [28, 48, 40, 19, 86, 27, 90, 65, 59, 80, 81, 56, 55],
    //   label: 'Series B',
    // },
  ];
  commentArray: any;

  constructor(private loadService: LoadTrialService) {}

  ngOnInit(): void {
    this.setDataOnChart();
  }

  public setDataOnChart() {
    this.barChartData[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.barChartData[1].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.loadService.getAllComments().subscribe((resp) => {
      if (resp.length > 0) {
        this.isShow = true;
        this.commentArray = resp;
      }

      var doMore = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const doMoreActionsComments = this.commentArray.filter(
        (p) => p.status === 3
      );

      if (doMoreActionsComments.length > 0) {
        x;
        var _yearCount = 12;
        for (var x = 0; x <= _yearCount; x++) {
          const GetVal = doMoreActionsComments.filter(
            (c) => new Date(c.comDate).getMonth() == x
          );
          if (GetVal.length > 0) {
            doMore[x] = GetVal.length;
          }
        }
      }
      let doMoreAction = {
        data: doMore ? doMore : null,
        label: 'Do Actions',
        backgroundColor: '#59abe3',
      };
      this.barChartData[0] = doMoreAction;

      //resolved
      var resolved = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const resolvedActionsComments = this.commentArray.filter(
        (p) => p.status === 4
      );

      if (resolvedActionsComments.length > 0) {
        x;
        var _yearCount = 12;
        for (var x = 0; x <= _yearCount; x++) {
          const GetVal = resolvedActionsComments.filter(
            (c) => new Date(c.comDate).getMonth() == x
          );
          if (GetVal.length > 0) {
            resolved[x] = GetVal.length;
          }
        }
      }
      let resolvedComments = {
        data: resolved ? resolved : null,
        label: 'Resolved',
        backgroundColor: '#f1828d',
      };
      this.barChartData[1] = resolvedComments;

      //Accepted
      var acceptedCom = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const accepted = this.commentArray.filter((p) => p.status === 2);

      if (accepted.length > 0) {
        x;
        var _yearCount = 12;
        for (var x = 0; x <= _yearCount; x++) {
          const GetVal = accepted.filter(
            (c) => new Date(c.comDate).getMonth() == x
          );
          if (GetVal.length > 0) {
            acceptedCom[x] = GetVal.length;
          }
        }
      }
      let Accepted = {
        data: acceptedCom ? acceptedCom : null,
        label: 'Confirmed Load Trial',
        backgroundColor: '#f3e16b',
      };
      this.barChartData[2] = Accepted;
    });
  }
}
