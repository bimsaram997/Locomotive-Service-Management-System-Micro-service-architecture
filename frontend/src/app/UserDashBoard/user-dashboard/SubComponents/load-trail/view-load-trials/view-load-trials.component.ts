import { Router } from '@angular/router';
import { LoadTrialService } from './../../../../../service/load-trial.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-view-load-trials',
  templateUrl: './view-load-trials.component.html',
  styleUrls: ['./view-load-trials.component.css']
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

  constructor(private loadService: LoadTrialService, private router: Router) { }
  
  ngOnInit(): void {
    this.getLoadTrial();
  }

  private getLoadTrial(){
    this.loadService.getAllLoadTrial().subscribe(resp=>{
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
      return 'pending_actions'
        ;
    }else if (status === 2){
      return 'done_all';
    }else if (status === 3){
      return 'build';
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
}
