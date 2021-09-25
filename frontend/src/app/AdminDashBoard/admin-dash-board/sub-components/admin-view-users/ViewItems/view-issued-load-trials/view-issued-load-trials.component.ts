import { Router } from '@angular/router';
import { LoadTrialService } from './../../../../../../service/load-trial.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-view-issued-load-trials',
  templateUrl: './view-issued-load-trials.component.html',
  styleUrls: ['./view-issued-load-trials.component.css'],
})
export class ViewIssuedLoadTrialsComponent implements OnInit {
  @Input() userNic: string;
  @Input() userRole: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'Load No',
    'Load Date',
    'Loco Category',
    'Loco Number',
    'Form',
    'To',
    'Schedule No',
    'Responsible',
    'Status',
    '#',
  ];
  @ViewChild(MatSort) sort: MatSort;
  loadArray: any[] = [];

  constructor(private loadService: LoadTrialService, private router: Router) {}

  ngOnInit(): void {
    this.getLoadTrial();
  }

  private getLoadTrial() {
    const object = {
      userNic: this.userNic,
      userRole: this.userRole,
    };

    this.loadService.getLoadTrialAssigned(object).subscribe((resp) => {
      this.loadArray = resp;
      console.log(this.loadArray);
      this.dataSource = new MatTableDataSource<any>(this.loadArray);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }

  statusBinder(status) {
    if (status === 1) {
      return 'hourglass_top';
    } else if (status === 2) {
      return 'check_circle_outline';
    } else if (status === 3) {
      return 'pending_actions';
    }
  }

  viewLoad(mReportNumber: string) {
    this.router.navigate(['/adminDashboard/viewAdLoadProd', mReportNumber]);
  }
}
