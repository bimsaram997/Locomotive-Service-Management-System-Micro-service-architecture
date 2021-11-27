import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment-pie-chart',
  templateUrl: './comment-pie-chart.component.html',
  styleUrls: ['./comment-pie-chart.component.css'],
})
export class CommentPieChartComponent implements OnInit {
  @Input() resolvedActionsComments: number;
  @Input() doMoreActionsComments: number;
  @Input() acceptedComments: number;
  constructor() {}
  public doughnutChartLabels = [
    'Resolved',
    'Do Actions',
    'Confirmed Load Trial',
  ];
  public doughnutChartData = [];
  public doughnutChartType = 'pie';

  ngOnInit(): void {
    this.doughnutChartData = [
      this?.resolvedActionsComments,
      this?.doMoreActionsComments,
      this?.acceptedComments,
    ];
  }
}
