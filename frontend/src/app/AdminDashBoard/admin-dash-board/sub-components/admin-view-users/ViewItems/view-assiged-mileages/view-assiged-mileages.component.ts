import { LocomotiveService } from './../../../../../../service/locomotive.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-assiged-mileages',
  templateUrl: './view-assiged-mileages.component.html',
  styleUrls: ['./view-assiged-mileages.component.css'],
})
export class ViewAssigedMileagesComponent implements OnInit {
  @Input() userNic: string;
  @Input() userRole: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  mileageList: any[] = [];
  displayedColumns: string[] = [
    'Report Number',
    'Loco Category',
    'Loco Number',
    'Mileage',
    'Date',
    'mileageNote',
    'status',
    '#',
  ];
  constructor(
    private locomotiveService: LocomotiveService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAllReport();
  }

  private loadAllReport() {
    const object = {
      userNic: this.userNic,
      userRole: this.userRole,
    };
    this.locomotiveService.getAllMileage(object).subscribe((resp) => {
      this.mileageList = resp;
      this.dataSource = new MatTableDataSource<any>(this.mileageList);

      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }

  viewMileage(id: string) {
    this.router.navigate(['/adminDashboard/viewOneMileage', id]);
  }

  statusBinder(status) {
    if (status === 1) {
      return 'hourglass_top';
    } else if (status === 2) {
      return 'check';
    } else if (status === 3) {
      return 'clear';
    } else if (status === 4) {
      return 'assignment';
    } else if (status === 5) {
      return 'assignment';
    }
  }
}
