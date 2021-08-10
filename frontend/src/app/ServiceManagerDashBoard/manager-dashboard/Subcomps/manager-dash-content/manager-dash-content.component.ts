import { AddFeedBacksComponent } from './../../../../UserDashBoard/user-dashboard/SubComponents/load-trail/view-load-trials/add-feed-backs/add-feed-backs.component';
import { ScheduleService } from 'src/app/service/schedule.service';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import LocoScheduleDTO from 'src/app/dto/LocoScheduleDTO';
import { LoadTrialService } from 'src/app/service/load-trial.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-manager-dash-content',
  templateUrl: './manager-dash-content.component.html',
  styleUrls: ['./manager-dash-content.component.css']
})
export class ManagerDashContentComponent implements OnInit {
 dateList: LocoScheduleDTO[] = [];
  dateList1: LocoScheduleDTO[] = [];
  loading =  false;
  cont: Array<any>[] = [];
  currentDate = new Date();
  name: any;
  calanderArray: any[]=[];

   calendarOptions: CalendarOptions;
  constructor(private schedulesService: ScheduleService, private router: Router,
     public dialog: MatDialog, private loadTrialService: LoadTrialService) {
    this.loadDate();

  }


   ngOnInit(): void {
    const values =  JSON.parse( localStorage.getItem('currentUser'));
    this.name = values.userName;


    console.log(this.calanderArray)

    const value =  JSON.parse( localStorage.getItem('currentUser'));
    const object  = {
      userNic:value.userNic,
      userRole:value.userRole,
      type:'calender'
    }
    this.schedulesService.getAllScheduleAssignedManager(object).subscribe(
            res=>{
                      console.log(res)
                  if(res && res.length>0){
                      for(const param of res){

                        for(const sub of param){
                          let eventObject = {
                            title: `${(sub.loadNo ==undefined)?sub.scheduleNo:sub.loadNo}`,
                            id: sub._id,
                            start:`${moment(sub.completedDate?sub.completedDate: sub.loadDate ).format("YYYY-MM-DD")}` ,
                            //end:moment(sub.scheduleDate).format("YYYY-MM-DD"),
                            color: (sub.items == undefined)?"blue":"gold",

                          };
                          this.calanderArray.push(eventObject)
                        }
                      }
                  }
                  console.log(this.calanderArray)
            }
      )
      setTimeout(() => {
              this.calendarOptions = {

                initialView: 'dayGridMonth',
                dateClick: function () {

                },
                events: this.calanderArray,
                contentHeight: '300px',


              };

            }, 2500);


  }


  onDateClick(res) {
      alert('Clicked on date : ' + res._id)
    }
  // calendarOptions: CalendarOptions = {
  //   initialView: 'dayGridMonth',
  //   dateClick: this.handleDateClick.bind(this), // bind is important!
  //   events: this.calanderArray
  // };

  loadSchedules(){
const dialogRef = this.dialog.open(AddFeedBacksComponent, {
      width: '250px',

    });

  }

 loadDate() {
    this.loading = true;
    this.schedulesService.getAllSchedules().subscribe(result => {
      this.dateList = result;
      this.loading = true;
    });
  }
  selectDay(event) {
    this.loading = true;
    this.schedulesService.getAllSchedules().subscribe(result => {
      event = result.scheduleNo;
      this.loading = true;
    });
  }
}
