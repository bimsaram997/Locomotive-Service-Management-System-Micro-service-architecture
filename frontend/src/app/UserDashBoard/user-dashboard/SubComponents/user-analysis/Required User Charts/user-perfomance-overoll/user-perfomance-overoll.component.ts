import { ScheduleService } from 'src/app/service/schedule.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-perfomance-overoll',
  templateUrl: './user-perfomance-overoll.component.html',
  styleUrls: ['./user-perfomance-overoll.component.css'],
})
export class USerPerfomanceOverollComponent implements OnInit {
  scheduleList: any;
  finalScore: number;

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
  height = 180;
  data = [[' ', { v: 0, f: 100 + '%' }]];
  performanceName: string = 'hi';
  isShow: boolean;
  constructor(private scheduleService: ScheduleService) {}

  ngOnInit(): void {
    this.newLogic();
    this.data = [
      [
        this.performanceName,
        {
          v: this.finalScore,
          f: Math.round((this.finalScore / 100) * 100) + '%',
        },
      ],
    ];
  }

  newLogic() {
    const values = JSON.parse(localStorage.getItem('currentUser'));
    const object = {
      userNic: values.userNic,
      userRole: values.userRole,
    };
    console.log(object);
    this.scheduleService.getAllScheduleAssigned(object).subscribe((resp) => {
      this.scheduleList = resp;

      const _FilterData = this.scheduleList.filter(
        (p) => p.scheduleStatus == 7 || p.scheduleStatus == 8
      );
      var ShcCount = 0;
      if (_FilterData.length > 0) {
        _FilterData.forEach((result, index) => {
          if (result.actualCompletedDate != undefined) {
            if (
              new Date(result.actualCompletedDate).getTime() <
              new Date(result.completedDate).getTime()
            ) {
              ShcCount += 1;
            }
          }
        });
        this.finalScore = (ShcCount / _FilterData.length) * 100;
        this.isShow = true;
        this.data = [
          [
            this.performanceName,
            {
              v: this.finalScore,
              f: Math.round((this.finalScore / 100) * 100) + '%',
            },
          ],
        ];
      }
    });
  }
}
