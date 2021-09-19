import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-load-trial-doh-nut',
  templateUrl: './load-trial-doh-nut.component.html',
  styleUrls: ['./load-trial-doh-nut.component.css'],
})
export class LoadTrialDohNutComponent implements OnInit {
  @Input() countDraftLoad: number;
  @Input() countPassedtLoad: number;
  @Input() countPendingLoad: number;
  public doughnutChartLabels = [
    'Draft',
    'Passed & Accepted',
    'Pending for more actions',
  ];
  public doughnutChartData = [];
  public doughnutChartType = 'pie';

  constructor() {}

  ngOnInit(): void {
    this.doughnutChartData = [
      this?.countDraftLoad,
      this?.countPassedtLoad,
      this?.countPendingLoad,
    ];
  }
}
