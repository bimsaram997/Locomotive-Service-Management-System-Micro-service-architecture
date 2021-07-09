import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manager-dash-content',
  templateUrl: './manager-dash-content.component.html',
  styleUrls: ['./manager-dash-content.component.css']
})
export class ManagerDashContentComponent implements OnInit {
  currentDate = new Date();

  constructor() { 
 
  }

  ngOnInit(): void {
  }
 
}
