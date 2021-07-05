import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-final-mileage',
  templateUrl: './update-final-mileage.component.html',
  styleUrls: ['./update-final-mileage.component.css']
})
export class UpdateFinalMileageComponent implements OnInit {
  minDate: Date;
  maxDate: Date;
  constructor() { 
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 0, 7, -32);
    this.maxDate = new Date(currentYear + 0, 6, 31);
  }

  ngOnInit(): void {
  }

}
