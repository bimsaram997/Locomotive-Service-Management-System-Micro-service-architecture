import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-next-schedule-pie',
  templateUrl: './next-schedule-pie.component.html',
  styleUrls: ['./next-schedule-pie.component.css'],
})
export class NextSchedulePieComponent implements OnInit {
  @Input() countDraftNext: number;
  @Input() countAssignedNext: number;

  public pieChartLabels = ['Draft', 'Assigned to Schedules'];
  public pieChartData = [];
  public chartColors: any[] = [
    {
      backgroundColor: ['#89c4f4 ', '#7befb2'],
    },
  ];
  public pieChartType = 'pie';
  isShow: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.pieChartData = [this?.countDraftNext, this?.countAssignedNext];
  }
}
