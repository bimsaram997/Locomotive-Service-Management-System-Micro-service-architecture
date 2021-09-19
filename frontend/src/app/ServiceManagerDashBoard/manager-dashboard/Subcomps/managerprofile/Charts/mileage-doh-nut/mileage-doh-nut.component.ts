import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mileage-doh-nut',
  templateUrl: './mileage-doh-nut.component.html',
  styleUrls: ['./mileage-doh-nut.component.css'],
})
export class MileageDohNutComponent implements OnInit {
  @Input() draftMileage: number;
  @Input() acceptMileage: number;
  @Input() assignedMileage: number;
  @Input() rejectMileage: number;
  public doughnutChartLabels = ['Draft', 'Accept', 'Assigned', 'Rejected'];
  public doughnutChartData = [120, 150, 180, 90];
  public doughnutChartType = 'doughnut';
  constructor() {}

  ngOnInit(): void {
    console.log(this.draftMileage);
    this.doughnutChartData = [
      this?.draftMileage,
      this?.acceptMileage,
      this?.assignedMileage,
      this?.rejectMileage,
    ];
  }
}
