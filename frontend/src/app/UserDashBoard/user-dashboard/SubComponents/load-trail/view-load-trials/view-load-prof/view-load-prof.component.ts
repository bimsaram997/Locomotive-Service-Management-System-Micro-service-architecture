import { mergeMap } from 'rxjs/operators';
import { LoadTrialService } from './../../../../../../service/load-trial.service';
import { ScheduleService } from 'src/app/service/schedule.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-view-load-prof',
  templateUrl: './view-load-prof.component.html',
  styleUrls: ['./view-load-prof.component.css']
})
export class ViewLoadProfComponent implements OnInit {
  panelOpenState = false;
  panelOpenState1 = false;
  panelOpenState2 = false;
  panelOpenState3 = false;
  panelOpenState4 = false;
  panelOpenState5 = false;
  panelOpenState6 = false;
  panelOpenState7 = false;
  panelOpenState8 = false;
  panelOpenState9 = false;

  displayedColumns1: string[] = ['No', 'Description', 'Observation', 'Action'];
  displayedColumns2: string[] = ['No', 'Description', 'Observation', 'Action'];
  displayedColumns3: string[] = ['No', 'Notch', 'Track', 'Main'];
  displayedColumns4: string[] = ['No', 'Status','Date', 'Comments'];
  id:any;
  loadNo: any;
  loadDate: any;
  loadFrom: any;
  loadTo: any;
  scheduleNo: any;
  locoCatId: any;
  locoNumber: any;
  supervisorName: any;
  supervisorNic: any;
  supervisorEmail: any;
  managerName: any;
  managerNic: any;
  managerEmail: any;
  loadNote: any;
  startMileage: any;
  endMileage: any;
  status: any;
  reason: any;
  comments: any;
  dataSource1: any[] = [];
  dataSource2: any[] = [];
  dataSource3: any[]=[];
  dataSource4: any[]=[];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private route: ActivatedRoute, private router: Router, private loadService: LoadTrialService, private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.id = (this.route.snapshot.paramMap.get('id'));
    console.log(this.id);
    this.loadService.getOneLoad(this.id).pipe(
      map(res=>{
        const _load = res[0];
        this.scheduleNo = res[0].scheduleNo;
          this.loadNo = res[0].loadNo;
          this.loadDate = res[0].loadDate;
          this.loadFrom = res[0].loadFrom;
          this.loadTo = res[0].loadTo;
          this.locoNumber = res[0].locoNumber;
          this.locoCatId = res[0].locoCatId;
          this.status = res[0].status;
          this.managerNic = res[0].managerNic;
          this.managerName = res[0].managerName;
          this.managerEmail = res[0].managerEmail;
          this.supervisorNic= res[0].supervisorNic;
          this.supervisorEmail =  res[0].supervisorEmail;
          this.supervisorName =  res[0].supervisorName;
          this.dataSource1= res[0].items;
          this.dataSource2 = res[0].itemsStop;
          this.dataSource3 = res[0].dynamicBrake;
          this.loadNote= res[0].loadNote;
          this.startMileage = res[0].startMileage;
          this.endMileage = res[0].endMileage;
          this.comments = res[0].comments;
          this.reason = res[0].reason;
    
        return _load;
      }),
      mergeMap(
        sch=> this.loadService.getRelevantComments(sch.loadNo))
    
    ).subscribe(
      final=>{
       // console.log('Schedule');
        console.log(final);
        this.dataSource4 = final;
        //this.dataSource9 = final;
        //console.log(this.dataSource9)
      }
    )
  }
  statusBinder(status){
    if (status === 1){
      return 'pending_actions';
    }else if (status === 2){
      return 'done_all';
    }else if (status === 3){
      return 'build';
    }
  }
}
