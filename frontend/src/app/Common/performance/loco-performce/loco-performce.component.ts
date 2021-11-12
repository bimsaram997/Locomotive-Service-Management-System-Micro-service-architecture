import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-loco-performce',
  templateUrl: './loco-performce.component.html',
  styleUrls: ['./loco-performce.component.css'],
})
export class LocoPerformceComponent implements OnInit {
  val: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.val = this.data.id;
  }
}
