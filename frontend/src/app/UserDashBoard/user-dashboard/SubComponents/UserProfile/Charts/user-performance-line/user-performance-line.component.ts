import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-user-performance-line',
  templateUrl: './user-performance-line.component.html',
  styleUrls: ['./user-performance-line.component.css'],
})
export class UserPerformanceLineComponent implements OnInit {
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  public lineChartLabels = [
    '2000',
    '2001',
    '2002',
    '2003',
    '2004',
    '2005',
    '2006',
  ];
  public lineChartType = 'line';
  public lineChartLegend = true;
  public lineChartData = [
    { data: [75, 49, 89, 31, 86, 35, 50], label: 'Series A' },
  ];
  constructor() {}

  ngOnInit(): void {}
}
