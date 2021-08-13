import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule-pie',
  templateUrl: './schedule-pie.component.html',
  styleUrls: ['./schedule-pie.component.css']
})
export class SchedulePieComponent implements OnInit {

  constructor() { }
  public pieChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
  public pieChartData = [120, 150, 180, 90];
  public pieChartType = 'pie';
  ngOnInit(): void {
  }

}
