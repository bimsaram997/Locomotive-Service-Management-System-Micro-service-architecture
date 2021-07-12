import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CustomerService} from '../../../../../service/customer.service';
import CustomerDTO from '../../../../../dto/CustomerDTO';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LocomotiveService} from '../../../../../service/locomotive.service';
import LocoDTO from '../../../../../dto/LocoDTO';
import {ToastrService} from "ngx-toastr";
import {AccessService} from "../../../../../service/access.service";
import UserDTO from "../../../../../dto/UserDTO";
import {ImageService} from "../../../../../service/image.service";
import swal from 'sweetalert';
import {first} from "rxjs/operators";
import { Router } from '@angular/router';
import { error } from '@angular/compiler/src/util';
@Component({
  selector: 'app-create-locomotive',
  templateUrl: './create-locomotive.component.html',
  styleUrls: ['./create-locomotive.component.css']
})
export class CreateLocomotiveComponent implements OnInit {
  LocoGroup: FormGroup;
  myControl = new FormControl();
  options: string[] = ['M2', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12'];
  loading =  false;
  spinner = false
  public selectedIndex: number = 0;
  userList: UserDTO[] = [];
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }
  /*locoCatId = '';
  locoPower = '';
  locoNumber = '';
  locoMileage = '';
  locoAvailability = '';
  userNic = '';
  locoDate = '';
  locoOil = '';
  locoFuel = '';
  locoWater = '';
  locoMainGen = '';
  locoTracMot = '';
  locoVBreak = '';
  locoDBreak = '';
  locoNote = '';*/
  searchKey: string;

  filesToUpload: Array<File> = [];
  urls = new Array<string>();


  constructor( private cd: ChangeDetectorRef, private router: Router,
    private formBuilder: FormBuilder, private imageService: ImageService, private accessService: AccessService, private locomotiveService: LocomotiveService, private toastr: ToastrService) { }


  statuses: string[] = ['In', 'Out'];
  condition: string[] = ['Working' , 'Not Working'];
  tMotors: string[] = ['Working', 'Not Working'];
  mainMotors: string[] = ['Working', 'Not Working'];
  vBreaks: string[] = ['Working', 'Not Working'];
  dBreaks: string[] = ['Working', 'Not Working'];
  isVisble = true;
  val = '';

  val2: string[] = [];
  private val1: string[] = [];
  text: string = '';
  preview: string;

  ngOnInit(): void {
    this.LocoGroup = this.formBuilder.group({
      locoCatId: ['', [Validators.required]],
      locoNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      locoPower: ['', [Validators.required, Validators.minLength(5),  Validators.pattern('^[0-9]*$')]],
      locoMileage: ['', [Validators.required, Validators.minLength(10),  Validators.pattern('^[0-9]*$')]],
      locoDate: ['', [Validators.required]],
      userNic: ['', [Validators.required]],
      supervisorName: ['', [Validators.required]],
      supervisorEmail: ['', [Validators.required]],
      locoAvailability: ['', [Validators.required]],
      locoMotors: new FormArray ([]),
      locoBreaks: new FormArray([]),
      locoFluids: new FormArray([]),
      locoNote: [''],
      image: [''],
      endMileage: [''],
      endMileDate: [''],
      mtrType: ['', Validators.required],
      brkType: ['', Validators.required],
      fldType: ['', Validators.required]
    });
    this.loadAllIds();

  }
  get getFm(){
    return this.LocoGroup.controls;
  }
  get mtrArray(){
    return this.getFm.locoMotors as FormArray;
  }
  get brkArray(){
    return this.getFm.locoBreaks as FormArray;
  }
  get fluidArray(){
    return this.getFm.locoFluids as FormArray;
  }

