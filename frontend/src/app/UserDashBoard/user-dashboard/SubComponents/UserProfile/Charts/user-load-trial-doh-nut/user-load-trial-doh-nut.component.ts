import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-load-trial-doh-nut',
  templateUrl: './user-load-trial-doh-nut.component.html',
  styleUrls: ['./user-load-trial-doh-nut.component.css']
})
export class UserLoadTrialDohNutComponent implements OnInit {

  constructor() { }
  public pieChartLabels = ['Draft', 'Passed', ];
  public pieChartData = [200,160];
  public pieChartType = 'pie';
  ngOnInit(): void {
  }

}
