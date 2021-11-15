import { LocomotiveService } from './../../../../../../service/locomotive.service';
import { Component, Input, OnInit } from '@angular/core';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-locomotive-doh-nut',
  templateUrl: './locomotive-doh-nut.component.html',
  styleUrls: ['./locomotive-doh-nut.component.css'],
})
export class LocomotiveDohNutComponent implements OnInit {
  locoList: any[] = [];
  statusTwo: number;
  @Input() countOperateLoco: number;
  @Input() countServiceLoco: number;
  @Input() countLoadLoco: number;

  constructor() {}

  public doughnutChartLabels = ['Operating', 'In Schedules', 'In Load Trials'];
  public doughnutChartData = [];
  public doughnutChartType = 'pie';

  ngOnInit(): void {
    console.log(this.countLoadLoco + ' dd');

    this.doughnutChartData = [
      this?.countOperateLoco,
      this?.countServiceLoco,
      this?.countLoadLoco,
    ];
  }
}
