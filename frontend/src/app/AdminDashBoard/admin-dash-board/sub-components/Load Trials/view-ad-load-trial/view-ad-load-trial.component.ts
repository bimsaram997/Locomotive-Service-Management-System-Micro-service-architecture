import { AddCommentLoadComponent } from './add-comment-load/add-comment-load.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LoadTrialService } from 'src/app/service/load-trial.service';

@Component({
  selector: 'app-view-ad-load-trial',
  templateUrl: './view-ad-load-trial.component.html',
  styleUrls: ['./view-ad-load-trial.component.css']
})
export class ViewAdLoadTrialComponent implements OnInit {
  searchKey: string;
  isVisible =  false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['Load No', 'Load Date','Loco Category', 'Loco Number','Form','To',  'Schedule No', 'Responsible', 'Status',  '#'];
  @ViewChild(MatSort) sort: MatSort;
  loadArray: any[] = [];
  status: any;
  disabled = true;
  reason: any
  defChecked: boolean = false

  constructor(private loadService: LoadTrialService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getLoadTrial();

  }

  private getLoadTrial(){
    this.loadService.getAllLoadTrial().subscribe(resp=>{
      this.loadArray = resp;

      this.dataSource =  new MatTableDataSource<any>(this.loadArray);

      setTimeout(()=>{
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort

      })
    })
  }

  addComments(id: string): void {
    const dialogRef = this.dialog.open(AddCommentLoadComponent, {
      data: {id: id, defChecked: this.defChecked},
      width: '520px',

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }
  statusBinder(status){
    if (status === 1){
      return 'hourglass_top';
    }else if (status === 2){
      return 'check_circle_outline';
    }else if (status === 3){
      return 'pending_actions';
    }
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }
  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }
  viewLoad(mReportNumber: string){
    this.router.navigate(['/adminDashboard/viewAdLoadProd', mReportNumber])
  }

  alert() {
    window.alert("hi");
  }

  isDisabled() {
    return true;
  }

}
