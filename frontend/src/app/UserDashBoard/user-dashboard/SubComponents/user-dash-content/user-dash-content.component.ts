import { Component, OnInit } from '@angular/core';
import LocoScheduleDTO from "../../../../dto/LocoScheduleDTO";
import {ScheduleService} from "../../../../service/schedule.service";
import {CalendarView} from "angular-calendar";
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {MatCalendarCellClassFunction} from "@angular/material/datepicker";
import { CalendarOptions } from '@fullcalendar/angular';


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
 calendarOptions: CalendarOptions;


  constructor(private schedulesService: ScheduleService) {
    this.loadDate();

  }


  ngOnInit(): void {
    const values =  JSON.parse( localStorage.getItem('currentUser'));
    this.name = values.userName
    setTimeout(() => {
        this.calendarOptions = {
          initialView: 'dayGridMonth',
          height:'400px'

        };
      }, 2500);


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
