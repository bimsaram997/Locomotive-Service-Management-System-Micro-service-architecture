import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-compos',
  templateUrl: './compos.component.html',
  styleUrls: ['./compos.component.css']
})
export class ComposComponent implements OnInit {
  public pieChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
  public pieChartData = [120, 150, 180, 90];
  public pieChartType = 'pie';
  constructor() { }

  ngOnInit(): void {
  }

}
