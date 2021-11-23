import { LocomotiveService } from '../../../../../../service/locomotive.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mileage-analysis',
  templateUrl: './mileage-analysis.component.html',
  styleUrls: ['./mileage-analysis.component.css'],
})
export class MileageAnalysisComponent implements OnInit {
  mileageList: any;
  @Input() countDraftMileage: number;
  @Input() countAcceptMileage: number;
  @Input() countRejectMileage: number;
  @Input() countAssignedMileage: number;

  public pieChartLabels = [
    'Draft',
    'Accepted',
    'Rejected',
    'Assigned to Schedules',
  ];
  public pieChartData = [];
  public chartColors: any[] = [
    {
      backgroundColor: ['#89c4f4 ', '#f1828d', '#ffec8b', '#7befb2'],
    },
  ];
  public pieChartType = 'pie';
  isShow: boolean = false;

  constructor(private locomotiveService: LocomotiveService) {}

  ngOnInit(): void {
    this.pieChartData = [
      this?.countDraftMileage,
      this?.countAcceptMileage,
      this?.countRejectMileage,
      this?.countAssignedMileage,
    ];
  }

  // public loadAllReport() {
  //   const values = JSON.parse(localStorage.getItem('currentUser'));
  //   const object = {
  //     userNic: values.userNic,
  //     userRole: values.userRole,
  //   };
  //   this.locomotiveService.getAllMileage(object).subscribe((resp) => {
  //     this.mileageList = resp;

  //     const _filterDraftMileage = this.mileageList.filter(
  //       (p) => p.status === 1
  //     );
  //     this.countDraftMileage = _filterDraftMileage.length;

  //     const _filterAcceptMileage = this.mileageList.filter(
  //       (p) => p.status === 2
  //     );
  //     this.countAcceptMileage = _filterAcceptMileage.length;

  //     const _filterRejectMileage = this.mileageList.filter(
  //       (p) => p.status === 3
  //     );
  //     this.countRejectMileage = _filterRejectMileage.length;

  //     const _filterAssignedMileage = this.mileageList.filter(
  //       (p) => p.status === 5
  //     );
  //     this.countAssignedMileage = _filterAssignedMileage.length;

  //     this.isShow = true;
  //   });
  // }

  public loadData(): void {}
}
