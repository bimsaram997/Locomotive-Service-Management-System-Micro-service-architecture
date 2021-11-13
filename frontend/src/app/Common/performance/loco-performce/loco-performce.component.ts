import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-loco-performce',
  templateUrl: './loco-performce.component.html',
  styleUrls: ['./loco-performce.component.css'],
})
export class LocoPerformceComponent implements OnInit {
  val: any;

  title = 'googlechart';
  type = 'Gauge';

  //columnNames = ['Name', 'Percentage'];
  options: {
    width: 1600;
    height: 480;
    redFrom: 80;
    redTo: 100;
    redColor: 'rgba(198, 0, 0, 0.67)';
    yellowFrom: 45;
    yellowTo: 90;
    yellowColor: 'rgba(219, 190, 0, 0.67)';
    greenFrom: 25;
    greenTo: 45;
    minorTicks: 5;
  };
  width = 500;
  height = 300;
  data = [[' ', { v: 0, f: 100 + '%' }]];
  performnceValue: any;
  performanceName: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public newData: any,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.val = this.newData.heading;
    this.performnceValue = this.newData.performanceNumber;
    this.performanceName = this.newData.performanceName;
    this.data = [
      [
        this.performanceName,
        {
          v: this.performnceValue,
          f: (Math.round(this.performnceValue) / 100) * 100 + '%',
        },
      ],
    ];
  }
}
