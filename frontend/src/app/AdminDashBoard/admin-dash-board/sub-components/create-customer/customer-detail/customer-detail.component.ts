import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CustomerService} from "../../../../../service/customer.service";

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {
  public CustomerNic;
  public n;

  constructor(private route: ActivatedRoute, private customerService: CustomerService) { }

  ngOnInit(): void {

    let id = (this.route.snapshot.paramMap.get('id'));
    let i = (this.route.snapshot.paramMap.get('CustomerNic'));
    this.CustomerNic = id;
    this.n = i;
  }


}
