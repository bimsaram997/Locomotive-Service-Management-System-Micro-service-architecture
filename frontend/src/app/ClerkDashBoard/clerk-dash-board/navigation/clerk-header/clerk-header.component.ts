import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AccessService} from "../../../../service/access.service";
import {ToastrService} from "ngx-toastr";
import {CookieService} from "ngx-cookie";

@Component({
  selector: 'app-clerk-header',
  templateUrl: './clerk-header.component.html',
  styleUrls: ['./clerk-header.component.css']
})
export class ClerkHeaderComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();
  @Input() public resultGridList = '';
 loading =  false;
  cont: Array<any>[] = [];
  currentDate = new Date();
  name: any;
  constructor(private router: Router, private route: ActivatedRoute,
              private accessService: AccessService,
              private toastr: ToastrService,
              private cookieService: CookieService) { }

  ngOnInit(): void {
     const values =  JSON.parse( localStorage.getItem('currentUser'));
    this.name = values.userName
    console.log(this.name)
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
