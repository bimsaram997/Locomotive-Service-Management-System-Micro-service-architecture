import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-locomotive-doh-nut',
  templateUrl: './locomotive-doh-nut.component.html',
  styleUrls: ['./locomotive-doh-nut.component.css']
})
export class LocomotiveDohNutComponent implements OnInit {
public doughnutChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
  public doughnutChartData = [120, 150, 180, 90];
  public doughnutChartType = 'doughnut';
  constructor() { }

  ngOnInit(): void {
  }

}
