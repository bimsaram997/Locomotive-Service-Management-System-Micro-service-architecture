import { LocomotiveService } from './../../../../../../service/locomotive.service';
import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-locomotive-doh-nut',
  templateUrl: './locomotive-doh-nut.component.html',
  styleUrls: ['./locomotive-doh-nut.component.css']
})
export class LocomotiveDohNutComponent implements OnInit {

  locoList: any[]=[];
  statusTwo:number;

  constructor(
    public locomotiveService: LocomotiveService
  ) { }

  public doughnutChartLabels = ['Operating', 'In Schedules', 'In Load Trials'];
  public doughnutChartData = [120, 150, 180, 90];
  public doughnutChartType = 'doughnut';
  // doughnutChartData:any = [
  //       {
  //           data: []
  //       }
  //   ];

  ngOnInit(): void {
   // this.getAllLoco();
  }

  // getAllLoco(){
  //   this.locomotiveService.getData().subscribe(
  //     res=>{

  //       this.statusTwo = res;
  //        this.doughnutChartData =  res as any [];
  //       console.log(this.statusTwo);
  //     }
  //   )
  // }

}
