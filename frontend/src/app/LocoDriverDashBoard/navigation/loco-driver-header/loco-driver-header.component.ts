import { AccessService } from 'src/app/service/access.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-loco-driver-header',
  templateUrl: './loco-driver-header.component.html',
  styleUrls: ['./loco-driver-header.component.css'],
})
export class LocoDriverHeaderComponent implements OnInit {
  loading = false;
  cont: Array<any>[] = [];
  currentDate = new Date();
  name: any;
  @Output() public sidenavToggle = new EventEmitter();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private accessService: AccessService,
    private toastr: ToastrService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    const values = JSON.parse(localStorage.getItem('currentUser'));
    this.name = values.userName;
    console.log(this.name);
  }

  onToogleSlidenav() {
    this.sidenavToggle.emit();
  }
  logOut() {
    if (confirm('Do You want to log out? ?')) {
      this.onSucess('You are log out!');
      this.cookieService.remove('driverData');
      this.router.navigate(['/']);
      //this.refresh();
    }
  }

  onSucess(message: string) {
    this.toastr.success(message, 'Success');
  }
  refresh(): void {
    window.location.reload();
  }
  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/'], { relativeTo: this.route });
  }
}
