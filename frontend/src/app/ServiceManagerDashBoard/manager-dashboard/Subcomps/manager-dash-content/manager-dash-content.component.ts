import { first } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { LocomotiveService } from './../../../../service/locomotive.service';
import { LoadTrialService } from './../../../../service/load-trial.service';
import { ScheduleService } from './../../../../service/schedule.service';
import { AddFeedBacksComponent } from './../../../../UserDashBoard/user-dashboard/SubComponents/load-trail/view-load-trials/add-feed-backs/add-feed-backs.component';

import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import LocoScheduleDTO from 'src/app/dto/LocoScheduleDTO';

import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-manager-dash-content',
  templateUrl: './manager-dash-content.component.html',
  styleUrls: ['./manager-dash-content.component.css'],
})
export class ManagerDashContentComponent implements OnInit {
  dateList: LocoScheduleDTO[] = [];
  dateList1: LocoScheduleDTO[] = [];
  loading = false;
  childePassData = [];
  availableLoco: any[];
  inCompleteSchedules: any[];
  cont: Array<any>[] = [];
  currentDate = new Date();
  name: any;
  arr: any[];
  calanderArray: any[] = [];

  hello: string = 'hdhd';

  calendarOptions: CalendarOptions;
  constructor(
    private schedulesService: ScheduleService,
    private router: Router,
    public dialog: MatDialog,
    private loadTrialService: LoadTrialService,
    private scheduleService: ScheduleService,
    private locomotiveService: LocomotiveService
  ) {
    this.loadDate();
  }

  ngOnInit(): void {
    const values = JSON.parse(localStorage.getItem('currentUser'));
    this.name = values.userName;
    const value = JSON.parse(localStorage.getItem('currentUser'));
    const object = {
      userNic: value.userNic,
      userRole: value.userRole,
      type: 'calender',
    };
    this.viewManagerDashboad();
    this.schedulesService
      .getAllScheduleAssignedManager(object)
      .subscribe((res) => {
        console.log(res);
        if (res && res.length > 0) {
          for (const param of res) {
            for (const sub of param) {
              let eventObject = {
                title: `${
                  sub.loadNo == undefined ? sub.scheduleNo : sub.loadNo
                }`,
                id: sub._id,
                start: `${moment(
                  sub.completedDate ? sub.completedDate : sub.loadDate
                ).format('YYYY-MM-DD')}`,
                //end:moment(sub.scheduleDate).format("YYYY-MM-DD"),
                color: sub.items == undefined ? 'blue' : 'gold',
              };
              this.calanderArray.push(eventObject);
            }
          }
        }
        //console.log(this.calanderArray)
      });
    setTimeout(() => {
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        dateClick: function () {},
        events: this.calanderArray,
        contentHeight: '350px',
      };
    }, 2500);

    this.viewManagerDashboad();
  }

  viewManagerDashboad() {
    const values = JSON.parse(localStorage.getItem('currentUser'));
    const object = {
      userNic: values.userNic,
      userRole: values.userRole,
    };
    const _allSch = this.scheduleService.getAllSchedules();
    const _getLoco = this.locomotiveService.getAllLocoAssigned(object);
    const _getLoadTrail = this.loadTrialService.getLoadTrialAssigned(object);

    forkJoin([_allSch, _getLoco, _getLoadTrail])
      .pipe(first())
      .subscribe((res) => {
        var schs = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var barchartArray = [];
        var availableLocoArray = [];

        //All schedule
        const _scheduleArray = res[0];
        const _filterSch = _scheduleArray.filter((p) => p.scheduleStatus == 7);
        if (_filterSch.length > 0) {
          var _yearCount = 12;
          for (var x = 0; x <= _yearCount; x++) {
            const GetVal = _filterSch.filter(
              (c) => new Date(c.scheduleDate).getMonth() == x
            );
            if (GetVal.length > 0) {
              schs[x] = GetVal.length;
            }
          }
        }
        let Sch = {
          data: schs,
          label: 'Completed Schedules',
        };
        barchartArray.push(Sch);
        this.childePassData = barchartArray;

        //icomplete scheudle
        const _filterInComplete = _scheduleArray.filter(
          (p) => p.scheduleStatus != 7
        );
        if (_filterInComplete.length > 0) {
          var _yearCount = 12;
          for (var x = 0; x <= _yearCount; x++) {
            const GetVal = _filterInComplete.filter(
              (c) => new Date(c.scheduleDate).getMonth() == x
            );
            if (GetVal.length > 0) {
              schs[x] = GetVal.length;
            }
          }
        }
        let inComplete = {
          data: schs,
          label: 'InCompleted Schedules',
        };
        barchartArray.push(inComplete);
        this.inCompleteSchedules = barchartArray;

        //available loco
        const _locomotiveArray = res[1];
        const _availableLoco = _locomotiveArray.filter(
          (p) => p.locoStatus == 7
        );
        if (_availableLoco.length > 0) {
          var _yearCount = 12;
          for (var x = 0; x <= _yearCount; x++) {
            const GetVal = _filterSch.filter(
              (c) => new Date(c.locoDate).getMonth() == x
            );
            if (GetVal.length > 0) {
              schs[x] = GetVal.length;
            }
          }
        }
        const _availableLocoData = {
          data: schs,
          label: 'Available Locomotives',
        };
        availableLocoArray.push(schs);
        this.availableLoco = availableLocoArray;
      });
  }

  onDateClick(res) {
    alert('Clicked on date : ' + res._id);
  }
  // calendarOptions: CalendarOptions = {
  //   initialView: 'dayGridMonth',
  //   dateClick: this.handleDateClick.bind(this), // bind is important!
  //   events: this.calanderArray
  // };

  loadSchedules() {
    const dialogRef = this.dialog.open(AddFeedBacksComponent, {
      width: '250px',
    });
  }

  loadDate() {
    this.loading = true;
    this.schedulesService.getAllSchedules().subscribe((result) => {
      this.dateList = result;
      this.loading = true;
    });
  }
  selectDay(event) {
    this.loading = true;
    this.schedulesService.getAllSchedules().subscribe((result) => {
      event = result.scheduleNo;
      this.loading = true;
    });
  }
}
