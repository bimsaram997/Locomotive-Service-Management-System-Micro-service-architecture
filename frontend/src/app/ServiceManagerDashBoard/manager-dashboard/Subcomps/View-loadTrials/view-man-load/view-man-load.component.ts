import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LoadTrialService } from 'src/app/service/load-trial.service';

@Component({
  selector: 'app-view-man-load',
  templateUrl: './view-man-load.component.html',
  styleUrls: ['./view-man-load.component.css']
})
export class ViewManLoadComponent implements OnInit {
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

  }
  applyFilter(filterValue: string) {
    if (filterValue.length > 1) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
    }
  }
  viewLoad(id: string){
    this.router.navigate(['/managerDashBoard/viewManLoadProf', id])
  }
}
