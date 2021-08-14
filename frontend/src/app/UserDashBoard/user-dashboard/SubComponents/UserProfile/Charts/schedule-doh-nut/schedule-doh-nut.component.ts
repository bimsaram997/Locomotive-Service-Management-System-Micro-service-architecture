import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule-doh-nut',
  templateUrl: './schedule-doh-nut.component.html',
  styleUrls: ['./schedule-doh-nut.component.css']
})
export class ScheduleDohNutComponent implements OnInit {

  public doughnutChartLabels = ['Fully Completed', 'Very Close to complete', '(3/4)', 'half is completed', 'Just Started'];
  public doughnutChartData = [120, 150, 70, 90, 110];
  public doughnutChartType = 'doughnut';
  constructor() { }

  ngOnInit(): void {
  }

}
