import { ScheduleService } from 'src/app/service/schedule.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-view-more-next-schedules',
  templateUrl: './view-more-next-schedules.component.html',
  styleUrls: ['./view-more-next-schedules.component.css'],
})
export class ViewMoreNextSchedulesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = [
    'Next Schedule No.',
    'Loco Category',
    'Loco Number',
    'Date',
    'Status',
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private router: Router,
    private scheduleService: ScheduleService
  ) {}

  ngOnInit(): void {
    this.fetchNextSchedules();
  }

  fetchNextSchedules() {
    this.scheduleService.getAllNextSchedules(this.data.id).subscribe((res) => {
      // console.log(res);
      this.dataSource = res;
    });
  }

  statusBinder(nxtSchStatus) {
    if (nxtSchStatus === 0) {
      return 'hourglass_top';
    } else if (nxtSchStatus === 1) {
      return 'assignment';
    } else if (nxtSchStatus === 2) {
      return 'clear';
    }
  }
}
