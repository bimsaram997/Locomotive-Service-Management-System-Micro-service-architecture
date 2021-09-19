import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-commnets-doh-nut',
  templateUrl: './commnets-doh-nut.component.html',
  styleUrls: ['./commnets-doh-nut.component.css'],
})
export class CommnetsDohNutComponent implements OnInit {
  public doughnutChartLabels = [
    'Viewed & more actions are required',
    'Viewed & Confirmed',
    'Resolved Comments',
  ];
  public doughnutChartData = [];
  public doughnutChartType = 'doughnut';
  @Input() countDoMoreComments: number;
  @Input() countConfirmedComments: number;
  @Input() countResolvedComments: number;
  st: number = 4;
  constructor() {}

  ngOnInit(): void {
    this.doughnutChartData = [
      this?.countDoMoreComments,
      this?.countConfirmedComments,
      this?.countResolvedComments,
    ];
  }
}
