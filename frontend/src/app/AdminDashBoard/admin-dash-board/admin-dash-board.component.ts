import { fadeInAnimation } from 'src/app/_animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dash-board',
  templateUrl: './admin-dash-board.component.html',
  styleUrls: ['./admin-dash-board.component.css'],
  animations: [fadeInAnimation],

  // attach the fade in animation to the host (root) element of this component
  host: { '[@fadeInAnimation]': '' },
})
export class AdminDashBoardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
