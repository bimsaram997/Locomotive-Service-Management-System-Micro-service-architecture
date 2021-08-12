import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-load-trial-doh-nut',
  templateUrl: './load-trial-doh-nut.component.html',
  styleUrls: ['./load-trial-doh-nut.component.css']
})
export class LoadTrialDohNutComponent implements OnInit {

  public doughnutChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
  public doughnutChartData = [120, 150, 180, 90];
  public doughnutChartType = 'doughnut';

  constructor() { }

  ngOnInit(): void {
  }

}
