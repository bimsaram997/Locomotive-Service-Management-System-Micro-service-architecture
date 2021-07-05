import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-clerk-dash-board',
  templateUrl: './clerk-dash-board.component.html',
  styleUrls: ['./clerk-dash-board.component.css']
})
export class ClerkDashBoardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


}
