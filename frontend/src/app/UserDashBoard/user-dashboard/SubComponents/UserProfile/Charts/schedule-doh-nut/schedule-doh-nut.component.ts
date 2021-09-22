import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule-doh-nut',
  templateUrl: './schedule-doh-nut.component.html',
  styleUrls: ['./schedule-doh-nut.component.css'],
})
export class ScheduleDohNutComponent implements OnInit {
  @Input() countSchedules: number;
  @Input() completedSchedules: number;
  @Input() draftSchedules: number;
  @Input() halfSchedules: number;
  val: number = 0;
  public pieChartLabels = [
    'Fully completed & passed',
    'Completed & not passed',
    'Draft',
    'Half Completed',
  ];
  public pieChartData = [];
  public pieChartType = 'pie';
  ngOnInit(): void {
    // You will get the @Input value
    this.val = this.countSchedules;
    console.log(this.halfSchedules + 'dsds');
    this.pieChartData = [
      this?.val,
      this?.completedSchedules,
      this?.draftSchedules,
      this?.halfSchedules,
    ];
  }
}
