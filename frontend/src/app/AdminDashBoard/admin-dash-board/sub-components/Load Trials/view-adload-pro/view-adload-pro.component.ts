import { LocomotiveService } from 'src/app/service/locomotive.service';
import { first } from 'rxjs/operators';
import { log } from 'util';
import { ViewFeedBacksComponent } from './../../../../../UserDashBoard/user-dashboard/SubComponents/load-trail/view-load-trials/view-load-prof/view-feed-backs/view-feed-backs.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';
import { LoadTrialService } from 'src/app/service/load-trial.service';
import { ScheduleService } from 'src/app/service/schedule.service';
import { MatDialog } from '@angular/material/dialog';
import swal from "sweetalert";
@Component({
  selector: 'app-view-adload-pro',
  templateUrl: './view-adload-pro.component.html',
  styleUrls: ['./view-adload-pro.component.css']
})
export class ViewAdloadProComponent implements OnInit {
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
  displayedColumns4: string[] = ['No', 'Status','Date', 'Comments', '#'];
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
  resolvedComments: any[] = [];
  countComments: number;
  countResComments: number;
  isAllResolved: boolean = false;
  isStatusRes: boolean = true;
  reLoad:any;

  disabled = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor ( public dialog: MatDialog,private route: ActivatedRoute, 
    private router: Router, private loadService: LoadTrialService,
     private scheduleService: ScheduleService,
     private locoService: LocomotiveService) { }

  ngOnInit(): void {
    this.id = (this.route.snapshot.paramMap.get('id'));
    console.log(this.id);
    this.loadService.getOneLoad(this.id).pipe(
      map(res=>{
        const _load = res[0];
        this.reLoad = res[0];
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
          
          if(this.status === 3){
           this.isStatusRes = false;
          }
    
        return _load;
      }),
      mergeMap(
        sch=> this.loadService.getRelevantComments(sch.loadNo))

    
    ).subscribe(
      final=>{
       // console.log('Schedule');
        console.log(final);
        this.dataSource4 = final;
        //console.log(this.dataSource4.length)
        this.countComments = this.dataSource4.length;
        this.getResolvedComments(this.countComments);
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

  cmtStatusBinder(val){
    if (val === 3){
      return 'pending_actions';
    }else if (val === 2){
      return 'done_all';
    }else if (val === 0){
      return 'build';
    }else if (val === 4){
      return 'thumb_up_off_alt';
    }
  }

  viewFeedBack(commentId: string){
    console.log(commentId)
    const dialogRef = this.dialog.open(ViewFeedBacksComponent,{
      data: {commentId: commentId},
    });

    dialogRef.afterClosed().subscribe(result => {
     
    });
  }


  countResolvedComments(obj){
    console.log(obj.status)
  }

  getResolvedComments(val){
    this.loadService.getResolvedComments().subscribe(
      res=>{
        this.resolvedComments = res;
        this.countResComments =  this.resolvedComments.length;
        console.log(val);
        if(val === this.countResComments){
         this.isAllResolved = true;
        }else{
         this.isAllResolved = false;
        }
      }
    )
  }
  acceptLoadTrial(){
    this.loadService.acceptLoadTrial(this.loadNo)
          .pipe(first())
          .subscribe((
            res=> {
              if(res !== undefined){
                console.log(res);
                this.acceptLoadLoco( this.reLoad)
                //this.loadAllReport();
                this.isAllResolved =  false;
                swal({
                  title: 'Load Trial Updated!',
                  text: 'Please Click OK',
                  icon: 'success',
                });
                setTimeout(() => {
                 // this.refresh();
                }, 3000);
              }else{
                swal({
                  title: 'Error on Update',
                  text: 'Please Click OK',
                  icon: 'error',
                });
                setTimeout(() => {
                  //this.refresh();
                }, 3000);
              }


             
            }
          ))
  }
  acceptLoadLoco(obj){
    this.locoService.acceptLoadLoco(obj)
    .pipe(first())
    .subscribe((
      res=> {
        console.log(res);
        //this.loadAllReport();
      }
    ))
  }

 

}
