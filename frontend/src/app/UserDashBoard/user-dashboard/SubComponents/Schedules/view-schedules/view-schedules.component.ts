import { ViewProgressComponent } from './view-progress/view-progress.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import LocoDTO from '../../../../../dto/LocoDTO';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ScheduleService } from '../../../../../service/schedule.service';
import LocoScheduleDTO from '../../../../../dto/LocoScheduleDTO';
import { FormControl } from '@angular/forms';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatDialog } from '@angular/material/dialog';
import { SendProgressComponent } from './send-progress/send-progress.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view-schedules',
  templateUrl: './view-schedules.component.html',
  styleUrls: ['./view-schedules.component.css'],
})
export class ViewSchedulesComponent implements OnInit {
  searchKey: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'Schedule No',
    'Report No',
    'Loco Category',
    'Loco Number',
    'Request Date',
    'To be Complete',
    'Progress',
    'Status',
    '#',
  ];
  scheduleList: any[] = [];
  scheduleStatus: any;
  statuses: any[] = ['All', 100, 90, 75, 60, 45, 30, 0];
  tableArray: any;
  // @Input() public len
  constructor(
    private scheduleService: ScheduleService,
    private router: Router,
    private _location: Location,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {
    //this.loadCount();
  }

  ngOnInit(): void {
    this.loadAllSchedule();
  }
  private loadAllSchedule() {
    const values = JSON.parse(localStorage.getItem('currentUser'));
    const object = {
      userNic: values.userNic,
      userRole: values.userRole,
    };
    console.log(object);
    this.scheduleService.getAllScheduleAssigned(object).subscribe((resp) => {
      this.scheduleList = resp;
      this.dataSource = new MatTableDataSource<any>(this.scheduleList);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }

  backClicked() {
    this._location.back();
  }
  onChangeSelect(value) {
    let _cloneArrat = [];
    const _findValue = this.scheduleList.filter(
      (x) => x.scheduleProgress == value.value
    );
    if (_findValue.length > 0) {
      this.tableArray = _findValue;
      this.dataSource = new MatTableDataSource<LocoDTO>(this.tableArray);
    } else if (value.value == 'All') {
      this.dataSource = new MatTableDataSource<LocoDTO>(this.scheduleList);
    } else {
      this.onWarning('No records found on filter!');
      this.dataSource = new MatTableDataSource<LocoDTO>(this.scheduleList);
    }
  }

  statusBinder(scheduleStatus) {
    if (scheduleStatus === 0) {
      return 'not_started';
    } else if (scheduleStatus === 1) {
      return 'start';
    } else if (scheduleStatus === 2) {
      return 'pending_actions';
    } else if (scheduleStatus === 3) {
      return 'hourglass_top';
    } else if (scheduleStatus === 4) {
      return 'construction';
    } else if (scheduleStatus === 5) {
      return 'build_circle';
    } else if (scheduleStatus === 6) {
      return 'check_circle_outline';
    } else if (scheduleStatus === 7) {
      return 'sports_score';
    } else if (scheduleStatus === 8) {
      return 'assignment';
    }
  }

  addLoadTrial() {
    this.router.navigate(['/userDashboard/addLoadTrial']);
  }

  /*
  loadCount(){
    this.schedulesService.getDraftCount().subscribe(resp => {
      if(resp >= 0){
        console.log(resp);
      }
    });
  }

 */

  openProgress(id: string) {
    const dialogRef = this.dialog.open(SendProgressComponent, {
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.loadAllSchedule();
    });
  }

  onSearchClear() {
    this.searchKey = '';
    this.loadAllSchedule();
  }
  applyFilter(filterValue: string) {
    if (filterValue.length > 1) {
      filterValue = filterValue.trim();
      filterValue = filterValue.toLowerCase();
      this.dataSource.filter = filterValue;
    }
  }

  onWarning(message: string) {
    this.toastr.warning(message, 'Warning');
  }
  onSucess(message: string) {
    this.toastr.success(message, 'Success');
  }

  viewSchedule(id: string) {
    console.log(id);
    this.router.navigate(['/userDashboard/viewSchedule', id]);
  }

  viewProgressHist(id: string) {
    this.dialog.open(ViewProgressComponent, {
      data: { id: id },
      width: '1200px',
    });
    console.log('ho');
  }

  /*
  view(tempSchedule: LocoScheduleDTO) {
    this.selectedSchedule = tempSchedule;
    const btn = document.getElementById('btn-pop-up') as HTMLElement;
    this.bgColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
    btn.click();


  }
  setStateTwo(){
    this.isVisible = false;
    this.isVisibleSecond = !this.isVisibleSecond;

  }
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


  updateSchedule(tempSchedule: LocoScheduleDTO) {
    this.selectedSchedule = tempSchedule;
    this.changeUpdate =  tempSchedule.scheduleUpdate;
    this.changeCatId = tempSchedule.locoCatId;
    this.changeLocoNumber = tempSchedule.locoNumber + '';
    this.changeuserNIC = tempSchedule.userNic;
    this.changeName = tempSchedule.userName;
    this.changeEmail = tempSchedule.userEmail;
    this.changeStatus = tempSchedule.scheduleStatus;
    this.changeScheduleCom = tempSchedule.scheduleCom;
    this.changeTrack = tempSchedule.scheduleTrackMotors + '';
    this.changeBody = tempSchedule.scheduleLocoBody + '';
    this.changeELCU = tempSchedule.scheduleElCuUnit + '';
    this.changeEMech = tempSchedule.scheduleEMechanical + '';
    this.changeMach = tempSchedule.scheduleMach + '';
    this.changeReamark =  tempSchedule.scheduleRemark;
    const btn = document.getElementById('btn-pop-up-two') as HTMLElement;
    btn.click();
  }

  updateMySchedule() {

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
        this.onSucess('Updated');
        this.loadAll();

        const btn = document.getElementById('btn-pop-up-two') as HTMLElement;
        btn.click();

      }else {
        this.onWarning('Try Again');

        const btn = document.getElementById('btn-pop-up-two') as HTMLElement;
        btn.click();

      }
    });

  }

 */
}
