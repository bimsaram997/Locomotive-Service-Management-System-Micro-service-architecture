import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import LocoDTO from "../../../../../../dto/LocoDTO";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {LocomotiveService} from "../../../../../../service/locomotive.service";
import {first, map, mergeMap} from "rxjs/operators";

@Component({
  selector: 'app-edit-loco',
  templateUrl: './view-loco.component.html',
  styleUrls: ['./view-loco.component.css']
})
export class ViewLocoComponent implements OnInit {
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
  endMileage:any
  imageSt: any;

  constructor(private router: Router, private formBuilder: FormBuilder, private route: ActivatedRoute, private locomotiveService: LocomotiveService) { }

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
        this.endMileage = res[0].endMileage;
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

  }
  viewSchedule(id: string){
    console.log(id);
    this.router.navigate(['/userDashboard/viewSchedule', id]);
  }

}
