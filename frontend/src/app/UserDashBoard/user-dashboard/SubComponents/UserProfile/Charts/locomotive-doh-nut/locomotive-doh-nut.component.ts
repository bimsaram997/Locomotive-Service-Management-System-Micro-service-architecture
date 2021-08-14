import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-locomotive-doh-nut',
  templateUrl: './locomotive-doh-nut.component.html',
  styleUrls: ['./locomotive-doh-nut.component.css']
})
export class LocomotiveDohNutComponent implements OnInit {
public doughnutChartLabels = ['Operating', 'In Schedules', 'In Load Trials'];
  public doughnutChartData = [120, 150, 180, 90];
  public doughnutChartType = 'doughnut';
  constructor() { }

  ngOnInit(): void {
  }
  print(){
     var canvas = document.querySelector('#cool-canvas');
	//creates image
	var newCanvasImg = canvas.toDataURL("image/jpeg", 1.0);

	//creates PDF from img
		var doc = new jsPDF('landscape');
	doc.setFontSize(20);
//	doc.text(15, 15, "Super Cool Chart");
	doc.addImage(newCanvasImg, 'JPEG', 10, 10, 280, 150 );
	doc.save('new-canvas.pdf');
  }
}
