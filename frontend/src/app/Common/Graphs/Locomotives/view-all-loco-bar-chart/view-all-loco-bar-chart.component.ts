import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-all-loco-bar-chart',
  templateUrl: './view-all-loco-bar-chart.component.html',
  styleUrls: ['./view-all-loco-bar-chart.component.css']
})
export class ViewAllLocoBarChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40,20,60, 20, 30,45, 56], label: 'Series A' },
    {data: [28, 48, 40, 19, 86, 27, 90,65, 59, 80, 81, 56, 55], label: 'Series B'},
     {data: [28, 48, 40, 19, 86, 27, 90,65, 59, 80, 81, 56, 55], label: 'Series '},
     {data: [65, 59, 80, 81, 56, 55, 40,20,60, 20, 30,45, 56], label: 'Series C', backgroundColor:'#7befb2'},
  ];
  public backgroundColor:[
    {Color: ['#ff6384']}
  ]
}
