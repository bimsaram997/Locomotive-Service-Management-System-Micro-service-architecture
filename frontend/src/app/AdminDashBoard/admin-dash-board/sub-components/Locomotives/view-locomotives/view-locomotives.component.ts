import {Component, OnInit, ViewChild} from '@angular/core';
import LocoDTO from '../../../../../dto/LocoDTO';
import {MatTableDataSource} from '@angular/material/table';
import {LocomotiveService} from '../../../../../service/locomotive.service';
import {MatPaginator} from '@angular/material/paginator';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {MatSort} from '@angular/material/sort';
import {FormControl} from '@angular/forms';
import CustomerDTO from '../../../../../dto/CustomerDTO';
import {CustomerService} from '../../../../../service/customer.service';
import UserDTO from '../../../../../dto/UserDTO';
import {AccessService} from '../../../../../service/access.service';
import {ImageService} from '../../../../../service/image.service';
import {ViewLocoComponent} from "../../../../../UserDashBoard/user-dashboard/SubComponents/Locomotives/user-view-locomotives/view-loco/view-loco.component";
import {MatDialog} from "@angular/material/dialog";
import {AdminEditLocomotiveComponent} from "./admin-edit-locomotive/admin-edit-locomotive.component";
import swal from 'sweetalert';
import {log} from "util";
import {ViewImageComponent} from "../../../../../UserDashBoard/user-dashboard/SubComponents/Locomotives/user-view-locomotives/view-image/view-image.component";
@Component({
  selector: 'app-view-locomotives',
  templateUrl: './view-locomotives.component.html',
  styleUrls: ['./view-locomotives.component.css']
})
export class ViewLocomotivesComponent implements OnInit {



  constructor(private dialog: MatDialog, private imageService: ImageService, private locomotiveService: LocomotiveService,  private router: Router,  private toastr: ToastrService, private accessService: AccessService) {
    this.loadAll();
  }

  isVisible =  false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<LocoDTO>;
  displayedColumns: string[] = ['Category', 'Number', 'Power', 'Mileage', 'Availability', 'Responsible', 'Update Date', 'Image', '#'];
  @ViewChild(MatSort) sort: MatSort;
  locoArray: LocoDTO[] = [];
  selectedLoco: LocoDTO = null;
  searchKey: string;
  isVisibleSecond = false;
  myControl = new FormControl();
  options: string[] = ['M2', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12'];
  loading =  false;
  userList: UserDTO[] = [];
  statuses: string[] = ['In', 'Out'];



  ngOnInit(): void {
    this.loadAllIds();
  }

  private loadAllIds() {
    this.loading = true;
    this.accessService.getAllUsers().subscribe(result => {
      this.userList = result;
      this.loading = true;
    });
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
  editLoco(locoNumber: string){
    this.router.navigate(['/adminDashboard/EditLocomotive', locoNumber]);
  }



  viewLoco(locoNumber: string) {
    this.router.navigate(['/adminDashboard/viewLoco', locoNumber]);

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





}
