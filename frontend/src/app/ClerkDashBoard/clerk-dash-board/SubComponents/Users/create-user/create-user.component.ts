import {Component, OnInit, ViewChild} from '@angular/core';
import {ErrorStateMatcher} from "@angular/material/core";
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import UserDTO from "../../../../../dto/UserDTO";
import {MatSort} from "@angular/material/sort";
import {AccessService} from "../../../../../service/access.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import CustomerDTO from "../../../../../dto/CustomerDTO";
import {CustomerService} from "../../../../../service/customer.service";
import swal from 'sweetalert';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class CreateUserComponent implements OnInit {
  options: FormGroup;
  myControl = new FormControl();
  loading =  false;
  customerList: CustomerDTO[] = [];
  userEmail: any;
  userName: any;
  userWorks: any;
  userNic: any;
  userMobile: any;
  userRole: any;
  userPassword: any;
  roles = [
    {id: 1, value: 'Supervisor'},
    {id: 2, value: 'Service Manager'},
    {id: 3, value: 'Clerk'},
    {id: 4, value: 'Chief Engineer'}
  ];
  places = [
    {id: 1, value: 'Electric Locomotive Shed'},
    {id: 2, value: 'Running Shed'},
    {id: 3, value: 'Chief Engineering Ratmalana'}
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<UserDTO>;
  @ViewChild(MatSort) sort: MatSort;
  hide = true;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  email = new FormControl('',[
    Validators.required,
    Validators.email
  ]);


  constructor(private accessService: AccessService, private router: Router, private toastr: ToastrService, private customerService: CustomerService) {
    this.loadAllCustomers();
  }
  filesToUpload: Array<File> = [];
  urls = new Array<string>();
  isVisble = true;

  ngOnInit(): void {
  }
  private loadAllCustomers(){
    this.loading = true;
    this.customerService.getAllCustomers().subscribe( result => {
      this.customerList = result;
      this.loading = true;
    })
  }
  signUp() {
    this.accessService.register(
      this.userEmail,
      this.userName,
      this.userWorks,
      this.userNic,
      this.userMobile,
      this.userRole,
      this.userPassword
    ).subscribe( result => {
      if (result.message === true){
        swal({
          title: 'Record Saved!',
          text: 'Please Click OK',
          icon: 'success',
        });
        setTimeout(() => {
          this.refresh();
        }, 3000);

      }else{
        swal({
          title: 'Record already exits!',
          text: 'Please Click OK',
          icon: 'error',
        });
        setTimeout(() => {
          this.refresh();
        }, 3000);
      }
    });
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
  onError(message: string){
    this.toastr.error(message, 'Warning');
  }
  onSucess(message: string){
    this.toastr.success(message, 'Success');
  }

  refresh(): void {
    window.location.reload();
  }
}
