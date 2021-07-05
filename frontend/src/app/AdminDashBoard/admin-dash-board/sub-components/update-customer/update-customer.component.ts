import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import CustomerDTO from '../../../../dto/CustomerDTO';
import {CustomerService} from '../../../../service/customer.service';



@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {
  @ViewChild('searchInput') searchInput2: ElementRef;
  @ViewChild('searchInput2') searchInput: ElementRef;


  displayedColumns: string[] = ['Full Name', 'Email', 'Mobile', 'Password', 'Nic', 'Gender', 'Role', 'Hired Date', '#'];

  CustomerId = '';
  CustomerEmail = '';
  CustomerMobile = '';
  CustomerPassword = '';
  CustomerNic = '';
  CustomerGender = '';
  CustomerRole = '';
  CustomerHiredDate = '';
  nic: string;

  roles = [
    {id: 1, value: 'Supervisor'},
    {id: 2, value: 'Technical Officer'},
    {id: 3, value: 'Clerical Officer'}
  ];
  favGender: string;
  genders: string[] = ['Male', 'Female'];
  customer: CustomerDTO = new CustomerDTO(this.CustomerId, this.CustomerEmail, Number(this.CustomerMobile), this.CustomerPassword, this.CustomerNic, this.CustomerGender, this.CustomerRole, this.CustomerHiredDate);

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService
  ) {}


  id: string;

  ngOnInit(): void {

  }

}
