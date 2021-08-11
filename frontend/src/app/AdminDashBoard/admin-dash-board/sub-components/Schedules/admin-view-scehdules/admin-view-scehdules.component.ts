import { ProgressReportService } from 'src/app/service/progress-report.service';
import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import LocoScheduleDTO from "../../../../../dto/LocoScheduleDTO";
import {MatSort} from "@angular/material/sort";
import {ScheduleService} from "../../../../../service/schedule.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import LocoDTO from "../../../../../dto/LocoDTO";
import {LocomotiveService} from "../../../../../service/locomotive.service";
import { ViewProgressComponent } from 'src/app/UserDashBoard/user-dashboard/SubComponents/Schedules/view-schedules/view-progress/view-progress.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-view-scehdules',
  templateUrl: './admin-view-scehdules.component.html',
  styleUrls: ['./admin-view-scehdules.component.css'],
  providers: [
    { provide: Window, useValue: window }
  ],
})
export class AdminViewScehdulesComponent implements OnInit {

  searchKey: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['Schedule No', 'Report No', 'Loco Category', 'Loco Number', 'Supervisor inCharge', 'Request Date', 'To be Complete', 'Progress', 'status', '#'];
  scheduleList: any[] = [];
  scheduleStatus: any;
  progressList: any[] = [];
  dataArray: any[] = [];
  dataArrayLength:any;
  isShowPrTable: boolean = true;
  constructor(private scheduleService: ScheduleService, private router: Router,public dialog: MatDialog, public ProgressReportService: ProgressReportService) {
    this.loadAllSchedule();
  }

  ngOnInit(): void {

  }
  private loadAllSchedule(){
    this.scheduleService.getAllSchedules().subscribe(resp =>{
      this.scheduleList = resp;
      this.dataSource =  new MatTableDataSource<any>(this.scheduleList);
      setTimeout(() => {
        this.dataSource.paginator =  this.paginator;
        this.dataSource.sort = this.sort;
      })
    })
  }


  onSearchClear() {
    this.searchKey = '';
   // this.applyFilter();
  }


  applyFilter(filterValue: string) {
    if (filterValue.length > 1) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
    }
}

  statusBinder(scheduleStatus){
    if (scheduleStatus === 0){
      return 'not_started';
    }else if (scheduleStatus === 1){
      return 'Flags';
    }else if (scheduleStatus === 2){
      return 'pending_actions';
    }else if (scheduleStatus === 3){
      return 'hourglass_top';
    } else if (scheduleStatus === 4){
      return 'construction';
    } else if (scheduleStatus === 5){
      return 'build_circle';
    }
    else if (scheduleStatus === 6){
      return 'check_circle_outline';
    }
    else if (scheduleStatus === 7){
      return 'sports_score';
    }
  }
  viewSchedule(id: string){
    console.log(id);
    this.router.navigate(['/adminDashboard/viewSchedule', id]);
  }

 viewProgressHist(id: string){

    this.dialog.open(ViewProgressComponent, {
      data: {id: id},
      width: '1200px'
    });
    console.log('ho')

     this.scheduleService.sendOneSchedule(id).subscribe(resp =>{
     //console.log(resp);
        if(resp != undefined){
          this.dataArray = resp[0].schProgressReport
          this.dataArrayLength =  this.dataArray.length;


        }
      })
  }


 /*

  changeUpdate = '';
  changeStatus = '';
  changeScheduleCom = '';
  changeCatId= '';
  changeLocoNumber = '';
  changeuserNIC = '';
  changeEmail = '';
  changeName = '';
  changeTrack = '';
  changeBody = '';
  changeELCU = '';
  changeEMech = '';
  changeMach = '';
  changeReamark = '';





  updateStatus(tempSchedule: LocoScheduleDTO) {

    this.selectedSchedule = tempSchedule;
    this.changeUpdate =  tempSchedule.scheduleUpdate;
    this.changeCatId = tempSchedule.locoCatId;
    this.changeLocoNumber = tempSchedule.locoNumber + '';
    this.changeuserNIC = tempSchedule.userNic;
    this.changeName = tempSchedule.userName;
    this.changeStatus = tempSchedule.scheduleStatus;
    this.changeScheduleCom = tempSchedule.scheduleCom;
    this.changeTrack = tempSchedule.scheduleTrackMotors + '';
    this.changeBody = tempSchedule.scheduleLocoBody + '';
    this.changeELCU = tempSchedule.scheduleElCuUnit + '';
    this.changeEMech = tempSchedule.scheduleEMechanical + '';
    this.changeMach = tempSchedule.scheduleMach + '';
    this.changeReamark =  tempSchedule.scheduleRemark;


    console.log(this.changeStatus);
    const btn = document.getElementById('btn-pop-up-two') as HTMLElement;
    btn.click();
  }




  updateSchedule() {

    const dto = new LocoScheduleDTO(
      this.selectedSchedule.scheduleNo,
      this.changeUpdate,
      this.changeCatId,
      Number(this.changeLocoNumber),
      this.changeuserNIC,
      this.changeName,
      this.changeEmail,
      this.changeStatus,
      this.changeScheduleCom,
      Array(this.changeTrack),
      Array(this.changeBody),
      Array(this.changeELCU),
      Array(this.changeEMech),
      Array(this.changeMach),
      this.changeReamark,



    );

    this.schedulesService.updateSchedule(dto).subscribe(result => {
      if (result.message === 'updated'){
        console.log(this.changeStatus);
        if(this.changeStatus === 'Accept'){
          this.onSucess('Updated Accepted');
          this.loadAll();
          this.getSMS();

        } else if( this.changeStatus === 'draft'){
          this.onSucess('Updated Draft');
          this.loadAll();

        }


        const btn = document.getElementById('btn-pop-up-two') as HTMLElement;
        btn.click();

      }else {
        this.onWarning('Try Again');

        const btn = document.getElementById('btn-pop-up-two') as HTMLElement;
        btn.click();

      }
    });

  }
  getSMS(){
    this.schedulesService.getSMS().subscribe();
  }

  */
}
