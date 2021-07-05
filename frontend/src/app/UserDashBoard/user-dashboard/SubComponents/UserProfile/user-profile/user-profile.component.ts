import { Component, OnInit } from '@angular/core';
import {AccessService} from "../../../../../service/access.service";
import {ToastrService} from "ngx-toastr";
import LocoScheduleDTO from "../../../../../dto/LocoScheduleDTO";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  subject = '';
  email = '';
  text = '';
  receive = '';
  isVisible =  false;


  constructor(private accessService: AccessService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  sendMail() {
    this.accessService.sendEmail(
      this.email,
      this.receive,
      this.subject,
      this.text
      ).subscribe(result => {
      if (result){
        console.log(this.email,
          this.receive,
          this.subject,
          this.text);
        this.onSucess('Sent');
        this.refresh();

      }else{

        this.refresh();
      }
    });
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
  setState(){
    this.isVisible = !this.isVisible;

  }
  view() {
    const btn = document.getElementById('btn-pop-up') as HTMLElement;
    btn.click();
  }
}
