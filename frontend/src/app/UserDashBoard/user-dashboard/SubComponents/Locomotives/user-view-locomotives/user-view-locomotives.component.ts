import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import LocoDTO from "../../../../../dto/LocoDTO";
import {MatSort} from "@angular/material/sort";
import {LocomotiveService} from "../../../../../service/locomotive.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ViewLocoComponent} from "./view-loco/view-loco.component";
import {MatDialog} from "@angular/material/dialog";
import {EditLocoComponent} from "./edit-loco/edit-loco.component";
import {ViewImageComponent} from "./view-image/view-image.component";

@Component({
  selector: 'app-user-view-locomotives',
  templateUrl: './user-view-locomotives.component.html',
  styleUrls: ['./user-view-locomotives.component.css']
})
export class UserViewLocomotivesComponent implements OnInit {
  isVisible =  false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<LocoDTO>;
  displayedColumns: string[] = ['Category', 'Number', 'Power', 'Mileage', 'Availability', 'Responsible', 'Update Date', 'Status','Image', '#'];
  @ViewChild(MatSort) sort: MatSort;
  locoArray: LocoDTO[] = [];
  selectedLoco: LocoDTO = null;
  searchKey: string;

  isVisibleSecond = false;
  statuses: string[] = ['All','In', 'Out'];
  tMotors: string[] = ['Working', 'Not Working'];
  mainMotors: string[] = ['Working', 'Not Working'];
  vBreaks: string[] = ['Working', 'Not Working'];
  dBreaks: string[] = ['Working', 'Not Working'];

  userNic: any;
  userRole: any;



  constructor(public dialog: MatDialog, private locomotiveService: LocomotiveService,  private router: Router,  private toastr: ToastrService) {
    //this.loadAll();

  }

  ngOnInit(): void {
    this.getAllLoco();
  }
  /*loadAll(){
    this.locomotiveService.getAllLocomotives().subscribe(resp => {
      this.locoArray = resp;
      this.dataSource = new MatTableDataSource<LocoDTO>(this.locoArray);

      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }*/

  getAllLoco(){
    const values =  JSON.parse( localStorage.getItem('currentUser'));
    const object  = {
      userNic:values.userNic,
      userRole:values.userRole

    }
    console.log(object);
    this.locomotiveService.getAllLocoAssigned(object)
    .subscribe(
      res=>{
        this.locoArray = res;
        this.dataSource = new MatTableDataSource<LocoDTO>(this.locoArray);

        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      }
    )
  }
  openDialog(){
    this.router.navigate(['./adminDashboard/viewLoco']);
  }
  viewLoco(locoNumber: string) {
    this.router.navigate(['/userDashboard/viewLoco', locoNumber]);

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

  OpenEditDialog(_id: string){
    console.log(_id)
    const dialogRef=this.dialog.open(EditLocoComponent, {
      data: {id: _id},

      width: '700px',
    })
    dialogRef.afterClosed().subscribe(result => {
      this.getAllLoco();
    });
  }


  statusBinder(locoStatus){
    if (locoStatus === 0){
      return 'train';
    }else if (locoStatus === 1){
      return 'garage';
    }else if (locoStatus === 2){
      return 'gpp_good';
    }
  }

  onSearchClear() {
    this.searchKey = '';
    //this.applyFilter(ob:st);
  }

  applyFilter(filterValue: string) {
    if (filterValue.length > 1) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
    }
  }



}
