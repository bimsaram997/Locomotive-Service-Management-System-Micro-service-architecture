import { LocomotiveService } from './../../../../../../../service/locomotive.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ViewHistoryLocoComponent } from '../view-history-loco/view-history-loco.component';

@Component({
  selector: 'app-view-history-main',
  templateUrl: './view-history-main.component.html',
  styleUrls: ['./view-history-main.component.css'],
})
export class ViewHistoryMainComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'Category',
    'Number',
    'Power',
    'Mileage',
    'Availability',
    'Update Date',
    '#',
  ];
  @ViewChild(MatSort) sort: MatSort;
  locoArray: any;
  isShowPrTable: boolean = true;
  isShowLabel: boolean = false;
  constructor(
    private locomotiveService: LocomotiveService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllHistoryLoco();
  }

  getAllHistoryLoco(): void {
    this.locomotiveService.getAllHistoryLoco(this.data.id).subscribe((res) => {
      this.locoArray = res;
      this.dataSource = new MatTableDataSource<any>(this.locoArray);

      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }
  viewHistoryMore(_id: string) {
    const dialogRef = this.dialog.open(ViewHistoryLocoComponent, {
      data: { id: _id },

      width: '700px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
