import { ScheduleService } from 'src/app/service/schedule.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-view-next-schedules',
  templateUrl: './view-next-schedules.component.html',
  styleUrls: ['./view-next-schedules.component.css'],
})
export class ViewNextSchedulesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'ID',
    'LocoCategory',
    'LocoNumber',
    'Date',
    'Reason',
  ];
  @ViewChild(MatSort) sort: MatSort;
  nxtScheduleList: any;
  isEmpty: boolean;
  constructor(private scheduleService: ScheduleService) {}

  ngOnInit(): void {
    this.getAllNextSchedulesNotFilter();
  }

  getAllNextSchedulesNotFilter() {
    this.scheduleService.getAllNextSchedulesNotFilter().subscribe((res) => {
      this.nxtScheduleList = res;
      this.dataSource = new MatTableDataSource<any>(this.nxtScheduleList);
      if (this.nxtScheduleList.length === 0) {
        this.isEmpty = true;
      }
    });
  }
}
