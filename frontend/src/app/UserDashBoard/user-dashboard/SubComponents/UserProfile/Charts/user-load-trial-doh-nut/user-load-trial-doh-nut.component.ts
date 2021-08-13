import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-load-trial-doh-nut',
  templateUrl: './user-load-trial-doh-nut.component.html',
  styleUrls: ['./user-load-trial-doh-nut.component.css']
})
export class UserLoadTrialDohNutComponent implements OnInit {

  constructor() { }
  public pieChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
  public pieChartData = [120, 150, 180, 90];
  public pieChartType = 'pie';
  ngOnInit(): void {
  }

}
