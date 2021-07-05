import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-manager-side-nav',
  templateUrl: './manager-side-nav.component.html',
  styleUrls: ['./manager-side-nav.component.css']
})
export class ManagerSideNavComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  onSidenavClose() {
    this.sidenavClose.emit();
  }
}
