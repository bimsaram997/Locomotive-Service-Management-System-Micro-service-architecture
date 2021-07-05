import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CustomerService} from '../../../../service/customer.service';
import CustomerDTO from '../../../../dto/CustomerDTO';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {UpdateCustomerComponent} from '../update-customer/update-customer.component';
import {ModelComponent} from './model/model.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from "ngx-toastr";



@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css'],

})
export class CreateCustomerComponent implements OnInit {
  public customerOne: CustomerDTO;
  custForm: FormGroup;
  @ViewChild('searchInput') searchInput2: ElementRef;
  @ViewChild('searchInput2') searchInput: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['Full Name', 'Email', 'Mobile', 'WorkPlace', 'Nic', 'Gender', 'Role', 'Hired Date', '#'];

  CustomerName = '';
  CustomerEmail = '';
  CustomerMobile = '';
  CustomerWork = '';
  CustomerNic = '';
  CustomerGender = '';
  CustomerRole = '';
  CustomerHiredDate = '';


  roles = [
    {id: 1, value: 'Supervisor'},
    {id: 2, value: 'Technical Officer'},
    {id: 3, value: 'Clerical Officer'}
  ];
  places = [
    {id: 1, value: 'Electric Locomotive Shed'},
    {id: 2, value: 'Running Shed'},
    {id: 3, value: 'Chief Engineering Ratmalana'}
  ];
  toppings = new FormControl();

  proLang: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  favGender: string;
  genders: string[] = ['Male', 'Female'];
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(
    private toastr: ToastrService,
    private customerService: CustomerService,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    ) {
    this.loadAll();
  }

  customerArray: CustomerDTO[] = [];
  dataSource: MatTableDataSource<CustomerDTO>;
  selectedCustomer: CustomerDTO = null;

  ngOnInit(): void {
    this.setCustomerToForm();

  }


  clearSearchInput(){
    this.searchInput.nativeElement.value = '';
    this.searchInput2.nativeElement.value = '';
  }

  saveCustomerOnAction() {
    const dto = new CustomerDTO(
      this.CustomerName.trim(),
      this.CustomerEmail.trim(),
      Number(this.CustomerMobile.trim()),
      this.CustomerWork.trim(),
      this.CustomerNic.trim(),
      this.CustomerGender.trim(),
      this.CustomerRole.trim(),
      this.CustomerHiredDate.toString().trim()
    );
    this.customerService.saveCustomer(dto).subscribe(resp => {
      console.log(resp);
      if (resp.isSaved){
        this.refresh()
        this.loadAll();
        this.onSucess('Saved!');

      }else{
        this.onWarning('Already Exits');
        this.refresh()
      }
    });
  }


  loadAll(){
    this.customerService.getAllCustomers().subscribe(resp => {
      this.customerArray = resp;
      this.dataSource =  new MatTableDataSource<CustomerDTO>(this.customerArray);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      });
    });
  }
  onWarning(message: string){
    this.toastr.warning(message, 'Warning');
  }
  onSucess(message: string){
    this.toastr.success(message, 'Success');
  }


  private setCustomerToForm() {
    const id = this.route.snapshot.paramMap.get('id');
    this.customerService.getCustomer(id).subscribe(customer => {
   if (customer){
     this.customerOne = customer;
   }
    })
  }

  deleteCustomer(CustomerNic: string) {
    if (confirm('Are You Sure, whether You want to delete this Customer ?')){
      this.customerService.deleteCustomer(CustomerNic).subscribe(result => {
        if (result.message === 'deleted'){
          this.onSucess('Deleted!');
          this.loadAll();
        } else{
          this.onWarning('Try Again');
        }
      });
    }
  }
  handleClear(){
    this.CustomerName = '';
    this.CustomerEmail = '';
    this.CustomerMobile = '';
    this.CustomerWork = '';
    this.CustomerNic = '';
    this.CustomerGender = '';
    this.CustomerRole = '';
    this.CustomerHiredDate = '';
  }

  editBtnHandler(id) {
    this.router.navigate(['/adminDashboard/createCustomer', id]);
  }

  onSelect(id, CustomerNic) {
    this.router.navigate(['/adminDashboard/customerDetail', id, CustomerNic]);
  }
  refresh(): void {
    window.location.reload();
  }

}
