import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LocomotiveService } from './../../../../../../service/locomotive.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ViewImageComponent } from 'src/app/UserDashBoard/user-dashboard/SubComponents/Locomotives/user-view-locomotives/view-image/view-image.component';
import LocoDTO from 'src/app/dto/LocoDTO';

@Component({
  selector: 'app-view-assigned-locos',
  templateUrl: './view-assigned-locos.component.html',
  styleUrls: ['./view-assigned-locos.component.css'],
})
export class ViewAssignedLocosComponent implements OnInit {
  @Input() userNic: string;
  @Input() userRole: number;
  displayedColumns: string[] = [
    'Category',
    'Number',
    'Power',
    'Mileage',
    'Availability',
    'Responsible',
    'Update Date',
    'Status',
    'Image',
    '#',
  ];
  locoArray: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  selectedLoco: any;
  constructor(
    private locomotiveService: LocomotiveService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllLoco();
  }

  getAllLoco() {
    const object = {
      userNic: this.userNic,
      userRole: this.userRole,
    };
    console.log(object);
    this.locomotiveService.getAllLocoAssigned(object).subscribe((res) => {
      this.locoArray = res;
      console.log(this.locoArray);
      this.dataSource = new MatTableDataSource<any>(this.locoArray);

      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }

  statusBinder(locoStatus) {
    if (locoStatus === 0) {
      return 'train';
    } else if (locoStatus === 1) {
      return 'garage';
    } else if (locoStatus === 2) {
      return 'gpp_good';
    }
  }

  openImage(tempLoco: LocoDTO) {
    this.selectedLoco = tempLoco;
    const dialogRef = this.dialog.open(ViewImageComponent, {
      data: {
        ViewImage: this.selectedLoco.image,
        ViewID: this.selectedLoco.locoCatId,
        ViewNum: this.selectedLoco.locoNumber,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog: ${result}`);
    });
  }

  viewLoco(locoNumber: string) {
    this.router.navigate(['/adminDashboard/viewLoco', locoNumber]);
  }
}
