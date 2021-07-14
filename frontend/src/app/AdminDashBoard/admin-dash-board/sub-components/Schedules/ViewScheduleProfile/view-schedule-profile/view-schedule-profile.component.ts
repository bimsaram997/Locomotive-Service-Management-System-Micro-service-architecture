
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first, map, mergeMap } from 'rxjs/operators';
import { ScheduleService } from 'src/app/service/schedule.service';

@Component({
  selector: 'app-view-schedule-profile',
  templateUrl: './view-schedule-profile.component.html',
  styleUrls: ['./view-schedule-profile.component.css']
})
export class ViewScheduleProfileComponent implements OnInit {
  panelOpenState = false;
  panelOpenState1 = false;
  panelOpenState2 = false;
  panelOpenState3 = false;
  panelOpenState4 = false;
  panelOpenState5 = false;
  panelOpenState6 = false;
  panelOpenState7 = false;
  panelOpenState8 = false;
//table

displayedColumns1: string[] = ['No', 'Main Motor Items'];
displayedColumns2: string[] = ['No', 'Traction Motor Items'];
displayedColumns3: string[] = ['No', 'Loco Body Items'];
displayedColumns4: string[] = ['No', 'Other Motor Items'];
displayedColumns5: string[] = ['No', 'Electric CU Items'];
displayedColumns6: string[] = ['No', 'E-Mechanic Items'];
displayedColumns7: string[] = ['No', 'E-Switch Items'];
displayedColumns8: string[] = ['No', 'Other Electric Items'];
displayedColumns9: string[] = ['repNo',  'progressDate', 'checkArray', 'progressValue', 'extraNote'];

//display information
  id: any;
  scheduleNo: any;
  mReportNumber: any;
  scheduleDate: any;
  completedDate: any;
  locoCatId: any;
  locoNumber: any;
  locoMileage: any;
  locoStatus: any;
  managerNic: any;
  managerName: any;
  managerEmail:any;
  supervisorNic: any;
  supervisorName: any;
  supervisorEmail: any;
  dataSource1: any[] = [];
  dataSource2: any[] = [];
  dataSource3: any[]=[];
  dataSource4: any[]=[];
  dataSource5: any[]=[];
  dataSource6: any[]=[];
  dataSource7: any[]=[];
  dataSource8: any[]=[];
  dataSource9: any[]=[];
  specialNote: any;
  scheduleStatus: any;
  scheduleProgress: any;
  

  constructor(private route: ActivatedRoute, private router: Router, private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.id = (this.route.snapshot.paramMap.get('id'));
    console.log(this.id);
    this.scheduleService.sendOneSchedule(this.id).pipe(
      map(res=>{
        const _schedule = res[0];
        this.scheduleNo = res[0].scheduleNo;
          this.mReportNumber = res[0].mReportNumber;
          this.scheduleDate = res[0].scheduleDate;
          this.completedDate = res[0].completedDate;
          this.locoCatId = res[0].locoCatId;
          this.locoNumber = res[0].locoNumber;
          this.locoMileage = res[0].locoMileage;
          this.locoStatus = res[0].locoStatus;
          this.managerNic = res[0].managerNic;
          this.managerName = res[0].managerName;
          this.managerEmail = res[0].managerEmail;
          this.supervisorNic= res[0].supervisorNic;
          this.supervisorEmail =  res[0].supervisorEmail;
          this.supervisorName =  res[0].supervisorName;
          this.dataSource1= res[0].mainMotorName;
          this.dataSource2 = res[0].trackMotorName;
          this.dataSource3 = res[0].locoBodyName;
          this.dataSource4 = res[0].otherMotors;
          this.dataSource5 = res[0].electricCUnitName;
          this.dataSource6 = res[0].eMechanicalName;
          this.dataSource7 = res[0].eSwitchName;
          this.dataSource8 = res[0].otherElectric;
          this.specialNote= res[0].specialNote;
          this.scheduleStatus = res[0].scheduleStatus;
          this.scheduleProgress = res[0].scheduleProgress;
        return _schedule;
      }),
      mergeMap(
        sch=> this.scheduleService.getRelevantProgress(sch.scheduleNo))
    
    ).subscribe(
      final=>{
        console.log('Schedule');
        console.log(final);
        this.dataSource9 = final;
        console.log(this.dataSource9)
      }
    )
    

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
  }
}