  uploadFile(event) {

    const fileEvnet = event.target.files[0];



    const uploadData = new FormData();

    // uploadData.append('file', fileItem);

    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];

    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      // this.LocoGroup.patchValue({
      //   image: reader.result
      // });
      reader.onload = () => {
        //this.imageUrl = reader.result;
        //     this.showAlert = false;
        console.log(reader.result)
        this.LocoGroup.patchValue({
          image: reader.result
        });
        // this.editFile = false;
        // this.removeUpload = true;
      }
      // this.LocoGroup.controls['image'].setValue(file);
      // When file uploads set it to file formcontrol

      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }


  onSubmit() {
    //console.log(reader.result)
    console.log(this.LocoGroup.controls.image.value);
// return;
    // if(this.filesToUpload.)
    this.spinner = true;
  let obj = {
    locoCatId: this.LocoGroup.controls.locoCatId.value,
    locoNumber : this.LocoGroup.controls.locoNumber.value,
    locoPower : this.LocoGroup.controls.locoPower.value,
    locoMileage : this.LocoGroup.controls.locoMileage.value,
    locoDate : this.LocoGroup.controls.locoDate.value,
    userNic : this.LocoGroup.controls.userNic.value,
    supervisorName: this.LocoGroup.controls.supervisorName.value,
    supervisorEmail : this.LocoGroup.controls.supervisorEmail.value,
    locoAvailability : this.LocoGroup.controls.locoAvailability.value,
    locoMotors : this.LocoGroup.controls.locoMotors.value,
    locoBreaks : this.LocoGroup.controls.locoBreaks.value,
    locoFluids : this.LocoGroup.controls.locoFluids.value,
    image : this.LocoGroup.controls.image.value,
    locoNote : this.LocoGroup.controls.locoNote.value,
    endMileage: this.LocoGroup.controls.endMileage.value,
    endMileDate: this.LocoGroup.controls.endMileDate.value,


  }
  if(obj == null && obj == undefined){
    console.log(error)
  }else{
    this.locomotiveService.saveLocomotive(obj)
    .pipe(first()).subscribe(
    res => {
      console.log(res)
      if (res.isSaved) {
        swal({
          title: 'Record Saved!',
          text: 'Please Click OK',
          icon: 'success',
        });
        setTimeout(() => {
          this.LocoGroup.reset();
          this.router.navigate(['/adminDashboard/viewLocomotives']);
         this.spinner = false
        }, 3000);

      } else {
        swal({
          title: 'Record already Exits',
          text: 'Please Click OK',
          icon: 'error',
        });
        setTimeout(() => {
          //this.refresh();
          this.spinner = false
        }, 3000);
      }
    },

    error => {
      console.log(error)
    },
    () => {
      console.log('dss')
    }
  )
  }



   




  }
  onClickMotor() {

    if (this.getFm.mtrType.value !== ''){
      const _findDupli = this.getFm.locoMotors.value.find(f=>f.Name==this.getFm.mtrType.value);

      if(!_findDupli){
          this.mtrArray.push(this.formBuilder.group({
            Name: [this.getFm.mtrType.value],
            working: [''],
            //notWorking: [false],

      }
      ));
    }else {
        swal({
          title: 'Value already Exits',
          text: 'Please Click OK',
          icon: 'error',
        });
      }
    }

  }
  onClickremoveField(index = null, value) {

    switch(value) {
      case 'main':
        while (this.mtrArray.length !== 0) {
          this.mtrArray.removeAt(0);
        }
        break;
      case 'sub':
        this.mtrArray.removeAt(index);
        break;
    }
  }
  onClickremoveBreakField(index = null, value) {

    switch (value) {
      case 'main':
        while (this.brkArray.length !== 0) {
          this.brkArray.removeAt(0);
        }
        break;
      case 'sub':
        this.brkArray.removeAt(index);
        break;
    }
  }
  onClickremoveFluidField(index = null, value) {

    switch (value) {
      case 'main':
        while (this.fluidArray.length !== 0) {
          this.fluidArray.removeAt(0);
        }
        break;
      case 'sub':
        this.fluidArray.removeAt(index);
        break;
    }
  }

  onClickBreaks() {
    if (this.getFm.brkType.value !== ''){
      const _findDupli = this.getFm.locoBreaks.value.find(f=>f.bName==this.getFm.brkType.value);

      if(!_findDupli){
        this.brkArray.push(this.formBuilder.group({
          bName: [this.getFm.brkType.value],
          working: [''],

        }));
      }else {
        swal({
          title: 'Value already Exits',
          text: 'Please Click OK',
          icon: 'error',
        });
      }
    }



  }

  onClickFluids(){
    if (this.getFm.fldType.value !== ''){
      const _findDupli = this.getFm.locoFluids.value.find(f=>f.fName==this.getFm.fldType.value);

      if(!_findDupli){
        this.fluidArray.push(this.formBuilder.group({
          fName: [this.getFm.fldType.value],
          fluids: [''],

        }));
      }else {
        swal({
          title: 'Value already Exits',
          text: 'Please Click OK',
          icon: 'error',
        });
      }
    }


  }

  private loadAllIds() {
    this.loading = true;
    this.accessService.getAllUsers().subscribe(result => {
      this.userList = result;
      this.loading = true;
    });
  }


  public nextStep() {
    this.selectedIndex += 1;
  }

  public previousStep() {
    this.selectedIndex -= 1;
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
    console.log(this.filesToUpload);
  }



  onSearchClear() {
    this.searchKey = '';

  }
  onChangeSelect(value: string){
   const userNic = value ;
    console.log(this.getFm.userNic.value);
    this.accessService.getOneUser(this.getFm.userNic.value).pipe(first())
      .subscribe(
        res=>{
          this.LocoGroup.controls['supervisorEmail'].setValue(res[0].userEmail);
          this.LocoGroup.controls['supervisorName'].setValue(res[0].userName);
          console.log(res);
        }
      )
  }



  onkeyUp(event: any) {
    this.val =  event.target.value;
  }
}
