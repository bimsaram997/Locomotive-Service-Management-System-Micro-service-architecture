import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {first, map, mergeMap} from "rxjs/operators";
import {LocomotiveService} from "../../../../../../service/locomotive.service";
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;

}


@Component({
  selector: 'app-view-loco-profile',
  templateUrl: './view-loco-profile.component.html',
  styleUrls: ['./view-loco-profile.component.css']
})
export class ViewLocoProfileComponent implements OnInit {
  viewLocoGroup: FormGroup;
  myControl = new FormControl();
  displayedColumns: string[] = ['No', 'Motor Part Name', 'Condition'];
  displayedColumns1: string[] = ['No', 'Motor Part Name', 'Condition'];
  displayedColumns2: string[] = ['No', 'Fluids', 'Level'];
  displayedColumns3: string[] = ['Schedule No.', 'Supervisor Name', 'Report No.', 'Progress', '#'];
  dataSource: any[] = [];
  dataSource1: any[] = [];
  dataSource2: any[] = [];
  dataSource3: any[]=[];
  dataSource4: any[]=[];
  id: any;
  panelOpenState = false;
  motorArray: any[] = [];
  locoNumber:any;
  locoCategory: any;
  locoPower: any;
  locoMileage: any;
  date: any;
  supervisorNic: any;
  supervisorEmail: any;
  supervisorName: any;
  note: any;
  imageSt: any;
  scroll: any;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private locomotiveService: LocomotiveService, private router: Router) { }

  ngOnInit(): void {

    this.id = (this.route.snapshot.paramMap.get('id'));
    this.viewLocoGroup = this.formBuilder.group({})
    console.log(this.id);
    this.locomotiveService.getOneLoco(this.id).pipe(
      map(res=>{
        const _loco = res[0];
        this.locoNumber = res[0].locoNumber;
        this.locoCategory = res[0].locoCatId;
        this.locoPower = res[0].locoPower;
        this.locoMileage = res[0].locoMileage;
        this.date =  res[0].locoDate;
        this.supervisorNic = res[0].userNic;
        this.supervisorEmail = res[0].supervisorEmail;
        this.supervisorName =  res[0].supervisorName;
        this.motorArray = res[0].locoMotors;
        this.dataSource1 = res[0].locoBreaks;
        this.dataSource2 = res[0].locoFluids;
        this.note = res[0].locoNote;
        this.imageSt = res[0].image;
        console.log(this.locoNumber);
        this.dataSource = this.motorArray;
        return _loco;
      }),
      mergeMap(
        sch=> this.locomotiveService.getRelevantSch(sch.locoNumber))
    
    ).subscribe(
      final=>{
        console.log('Schedule');
        console.log(final);
        this.dataSource3 = final;
        console.log(this.dataSource3)
      }
    )

    // this.locomotiveService.getOneLoco(this.id).pipe(first())
    //   .subscribe(
    //     res=>{
       
    //       console.log(res);
    //     }
    //   )
  }
  
  viewSchedule(id: string){
    console.log(id);
    this.router.navigate(['/adminDashboard/viewSchedule', id]);
  }

}
