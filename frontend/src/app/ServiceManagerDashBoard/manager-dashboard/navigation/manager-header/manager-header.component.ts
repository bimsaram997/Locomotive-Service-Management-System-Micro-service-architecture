import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AccessService} from "../../../../service/access.service";
import {ToastrService} from "ngx-toastr";
import {CookieService} from "ngx-cookie";

@Component({
  selector: 'app-manager-header',
  templateUrl: './manager-header.component.html',
  styleUrls: ['./manager-header.component.css']
})
export class ManagerHeaderComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();
  @Input() public resultGridList = '';
  data = '';
  constructor(private router: Router, private route: ActivatedRoute,
              private accessService: AccessService,
              private toastr: ToastrService,
              private cookieService: CookieService) { }

  ngOnInit(): void {
  }
  onToogleSlidenav() {
    this.sidenavToggle.emit();
  }
  logOut(){

    if (confirm('Do You want to log out? ?')){
      this.onSucess('You are log out!');
      this.cookieService.remove('clerkData');
      this.router.navigate(['/']);
      //this.refresh()

    }
  }
  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/'],{relativeTo:this.route});

  }

  onSucess(message: string){
    this.toastr.success(message, 'Success');
  }
  refresh(): void {
    window.location.reload();
  }

}
