import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccessService } from '../../../service/access.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  loading = false;
  cont: Array<any>[] = [];
  currentDate = new Date();
  name: any;
  @Output() public sidenavToggle = new EventEmitter();
  role: any;
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
    this.role = values.userRole;
    console.log(this.name);
  }

  onToogleSlidenav() {
    this.sidenavToggle.emit();
  }
  logOut() {
    if (confirm('Do You want to log out? ?')) {
      this.onSucess('You are log out!');
      this.cookieService.remove('adminData');
      this.refresh();
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
