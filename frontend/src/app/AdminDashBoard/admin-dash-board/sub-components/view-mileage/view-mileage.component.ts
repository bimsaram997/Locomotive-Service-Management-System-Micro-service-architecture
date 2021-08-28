import { Router } from '@angular/router';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import LocoDTO from "../../../../dto/LocoDTO";
import {LocomotiveService} from "../../../../service/locomotive.service";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent, ConfirmDialogModel} from "./confirm-dialog/confirm-dialog.component";
import {first} from "rxjs/operators";
import {RejectDialogComponent, RejectDialogModel} from "./reject-dialog/reject-dialog.component";


@Component({
  selector: 'app-view-mileage',
  templateUrl: './view-mileage.component.html',
  styleUrls: ['./view-mileage.component.css']
})
export class ViewMileageComponent implements OnInit {
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
  displayedColumns: string[] = ['Report Number', 'Loco Category', 'Loco Number', 'Mileage', 'Date', 'mileageNote', 'status', '#'];
  constructor(private locomotiveService: LocomotiveService, public dialog: MatDialog, private router: Router) {

  }

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

  viewMileage(id: string){
    this.router.navigate(['/managerDashBoard/viewOneMileage', id])
  }

  openAcceptDialog(data): void {
    const message = `Are you sure you want to Accept this?`;

    const dialogData = new ConfirmDialogModel('Confirm Action', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      if(this.result == true){
        console.log(data)
        this.locomotiveService.updateMileStatus(data._id)
          .pipe(first())
          .subscribe((
            res=> {
              console.log(res);
              this.loadAllReport();
            }
          ))
      }
    });

  }

  openRejectDialog(data) {
    const message = `Are you sure you want to Reject this?`;

    const dialogData = new RejectDialogModel('Confirm Action', message);

    const dialogRef = this.dialog.open(RejectDialogComponent, {
      width: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      const val = this.result;
      //console.log(this.result);
      if(val !== ''){
        console.log(val)
        this.locomotiveService.updateRejectStatus(data._id, val)
          .pipe(first())
          .subscribe((
            res=> {
              console.log(res);
              this.loadAllReport();
            }
          ))
      }
    });

  }


  statusBinder(status){
    if (status === 1){
      return 'hourglass_top';
    }else if (status === 2){
      return 'check';
    }else if (status === 3){
      return 'clear'
    }else if (status === 4){
      return 'assignment'
    }else if (status === 5){
      return 'assignment'
    }
  }
}
