import { Component, OnInit } from '@angular/core';
import {ScheduleService} from "../../../../../service/schedule.service";
import {Router} from "@angular/router";
import {LocomotiveService} from "../../../../../service/locomotive.service";

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  draftScheduleCount: number;
  acceptScheduleCount: number;
  inLocoCount: number;
  outLocoCount: number;
  constructor(private schedulesService: ScheduleService , private router: Router, private locomotiveService: LocomotiveService) {

    this.InLocoCount();
    this.OutLocoCount();
  }

  ngOnInit(): void {
  }



  InLocoCount(){
    this.locomotiveService.getInCount().subscribe(resp => {
      if (resp >= 0){
        this.inLocoCount = resp;
      }
    });
  }

  OutLocoCount(){
    this.locomotiveService.getOutCount().subscribe(resp => {
      if (resp >= 0){
        this.outLocoCount = resp;
      }
    });
  }
}
