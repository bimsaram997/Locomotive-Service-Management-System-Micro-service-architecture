import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-commnets-doh-nut',
  templateUrl: './commnets-doh-nut.component.html',
  styleUrls: ['./commnets-doh-nut.component.css']
})
export class CommnetsDohNutComponent implements OnInit {
public doughnutChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
  public doughnutChartData = [120, 150, 180, 90];
  public doughnutChartType = 'doughnut';

  st:number=4
  constructor() { }

  ngOnInit(): void {
  }

}
