import { LocomotiveService } from './../../../../../../service/locomotive.service';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-mileage-variance',
  templateUrl: './mileage-variance.component.html',
  styleUrls: ['./mileage-variance.component.css'],
})
export class MileageVarianceComponent implements OnInit {
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
      data: [0, 0, 0, 0, 56, 55, 40, 20, 60, 20, 30, 45, 56],
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
    {
      data: [28, 48, 40, 19, 86, 27, 90, 65, 59, 80, 81, 56, 55],
      label: 'Series D',
    },
  ];
  isShow: boolean;
  mileageList: any;

  constructor(private locomotiveService: LocomotiveService) {}

  ngOnInit(): void {
    this.loadAllReport();
  }

  public loadAllReport() {
    const values = JSON.parse(localStorage.getItem('currentUser'));
    const object = {
      userNic: values.userNic,
      userRole: values.userRole,
    };
    this.locomotiveService.getAllMileage(object).subscribe((resp) => {
      if (resp.length > 0) {
        this.mileageList = resp;
        this.setDataOnChart();
        this.isShow = true;
      }
    });
  }

  setDataOnChart() {
    this.barChartData[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.barChartData[1].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.barChartData[2].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.barChartData[3].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    //Draft
    var draft = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const _draftArray = this.mileageList;
    const _filterDraft = _draftArray.filter((p) => p.status == 1);
    if (_filterDraft.length > 0) {
      x;
      var _yearCount = 12;
      for (var x = 0; x <= _yearCount; x++) {
        const GetVal = _filterDraft.filter(
          (c) => new Date(c.mileageDate).getMonth() == x
        );
        if (GetVal.length > 0) {
          draft[x] = GetVal.length;
        }
      }
    }
    let Draft = {
      data: draft ? draft : null,
      label: 'Draft',
      backgroundColor: '#f1828d',
    };
    this.barChartData[0] = Draft;

    //Accepeted
    var accept = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const _acceptArray = this.mileageList;
    const _filterAccept = _acceptArray.filter((p) => p.status == 2);
    if (_filterAccept.length > 0) {
      x;
      var _yearCount = 12;
      for (var x = 0; x <= _yearCount; x++) {
        const GetVal = _filterAccept.filter(
          (c) => new Date(c.mileageDate).getMonth() == x
        );
        if (GetVal.length > 0) {
          accept[x] = GetVal.length;
        }
      }
    }
    let Accept = {
      data: accept ? accept : null,
      label: 'Accept',
      backgroundColor: '#89c4f4',
    };
    this.barChartData[1] = Accept;

    //reject
    var reject = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const _rejectArray = this.mileageList;
    const _filterReject = _rejectArray.filter((p) => p.status == 3);
    if (_filterReject.length > 0) {
      x;
      var _yearCount = 12;
      for (var x = 0; x <= _yearCount; x++) {
        const GetVal = _filterReject.filter(
          (c) => new Date(c.mileageDate).getMonth() == x
        );
        if (GetVal.length > 0) {
          reject[x] = GetVal.length;
        }
      }
    }
    let Reject = {
      data: reject ? reject : null,
      label: 'Reject',
      backgroundColor: '#7befb2',
    };
    this.barChartData[2] = Reject;

    //Assigned

    var assigned = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const _assignedArray = this.mileageList;
    const _filterAssigned = _assignedArray.filter((p) => p.status == 5);
    if (_filterAssigned.length > 0) {
      x;
      var _yearCount = 12;
      for (var x = 0; x <= _yearCount; x++) {
        const GetVal = _filterAssigned.filter(
          (c) => new Date(c.mileageDate).getMonth() == x
        );
        if (GetVal.length > 0) {
          assigned[x] = GetVal.length;
        }
      }
    }
    let Assigned = {
      data: assigned ? assigned : null,
      label: 'Assigned',
      backgroundColor: '#ffec8b',
    };
    this.barChartData[3] = Assigned;
  }
}
