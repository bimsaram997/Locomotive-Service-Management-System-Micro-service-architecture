import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-clerk-side-nav',
  templateUrl: './clerk-side-nav.component.html',
  styleUrls: ['./clerk-side-nav.component.css']
})
export class ClerkSideNavComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  onSidenavClose() {
    this.sidenavClose.emit();
  }

}
