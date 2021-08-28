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
public doughnutChartLabels = ['Operating', 'In Schedules', 'In Load Trials'];
  public doughnutChartData = [120, 150, 180, 90];
  public doughnutChartType = 'doughnut';
  constructor(
    public locomotiveService: LocomotiveService
  ) { }

  ngOnInit(): void {
    this.getAllLoco();
  }

  getAllLoco(){
    this.locomotiveService.getAllLocomotives().subscribe(
      res=>{
        this.locoList = res
        const loco = this.locoList?.filter(x=>x.locoStatus===2);
        this.statusTwo = loco.length;
        console.log(loco.length);
      }
    )
  }

}
