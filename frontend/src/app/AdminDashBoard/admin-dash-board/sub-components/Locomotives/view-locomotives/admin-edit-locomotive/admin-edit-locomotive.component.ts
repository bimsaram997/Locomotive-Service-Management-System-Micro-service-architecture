import {Component, EventEmitter, Inject, OnInit, Output, ViewChild} from '@angular/core';
import LocoDTO from "../../../../../../dto/LocoDTO";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {LocomotiveService} from "../../../../../../service/locomotive.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import swal from "sweetalert";
import {ViewLocomotivesComponent} from "../view-locomotives.component";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ImageService} from "../../../../../../service/image.service";
import {AccessService} from "../../../../../../service/access.service";

@Component({
  selector: 'app-admin-edit-locomotive',
  templateUrl: './admin-edit-locomotive.component.html',
  styleUrls: ['./admin-edit-locomotive.component.css']
})
export class AdminEditLocomotiveComponent implements OnInit {
  selectedLoco: LocoDTO = null;
  @Output() myEvent =  new EventEmitter();

  constructor(private route: ActivatedRoute,@Inject(MAT_DIALOG_DATA) public data: any, private locomotiveService: LocomotiveService,  private router: Router,  private toastr: ToastrService) {

  }
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<LocoDTO>;
  locoArray: LocoDTO[] = [];
  statuses: string[] = ['In', 'Out'];
  tMotors: string[] = ['Working', 'Not Working'];
  mainMotors: string[] = ['Working', 'Not Working'];
  vBreaks: string[] = ['Working', 'Not Working'];
  dBreaks: string[] = ['Working', 'Not Working'];
  appviewlocomotives: any;

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
  onWarning(message: string){
    this.toastr.warning(message, 'Warning');
  }
  onSucess(message: string){
    this.toastr.success(message, 'Success');
  }
  refresh(): void {
    window.location.reload();
  }
}
