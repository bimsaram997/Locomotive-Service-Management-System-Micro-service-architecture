import { ViewImageComponent } from './../../../../../UserDashBoard/user-dashboard/SubComponents/Locomotives/user-view-locomotives/view-image/view-image.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import LocoDTO from 'src/app/dto/LocoDTO';
import { LocomotiveService } from 'src/app/service/locomotive.service';

@Component({
  selector: 'app-m-view-locomotive',
  templateUrl: './m-view-locomotive.component.html',
  styleUrls: ['./m-view-locomotive.component.css']
})
export class MViewLocomotiveComponent implements OnInit {
  isVisible =  false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['Category', 'Number', 'Power', 'Mileage', 'Availability', 'Responsible', 'Update Date', 'Image', '#'];
  @ViewChild(MatSort) sort: MatSort;
  locoArray: LocoDTO[] = [];
  selectedLoco: LocoDTO = null;
  searchKey: string;

  isVisibleSecond = false;
  statuses: string[] = ['In', 'Out'];
  tMotors: string[] = ['Working', 'Not Working'];
  mainMotors: string[] = ['Working', 'Not Working'];
  vBreaks: string[] = ['Working', 'Not Working'];
  dBreaks: string[] = ['Working', 'Not Working'];

  constructor(public dialog: MatDialog,private locomotiveService: LocomotiveService,  private router: Router, ) { }

  ngOnInit(): void {
    this.loadAll();
  }


  loadAll(){
    this.locomotiveService.getAllLocomotives().subscribe(resp => {
      this.locoArray = resp;
      this.dataSource = new MatTableDataSource<LocoDTO>(this.locoArray);

      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }

  openImage(tempLoco: LocoDTO) {
    this.selectedLoco  = tempLoco;
    const dialogRef = this.dialog.open(ViewImageComponent,{data: {ViewImage: this.selectedLoco.image,
        ViewID: this.selectedLoco.locoCatId,
        ViewNum: this.selectedLoco.locoNumber}});
    dialogRef.afterClosed().subscribe(result =>{
      console.log(`Dialog: ${result}`);
    });
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  viewLoco(locoNumber: string) {
    this.router.navigate(['/managerDashBoard/viewLoco', locoNumber]);

  }
}
