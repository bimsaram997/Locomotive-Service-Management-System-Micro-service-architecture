import { ScheduleService } from 'src/app/service/schedule.service';
import { ViewportScroller } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {first, map, mergeMap} from "rxjs/operators";
import {LocomotiveService} from "../../../../../../service/locomotive.service";
import { MatDialog } from '@angular/material/dialog';
import { ViewHistoryLocoComponent } from 'src/app/UserDashBoard/user-dashboard/SubComponents/Locomotives/user-view-locomotives/view-loco/view-history-loco/view-history-loco.component';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;

}


@Component({
  selector: 'app-view-loco-profile',
  templateUrl: './view-loco-profile.component.html',
  styleUrls: ['./view-loco-profile.component.css']
})
export class ViewLocoProfileComponent implements OnInit {
  viewLocoGroup: FormGroup;
  myControl = new FormControl();
  displayedColumns: string[] = ['No', 'Motor Part Name', 'Condition'];
  displayedColumns1: string[] = ['No', 'Motor Part Name', 'Condition'];
  displayedColumns2: string[] = ['No', 'Fluids', 'Level'];
  displayedColumns3: string[] = ['Schedule No.', 'Supervisor Name', 'Report No.', 'Progress', '#'];
  displayedColumns5: string[] = ['Next Schedule No.', 'Loco Category', 'Loco Number', 'Date', 'Status'];
displayedColumns6: string[] = ['Loco Category', 'Loco Number', 'Last Updated Date', 'Loco Mileage', '#'];
  dataSource: any[] = [];
  dataSource1: any[] = [];
  dataSource2: any[] = [];
  dataSource3: any[]=[];
  dataSource4: any[]=[];
  dataSource5: any[]=[];
  dataSource6: any[]=[];
  id: any;
  panelOpenState = false;
  motorArray: any[] = [];
  locoNumber:any;
  locoCategory: any;
  locoPower: any;
  locoMileage: any;
  date: any;
  supervisorNic: any;
  supervisorEmail: any;
  supervisorName: any;
  finalMileage: any;
  endMileDate: any;
  note: any;
  imageSt: any;
  locoNumberNextSchedule: any;
  isShowNextSchedule: boolean = false;



  pageYoffset = 0;
  isShowHisLoco: boolean;
  @HostListener('window:scroll', ['$event']) onScroll(event){
    this.pageYoffset = window.pageYOffset;
  }


  constructor(private scroll: ViewportScroller,public dialog: MatDialog, private formBuilder: FormBuilder,
     private route: ActivatedRoute, private locomotiveService: LocomotiveService, private router: Router, private scheduleService: ScheduleService) { }

  ngOnInit(): void {

    this.id = (this.route.snapshot.paramMap.get('id'));
    this.viewLocoGroup = this.formBuilder.group({})

    this.locomotiveService.getOneLoco(this.id).pipe(
      map(res=>{
        const _loco = res[0];
        this.locoNumber = res[0].locoNumber;
        this.locoNumberNextSchedule = res[0].locoNumber;
        this.locoCategory = res[0].locoCatId;
        this.locoPower = res[0].locoPower;
        this.locoMileage = res[0].locoMileage;
        this.finalMileage = res[0].endMileage;
        this.endMileDate =  res[0].endMileDate
        this.date =  res[0].locoDate;
        this.supervisorNic = res[0].userNic;
        this.supervisorEmail = res[0].supervisorEmail;
        this.supervisorName =  res[0].supervisorName;
        this.motorArray = res[0].locoMotors;
        this.dataSource1 = res[0].locoBreaks;
        this.dataSource2 = res[0].locoFluids;
        this.note = res[0].locoNote;
        this.imageSt = res[0].image;

        this.dataSource = this.motorArray;
        return _loco;
      }),
      mergeMap(
        sch=> this.locomotiveService.getRelevantSch(sch.locoNumber))

    ).subscribe(
      final=>{

        this.dataSource3 = final;
        this.getAllHistoryLoco();
          this.viewNextSchedules();

      }
    )


  }

    scrollToTop(){
  this.scroll.scrollToPosition([0,0]);
}

  viewSchedule(id: string){
    console.log(id);
    this.router.navigate(['/adminDashboard/viewSchedule', id]);
  }

  viewNextSchedules(){
    console.log(this.locoNumberNextSchedule)
    this.scheduleService.getAllNextSchedules(this.locoNumberNextSchedule).subscribe(
      res=>{
        console.log(res);
        this.dataSource5  = res;
        if(this.dataSource5.length>0){
          this.isShowNextSchedule = true;
        }

      }
    )
  }

    statusBinder(nxtSchStatus){
    if (nxtSchStatus === 0){
      return 'hourglass_top';
    }else if (nxtSchStatus === 1){
      return 'assignment';
    }else if (nxtSchStatus === 2){
      return 'clear';
    }
  }
getAllHistoryLoco(){
    console.log(this.locoNumber)
    this.locomotiveService.getAllHistoryLoco(this.locoNumber).subscribe(
      res=>{
        console.log(res);
        this.dataSource6  = res;
        if(this.dataSource6.length>0){
          this.isShowHisLoco = true;
        }

      }
    )
  }

viewHistoryMore(_id:string){
    const dialogRef = this.dialog.open(ViewHistoryLocoComponent, {
       data: {id: _id},

      width: '700px',

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }
}
