import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {LocomotiveService} from "../../../../../service/locomotive.service";

@Component({
  selector: 'app-view-mileages',
  templateUrl: './view-mileages.component.html',
  styleUrls: ['./view-mileages.component.css']
})
export class ViewMileagesComponent implements OnInit {
  mReportNumber: any;
  mLocoCatId: any;
  mLocoNumber: any;
  mLocoMileage: any;
  mileageDate: any;
  userNic: any;
  userEmail: any;
  mileageNote: any;
  status: any;
  searchKey: string;
  isVisible =  false;
  loading =  false;
  mileageList: any[] = [];
  result: any;
  reason: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['Report Number', 'Loco Category', 'Loco Number', 'Mileage', 'Date', 'mileageNote', 'status'];
  constructor(private locomotiveService: LocomotiveService) { }

  ngOnInit(): void {
    this.loadAllReport();
  }
  private loadAllReport() {
    this.locomotiveService.getAllMileage().subscribe(resp => {
      this.mileageList = resp;
      this.dataSource = new MatTableDataSource<any>(this.mileageList);

      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }
  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }
  statusBinder(status){
    if (status === 1){
      return 'pending_actions'
        ;
    }else if (status === 2){
      return 'flag';
    }else if (status === 4){
      return 'dangerous'
    }
  }
}
