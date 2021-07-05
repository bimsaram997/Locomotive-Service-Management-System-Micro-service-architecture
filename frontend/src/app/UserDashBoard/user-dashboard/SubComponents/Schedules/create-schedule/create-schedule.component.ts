import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {LocomotiveService} from "../../../../../service/locomotive.service";
import LocoDTO from "../../../../../dto/LocoDTO";
import {CustomerService} from "../../../../../service/customer.service";
import CustomerDTO from "../../../../../dto/CustomerDTO";


import {MatCheckbox} from "@angular/material/checkbox";
import LocoScheduleDTO from "../../../../../dto/LocoScheduleDTO";
import {ScheduleService} from "../../../../../service/schedule.service";
import {ToastrService} from "ngx-toastr";
import {MatTabChangeEvent} from "@angular/material/tabs";
import {AccessService} from "../../../../../service/access.service";
import UserDTO from "../../../../../dto/UserDTO";
import swal from "sweetalert";

@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.css']
})
export class CreateScheduleComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = ['M2', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12'];
  locoList: LocoDTO[] = [];
  loading =  false;
  ScheduleStatus: string[] = [ 'Draft', 'Accept'];
  bodyLoco = new FormControl();
  bodyLocoList: string[] = [ 'Axle', 'Body Plates', 'Wheels', 'Truck Frames'];
  electricControl = new FormControl();
  electricControlList: string[] = ['Control Desk', 'Main Generators', 'Lights', 'Electric Controls', 'Battery'];
  mainMotor = new FormControl();
  mainMotorList: string[] = ['Main Generator', 'Main Alternator', 'Auxiliary Alternator', 'Fuel Blower Motor', 'Air baths'];
  tMotors = new FormControl();
  tMotorsList: string[] = [ 'Traction Motors', 'Axle Generators', 'Pinion & Gear'];
  eMechanical = new FormControl();
  eMechanicalMaList: string[] = [ 'Turbo Charger', 'Gear Box', 'Radiator', 'Drive Shaft'];
  top = new FormControl();
  topList: string[] = ['sdsd', 'asas'];
  userList: UserDTO[] = [];
  scheduleNo = '';
  scheduleUpdate = '';
  locoCatId = '';
  locoNumber = '';
  userNic = '';
  userName = '';
  userEmail = '';
  scheduleStatus = '';
  scheduleCom = 'InCompleted';
  scheduleTrackMotors: string[] = [];
  scheduleLocoBody: string[] = [];
  scheduleElCuUnit: string[] = [];
  scheduleEMechanical: string[] = [];
  scheduleMach: string[] = [];
  scheduleRemark = '';
  public selectedIndex: number = 0;
  showSpinner = true;

  filesToUpload: Array<File> = [];
  urls = new Array<string>();
  isVisble = true;



  constructor(private locomotiveService: LocomotiveService, private  accessService: AccessService,
              private scheduleService: ScheduleService,
              private toastr: ToastrService
              ) { this.loadAllIds(); }

  ngOnInit(): void {
    this.loadAllLoconumbers();
    this.loadAllIds();
  }
  loadSpinner(){
    this.showSpinner =true;
    setTimeout(() => {
      this.showSpinner = false;
    }, 500);
  }
  private loadAllLoconumbers(){
    this.loading = true;
    this.locomotiveService.getAllLocosSelect().subscribe( result => {
      this.locoList = result;
      this.loading = true;
    })
  }


  public nextStep() {
    this.selectedIndex += 1;
  }

  public previousStep() {
    this.selectedIndex -= 1;
  }
  private loadAllIds() {
    this.loading = true;
    this.accessService.getAllUsers().subscribe(result => {
      this.userList = result;
      this.loading = true;
    });
  }

  saveSchedule() {
    const dto = new LocoScheduleDTO(
      this.scheduleNo.trim(),
      this.scheduleUpdate.toString().trim(),
      this.locoCatId.trim(),
      Number(this.locoNumber.trim()),
      this.userNic.trim(),
      this.userName.trim(),
      this.userEmail.trim(),
      this.scheduleStatus.trim(),
      this.scheduleCom.trim(),

      Array(this.scheduleTrackMotors.toString()),
      Array(this.scheduleLocoBody.toString()),
      Array(this.scheduleElCuUnit.toString()),
      Array(this.scheduleEMechanical.toString()),
      Array(this.scheduleMach.toString()),
      this.scheduleRemark.trim()

    );
    this.scheduleService.saveSchedule(dto).subscribe(resp => {
      if (resp.isSaved){
        swal({
          title: 'Record Saved',
          text: 'Please Click OK',
          icon: 'success',
        });
        setTimeout(() => {
          this.refresh();
        }, 3000);

      } else {
        swal({
          title: 'Record already Exits',
          text: 'Please Click OK',
          icon: 'error',
        });
        setTimeout(() => {
          this.refresh();
        }, 3000);

      }
    });
  }
  onSucess(message: string){
    this.toastr.success(message, 'Success');
  }
  refresh(): void {
    window.location.reload();
  }
  changeFiles(event) {
    this.isVisble = !this.isVisble;
    this.filesToUpload = event.target.files as Array<File>;
    this.urls = [];
    const files = event.target.files;
    if (files) {
      for (const file of files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') {
            if (Number(e.total) > 2e+6) {
              alert('Please make sure that you entered image size is less than 2MB');
              this.filesToUpload = [];
              return;
            } else {
              this.urls.push(e.target.result);
            }
          } else {
            alert('Supported formats: .JPEG .JPG .PNG');
            this.filesToUpload = [];
            return;
          }


        };
        reader.readAsDataURL(file);
      }
    }
  }
}
