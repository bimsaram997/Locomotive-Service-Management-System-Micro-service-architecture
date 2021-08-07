import { LoadTrialService } from 'src/app/service/load-trial.service';
import { Router } from '@angular/router';


import { Component, OnInit } from '@angular/core';
import LocoScheduleDTO from "../../../../dto/LocoScheduleDTO";
import {ScheduleService} from "../../../../service/schedule.service";
import {CalendarView} from "angular-calendar";
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {MatCalendarCellClassFunction} from "@angular/material/datepicker";
import { CalendarOptions,} from '@fullcalendar/angular';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { AddFeedBacksComponent } from '../load-trail/view-load-trials/add-feed-backs/add-feed-backs.component';


@Component({
  selector: 'app-user-dash-content',
  templateUrl: './user-dash-content.component.html',
  styleUrls: ['./user-dash-content.component.css']
})
export class UserDashContentComponent implements OnInit {
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



  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
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
    this.schedulesService.getAllScheduleAssigned(object).subscribe(
            res=>{
                      console.log(res)
                  if(res && res.length>0){
                      for(const param of res){

                        for(const sub of param){
                          let eventObject = {
                            title: `${(sub.loadNo ==undefined)?sub.scheduleNo:sub.loadNo}`,
                            id: sub._id,
                            start: moment(sub.completedDate).format("YYYY-MM-DD"),
                            end:moment(sub.scheduleDate).format("YYYY-MM-DD"),
                            color: (sub.items == undefined)?"blue":"gold",

                          };
                          this.calanderArray.push(eventObject)
                        }
                      }
                  }
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
