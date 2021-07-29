import { ScheduleService } from './../../../../service/schedule.service';
import { Component, OnInit } from '@angular/core';
import LocoScheduleDTO from 'src/app/dto/LocoScheduleDTO';

@Component({
  selector: 'app-admin-dash-content',
  templateUrl: './admin-dash-content.component.html',
  styleUrls: ['./admin-dash-content.component.css']
})
export class AdminDashContentComponent implements OnInit {
  dateList: LocoScheduleDTO[] = [];
  dateList1: LocoScheduleDTO[] = [];
  loading =  false;
  cont: Array<any>[] = [];
  currentDate = new Date();
  name: any;
  constructor(private schedulesService: ScheduleService) { }

  ngOnInit(): void {
    const values =  JSON.parse( localStorage.getItem('currentUser'));
    this.name = values.userName
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
