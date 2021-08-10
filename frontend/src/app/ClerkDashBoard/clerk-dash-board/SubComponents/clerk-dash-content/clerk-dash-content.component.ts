import { ScheduleService } from 'src/app/service/schedule.service';
import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import LocoScheduleDTO from 'src/app/dto/LocoScheduleDTO';
import * as moment from 'moment';

@Component({
  selector: 'app-clerk-dash-content',
  templateUrl: './clerk-dash-content.component.html',
  styleUrls: ['./clerk-dash-content.component.css']
})
export class ClerkDashContentComponent implements OnInit {

  dateList: LocoScheduleDTO[] = [];
  dateList1: LocoScheduleDTO[] = [];
  loading =  false;
  cont: Array<any>[] = [];
  currentDate = new Date();
  name: any;

   calanderArray: any[]=[];

 calendarOptions: CalendarOptions;
  constructor(private schedulesService: ScheduleService) { }

  ngOnInit(): void {
    const values =  JSON.parse( localStorage.getItem('currentUser'));
    this.name = values.userName


    this.schedulesService.getAllScheduleCalendar().subscribe(
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

            }, 700);

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
