import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-load-trial-doh-nut',
  templateUrl: './user-load-trial-doh-nut.component.html',
  styleUrls: ['./user-load-trial-doh-nut.component.css'],
})
export class UserLoadTrialDohNutComponent implements OnInit {
  @Input() countDraftLoad: number;
  @Input() countPassedtLoad: number;
  @Input() countPendingLoad: number;
  constructor() {}
  public pieChartLabels = [
    'Draft',
    'Passed & Accepted',
    'Pending for more actions',
  ];
  public pieChartData = [200, 160];
  public pieChartType = 'pie';
  ngOnInit(): void {
    this.pieChartData = [
      this?.countDraftLoad,
      this?.countPassedtLoad,
      this?.countPendingLoad,
    ];
  }
}
