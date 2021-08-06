import { AddFeedBacksComponent } from './add-feed-backs/add-feed-backs.component';
import { Router } from '@angular/router';
import { LoadTrialService } from './../../../../../service/load-trial.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { fadeInAnimation } from 'src/app/_animations';


@Component({
  selector: 'app-view-load-trials',
  templateUrl: './view-load-trials.component.html',
  styleUrls: ['./view-load-trials.component.css'],

})
export class ViewLoadTrialsComponent implements OnInit {
  searchKey: string;
  isVisible =  false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['Load No', 'Load Date','Loco Category', 'Loco Number', 'Loco Category','Form','To',  'Schedule No', 'Responsible', 'Status',  '#'];
  @ViewChild(MatSort) sort: MatSort;
  loadArray: any[] = [];
  status: any;
  ids:any[] = [];

  constructor(private loadService: LoadTrialService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getLoadTrialAssigned();



  }

  private getLoadTrialAssigned(){

    const values =  JSON.parse( localStorage.getItem('currentUser'));
      const object  = {
      userNic:values.userNic,
      userRole:values.userRole

    }

    this.loadService.getLoadTrialAssigned(object).subscribe(resp=>{
      this.loadArray = resp;
      console.log(this.loadArray)
      this.dataSource =  new MatTableDataSource<any>(this.loadArray);
      setTimeout(()=>{
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      })
    })
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
  viewLoad(id: string){
    this.router.navigate(['/userDashboard/viewLoadProf', id])
  }

  addFeedBack(_id: string) {
    console.log(_id)
    const dialogRef = this.dialog.open(AddFeedBacksComponent,{
      data: {id: _id},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getLoadTrialAssigned();
    });
  }


}
