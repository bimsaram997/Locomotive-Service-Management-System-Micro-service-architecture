import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { forkJoin } from 'rxjs';
import { first } from 'rxjs/operators';
import { LoadTrialService } from 'src/app/service/load-trial.service';
import { LocomotiveService } from 'src/app/service/locomotive.service';
import { ScheduleService } from 'src/app/service/schedule.service';
@Component({
  selector: 'app-chart-view',
  templateUrl: './chart-view.component.html',
  styleUrls: ['./chart-view.component.css'],
})
export class ChartViewComponent implements OnInit {
  @Output() valueChange = new EventEmitter();
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    {
      data: [65, 59, 80, 81, 56, 55, 40, 20, 60, 20, 30, 45, 56],
      label: 'Series A',
    },
    {
      data: [28, 48, 40, 19, 86, 27, 90, 65, 59, 80, 81, 56, 55],
      label: 'Series B',
    },
    {
      data: [28, 48, 40, 19, 86, 27, 90, 65, 59, 80, 81, 56, 55],
      label: 'Series C',
    },
    // {
    //   data: [28, 48, 40, 19, 86, 27, 90, 65, 59, 80, 81, 56, 55],
    //   label: 'Series B',
    // },
  ];
  isChecked: boolean;
  constructor(
    private scheduleService: ScheduleService,
    private locomotiveService: LocomotiveService,
    private loadTrialService: LoadTrialService
  ) {}

  ngOnInit(): void {
    this.loadDefaultChartDat();
  }
  loadDefaultChartDat() {
    //loadAllData;
    this.barChartData[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.barChartData[1].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.barChartData[2].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const values = JSON.parse(localStorage.getItem('currentUser'));
    const object = {
      userNic: values.userNic,
      userRole: values.userRole,
    };
    const _allSch = this.scheduleService.getAllSchedules();
    const _getLoco = this.locomotiveService.getAllLocoAssigned(object);
    const _getLoadTrail = this.loadTrialService.getLoadTrialAssigned(object);

    forkJoin([_allSch, _getLoco, _getLoadTrail])
      .pipe(first())
      .subscribe((res) => {
        var schs = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var barchartArray = [];
        var availableLocoArray = [];
        //locomotive

        // //All schedule
        const _scheduleArray = res[0];
        const _filterSch = _scheduleArray.filter((p) => p.scheduleStatus == 7);
        if (_filterSch.length > 0) {
          x;
          var _yearCount = 12;
          for (var x = 0; x <= _yearCount; x++) {
            const GetVal = _filterSch.filter(
              (c) => new Date(c.scheduleDate).getMonth() == x
            );
            if (GetVal.length > 0) {
              schs[x] = GetVal.length;
            }
          }
        }
        let Sch = {
          data: schs ? schs : null,
          label: 'Completed Schedules',
          borderColor: 'rgb(255, 99, 132)',
        };
        this.barChartData[0] = Sch;
        //   barchartArray.push(Sch);
        var inSchs = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        //icomplete scheudle
        const _filterInComplete = _scheduleArray.filter(
          (p) => p.scheduleStatus != 7
        );
        if (_filterInComplete.length > 0) {
          var _yearCount = 12;
          for (var x = 0; x <= _yearCount; x++) {
            const GetVal = _filterInComplete.filter(
              (c) => new Date(c.scheduleDate).getMonth() == x
            );
            if (GetVal.length > 0) {
              inSchs[x] = GetVal.length;
            }
          }
        }
        let inComplete = {
          data: inSchs ? inSchs : null,
          label: 'InCompleted Schedules',
          backgroundColor: '#7befb2',
        };
        this.barChartData[1] = inComplete;

        const _locomotiveArray = res[1];
        var loco = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const _availableLoco = _locomotiveArray.filter(
          (p) => p.locoStatus === 0
        );
        if (_availableLoco.length > 0) {
          var _yearCount = 12;
          for (var x = 0; x <= _yearCount; x++) {
            const GetVal = _availableLoco.filter(
              (c) => new Date(c.locoDate).getMonth() == x
            );
            if (GetVal.length > 0) {
              loco[x] = GetVal.length;
            }
          }
        }
        const _availableLocoData = {
          data: loco ? loco : null,
          label: 'Available Locomotives',
        };
        this.barChartData[2] = _availableLocoData;
        if (this.barChartData[0] !=undefined && this.barChartData[1] !=undefined && this.barChartData[1] !=undefined){
          this.valueChanged(true);
          this.isChecked = true
        }
      });
  }

  valueChanged(val: boolean) {
    // You can give any function name


    this.valueChange.emit(val);
  }
}
