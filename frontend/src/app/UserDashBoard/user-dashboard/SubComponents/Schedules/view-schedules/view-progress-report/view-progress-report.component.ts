import { log } from 'util';
import { ProgressReportService } from './../../../../../../service/progress-report.service';
import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ViewMoreProgressComponent } from './view-more-progress/view-more-progress.component';

@Component({
  selector: 'app-view-progress-report',
  templateUrl: './view-progress-report.component.html',
  styleUrls: ['./view-progress-report.component.css']
})
export class ViewProgressReportComponent implements OnInit {
  searchKey: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['repNo', 'schNo', 'locoCatId', 'Loco Number', 'Supervisor inCharge', 'date', 'progValue', '#'];
  progressList: any[] = [];
  progressLength: any;

  @Output() public lengthFound = new EventEmitter<any>();
  constructor(private ProgressReportService: ProgressReportService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadAllProgress();
  }
 loadAllProgress(){
    this.ProgressReportService.getAllProgress().subscribe(resp =>{
      this.progressList = resp;
      this.progressLength =  this.progressList.length;
      this.lengthFound.emit(this.progressLength);
      this.dataSource =  new MatTableDataSource<any>(this.progressList);
      setTimeout(() => {
        this.dataSource.paginator =  this.paginator;
        this.dataSource.sort = this.sort;
      })
    })
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }
  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }
  openDialog(id: string) {
    const dialogRef = this.dialog.open(ViewMoreProgressComponent,{
      data: {id: id}

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

}
