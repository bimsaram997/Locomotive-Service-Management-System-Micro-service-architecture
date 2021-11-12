import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AdminDashBoardComponent } from './AdminDashBoard/admin-dash-board/admin-dash-board.component';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './AdminDashBoard/navigation/header/header.component';
import { SidenavListComponent } from './AdminDashBoard/navigation/sidenav-list/sidenav-list.component';
import { LoginAndSignupComponent } from './root/login-and-signup/login-and-signup.component';
import { CreateCustomerComponent } from './AdminDashBoard/admin-dash-board/sub-components/create-customer/create-customer.component';
import { UpdateCustomerComponent } from './AdminDashBoard/admin-dash-board/sub-components/update-customer/update-customer.component';
import { ModelComponent } from './AdminDashBoard/admin-dash-board/sub-components/create-customer/model/model.component';
import { CreateLocomotiveComponent } from './AdminDashBoard/admin-dash-board/sub-components/Locomotives/create-locomotive/create-locomotive.component';
import { CustomerDetailComponent } from './AdminDashBoard/admin-dash-board/sub-components/create-customer/customer-detail/customer-detail.component';
import { ViewLocomotivesComponent } from './AdminDashBoard/admin-dash-board/sub-components/Locomotives/view-locomotives/view-locomotives.component';
import { UserDashboardComponent } from './UserDashBoard/user-dashboard/user-dashboard.component';
import { UserHeaderComponent } from './UserDashBoard/user-dashboard/navigation/user-header/user-header.component';
import { UserSideNavComponent } from './UserDashBoard/user-dashboard/navigation/user-side-nav/user-side-nav.component';
import { CreateScheduleComponent } from './UserDashBoard/user-dashboard/SubComponents/Schedules/create-schedule/create-schedule.component';
import { ViewSchedulesComponent } from './UserDashBoard/user-dashboard/SubComponents/Schedules/view-schedules/view-schedules.component';
import { AdminViewScehdulesComponent } from './AdminDashBoard/admin-dash-board/sub-components/Schedules/admin-view-scehdules/admin-view-scehdules.component';
import { UserViewLocomotivesComponent } from './UserDashBoard/user-dashboard/SubComponents/Locomotives/user-view-locomotives/user-view-locomotives.component';
import { MatTableExporterModule } from 'mat-table-exporter';

import { UserDashContentComponent } from './UserDashBoard/user-dashboard/SubComponents/user-dash-content/user-dash-content.component';
import { AdminDashContentComponent } from './AdminDashBoard/admin-dash-board/sub-components/admin-dash-content/admin-dash-content.component';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { HomeComponent } from './UserDashBoard/user-dashboard/SubComponents/home/home.component';

import { ClerkDashBoardComponent } from './ClerkDashBoard/clerk-dash-board/clerk-dash-board.component';
import { ClerkHeaderComponent } from './ClerkDashBoard/clerk-dash-board/navigation/clerk-header/clerk-header.component';
import { ClerkSideNavComponent } from './ClerkDashBoard/clerk-dash-board/navigation/clerk-side-nav/clerk-side-nav.component';
import { ClerkDashContentComponent } from './ClerkDashBoard/clerk-dash-board/SubComponents/clerk-dash-content/clerk-dash-content.component';
import { CreateUserComponent } from './ClerkDashBoard/clerk-dash-board/SubComponents/Users/create-user/create-user.component';
import { MainLoginPageComponent } from './Common/main-login-page/main-login-page.component';
import { CommonHeaderComponent } from './Common/common-header/common-header.component';
import { UserProfileComponent } from './UserDashBoard/user-dashboard/SubComponents/UserProfile/user-profile/user-profile.component';
import { ViewLocoComponent } from './UserDashBoard/user-dashboard/SubComponents/Locomotives/user-view-locomotives/view-loco/view-loco.component';
import { EditLocoComponent } from './UserDashBoard/user-dashboard/SubComponents/Locomotives/user-view-locomotives/edit-loco/edit-loco.component';
import { EventEmitterService } from './service/event-emitter.service';
import { ForgotPasswordComponent } from './Common/forgot-password/forgot-password.component';
import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
} from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordComponent } from './ClerkDashBoard/clerk-dash-board/SubComponents/ResetPassword/reset-password/reset-password.component';
import { AdminEditLocomotiveComponent } from './AdminDashBoard/admin-dash-board/sub-components/Locomotives/view-locomotives/admin-edit-locomotive/admin-edit-locomotive.component';
import { ViewImageComponent } from './UserDashBoard/user-dashboard/SubComponents/Locomotives/user-view-locomotives/view-image/view-image.component';
import { ViewUsersComponent } from './ClerkDashBoard/clerk-dash-board/SubComponents/Users/view-users/view-users.component';
import { EditUserComponent } from './ClerkDashBoard/clerk-dash-board/SubComponents/Users/view-users/edit-user/edit-user.component';
import { ViewLocoProfileComponent } from './AdminDashBoard/admin-dash-board/sub-components/Locomotives/view-locomotives/view-loco-profile/view-loco-profile.component';
import { MileageReportComponent } from './ClerkDashBoard/clerk-dash-board/SubComponents/mileage-report/mileage-report.component';
import { ViewMileageComponent } from './AdminDashBoard/admin-dash-board/sub-components/view-mileage/view-mileage.component';
import { ConfirmDialogComponent } from './AdminDashBoard/admin-dash-board/sub-components/view-mileage/confirm-dialog/confirm-dialog.component';
import { RejectDialogComponent } from './AdminDashBoard/admin-dash-board/sub-components/view-mileage/reject-dialog/reject-dialog.component';
import { ManagerDashboardComponent } from './ServiceManagerDashBoard/manager-dashboard/manager-dashboard.component';
import { ManagerDashContentComponent } from './ServiceManagerDashBoard/manager-dashboard/Subcomps/manager-dash-content/manager-dash-content.component';
import { ManagerSideNavComponent } from './ServiceManagerDashBoard/manager-dashboard/navigation/manager-side-nav/manager-side-nav.component';
import { ManagerHeaderComponent } from './ServiceManagerDashBoard/manager-dashboard/navigation/manager-header/manager-header.component';
import { ViewMileagesComponent } from './ClerkDashBoard/clerk-dash-board/SubComponents/ViewMileage/view-mileages/view-mileages.component';
import { RequestScheduleComponent } from './ServiceManagerDashBoard/manager-dashboard/Subcomps/request-schedule/request-schedule.component';
import { ViewManagerSchedulesComponent } from './ServiceManagerDashBoard/manager-dashboard/Subcomps/view-manager-schedules/view-manager-schedules.component';
import { SendProgressComponent } from './UserDashBoard/user-dashboard/SubComponents/Schedules/view-schedules/send-progress/send-progress.component';
import { EditReqScheduleComponent } from './ServiceManagerDashBoard/manager-dashboard/Subcomps/request-schedule/edit-req-schedule/edit-req-schedule.component';
import { ViewMoreSchedulesComponent } from './ServiceManagerDashBoard/manager-dashboard/Subcomps/view-manager-schedules/view-more-schedules/view-more-schedules.component';
import { EditLocomotiveComponent } from './AdminDashBoard/admin-dash-board/sub-components/Locomotives/view-locomotives/edit-locomotive/edit-locomotive.component';
import { AddLoadTrialComponent } from './UserDashBoard/user-dashboard/SubComponents/load-trail/add-load-trial/add-load-trial.component';
import { UpdateFinalMileageComponent } from './UserDashBoard/user-dashboard/SubComponents/load-trail/update-final-mileage/update-final-mileage.component';
import { ViewScheduleProfileComponent } from './AdminDashBoard/admin-dash-board/sub-components/Schedules/ViewScheduleProfile/view-schedule-profile/view-schedule-profile.component';
import { ViewProgressReportComponent } from './UserDashBoard/user-dashboard/SubComponents/Schedules/view-schedules/view-progress-report/view-progress-report.component';
import { ViewMoreProgressComponent } from './UserDashBoard/user-dashboard/SubComponents/Schedules/view-schedules/view-progress-report/view-more-progress/view-more-progress.component';
import { ViewLoadTrialsComponent } from './UserDashBoard/user-dashboard/SubComponents/load-trail/view-load-trials/view-load-trials.component';
import { ViewLoadProfComponent } from './UserDashBoard/user-dashboard/SubComponents/load-trail/view-load-trials/view-load-prof/view-load-prof.component';
import { ViewManLoadComponent } from './ServiceManagerDashBoard/manager-dashboard/Subcomps/View-loadTrials/view-man-load/view-man-load.component';
import { ViewManLoadProComponent } from './ServiceManagerDashBoard/manager-dashboard/Subcomps/View-loadTrials/view-man-load-pro/view-man-load-pro.component';
import { MViewLocomotiveComponent } from './ServiceManagerDashBoard/manager-dashboard/Subcomps/Locomotives/m-view-locomotive/m-view-locomotive.component';
import { ViewAdLoadTrialComponent } from './AdminDashBoard/admin-dash-board/sub-components/Load Trials/view-ad-load-trial/view-ad-load-trial.component';
import { AddCommentLoadComponent } from './AdminDashBoard/admin-dash-board/sub-components/Load Trials/view-ad-load-trial/add-comment-load/add-comment-load.component';
import { ViewAdloadProComponent } from './AdminDashBoard/admin-dash-board/sub-components/Load Trials/view-adload-pro/view-adload-pro.component';
import { AddFeedBacksComponent } from './UserDashBoard/user-dashboard/SubComponents/load-trail/view-load-trials/add-feed-backs/add-feed-backs.component';
import { ViewFeedBacksComponent } from './UserDashBoard/user-dashboard/SubComponents/load-trail/view-load-trials/view-load-prof/view-feed-backs/view-feed-backs.component';
import { ViewProgressComponent } from './UserDashBoard/user-dashboard/SubComponents/Schedules/view-schedules/view-progress/view-progress.component';
import { ResetPasswordCommonComponent } from './Common/reset-password/reset-password-common/reset-password-common.component';
import { ViewOneMileageComponent } from './Common/view-one-mileage/view-one-mileage.component';
import { AppCardsComponent } from './Common/app-cards/app-cards.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { ViewMangerScheduleComponent } from './UserDashBoard/user-dashboard/SubComponents/Schedules/view-manger-schedule/view-manger-schedule.component';
import { ViewAllLocoBarChartComponent } from './Common/Graphs/Locomotives/view-all-loco-bar-chart/view-all-loco-bar-chart.component';
import { ChartsModule } from 'ng2-charts';
import { AdminProfileComponent } from './AdminDashBoard/admin-dash-board/sub-components/admin-profile/admin-profile.component';
import { LoadTrialDohNutComponent } from './AdminDashBoard/admin-dash-board/sub-components/admin-profile/Charts/load-trial-doh-nut/load-trial-doh-nut.component';
import { CommnetsDohNutComponent } from './AdminDashBoard/admin-dash-board/sub-components/admin-profile/Charts/commnets-doh-nut/commnets-doh-nut.component';
import { LocomotiveDohNutComponent } from './UserDashBoard/user-dashboard/SubComponents/UserProfile/Charts/locomotive-doh-nut/locomotive-doh-nut.component';
import { ScheduleDohNutComponent } from './UserDashBoard/user-dashboard/SubComponents/UserProfile/Charts/schedule-doh-nut/schedule-doh-nut.component';
import { ComposComponent } from './AdminDashBoard/admin-dash-board/sub-components/admin-profile/Charts/compos/compos.component';
import { UserLoadTrialDohNutComponent } from './UserDashBoard/user-dashboard/SubComponents/UserProfile/Charts/user-load-trial-doh-nut/user-load-trial-doh-nut.component';
import { UserPerformanceLineComponent } from './UserDashBoard/user-dashboard/SubComponents/UserProfile/Charts/user-performance-line/user-performance-line.component';
import { ManagerprofileComponent } from './ServiceManagerDashBoard/manager-dashboard/Subcomps/managerprofile/managerprofile.component';
import { MileageDohNutComponent } from './ServiceManagerDashBoard/manager-dashboard/Subcomps/managerprofile/Charts/mileage-doh-nut/mileage-doh-nut.component';
import { SchedulePieComponent } from './ServiceManagerDashBoard/manager-dashboard/Subcomps/managerprofile/Charts/schedule-pie/schedule-pie.component';
import { ViewHistoryLocoComponent } from './UserDashBoard/user-dashboard/SubComponents/Locomotives/user-view-locomotives/view-loco/view-history-loco/view-history-loco.component';
import { ClerkProfileComponent } from './ClerkDashBoard/clerk-dash-board/SubComponents/clerk-profile/clerk-profile.component';
import { ClerkViewLocomotivesComponent } from './ClerkDashBoard/clerk-dash-board/SubComponents/clerk-view-locomotives/clerk-view-locomotives.component';
import { ClerkLocoProfileComponent } from './ClerkDashBoard/clerk-dash-board/SubComponents/clerk-view-locomotives/clerk-loco-profile/clerk-loco-profile.component';
import { ClerkViewSchedulesComponent } from './ClerkDashBoard/clerk-dash-board/SubComponents/Schedules/clerk-view-schedules/clerk-view-schedules.component';
import { ClerkScheduleProfileComponent } from './ClerkDashBoard/clerk-dash-board/SubComponents/Schedules/clerk-schedule-profile/clerk-schedule-profile.component';
import { ViewNextSchedulesComponent } from './ClerkDashBoard/clerk-dash-board/SubComponents/mileage-report/view-next-schedules/view-next-schedules.component';
import { MAT_BOTTOM_SHEET_DEFAULT_OPTIONS } from '@angular/material/bottom-sheet';
import { ClerkViewOneMileageComponent } from './ClerkDashBoard/clerk-dash-board/SubComponents/ViewMileage/clerk-view-one-mileage/clerk-view-one-mileage.component';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MAnagerLocoProfileComponent } from './ServiceManagerDashBoard/manager-dashboard/Subcomps/Locomotives/m-view-locomotive/manager-loco-profile/manager-loco-profile.component';
import { AdminViewUsersComponent } from './AdminDashBoard/admin-dash-board/sub-components/admin-view-users/admin-view-users.component';
import { AdminViewMoreUserComponent } from './AdminDashBoard/admin-dash-board/sub-components/admin-view-users/admin-view-more-user/admin-view-more-user.component';
import { ViewAssignedLocosComponent } from './AdminDashBoard/admin-dash-board/sub-components/admin-view-users/ViewItems/view-assigned-locos/view-assigned-locos.component';
import { ViewAssigedSchedulesComponent } from './AdminDashBoard/admin-dash-board/sub-components/admin-view-users/ViewItems/view-assiged-schedules/view-assiged-schedules.component';
import { ViewAssigedMileagesComponent } from './AdminDashBoard/admin-dash-board/sub-components/admin-view-users/ViewItems/view-assiged-mileages/view-assiged-mileages.component';
import { ViewIssuedLoadTrialsComponent } from './AdminDashBoard/admin-dash-board/sub-components/admin-view-users/ViewItems/view-issued-load-trials/view-issued-load-trials.component';
import { LocoDriverDashboardComponent } from './LocoDriverDashBoard/loco-driver-dashboard/loco-driver-dashboard.component';
import { LocoDriverHeaderComponent } from './LocoDriverDashBoard/navigation/loco-driver-header/loco-driver-header.component';
import { ViewDriverLocoComponent } from './LocoDriverDashBoard/loco-driver-dashboard/Sub Components/view-driver-loco/view-driver-loco.component';
import { ViewDriverLocoProfileComponent } from './LocoDriverDashBoard/loco-driver-dashboard/Sub Components/view-driver-loco-profile/view-driver-loco-profile.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChartViewComponent } from './Common/Graphs/Locomotives/chart-view/chart-view.component';
import { LocoPerformceComponent } from './Common/performance/loco-performce/loco-performce.component';
FullCalendarModule.registerPlugins([interactionPlugin, dayGridPlugin]);

@NgModule({
  declarations: [
    AppComponent,
    AdminDashBoardComponent,
    HeaderComponent,
    SidenavListComponent,
    LoginAndSignupComponent,
    CreateCustomerComponent,
    UpdateCustomerComponent,
    ModelComponent,
    CreateLocomotiveComponent,
    CustomerDetailComponent,
    ViewLocomotivesComponent,
    UserDashboardComponent,
    UserHeaderComponent,
    UserSideNavComponent,
    CreateScheduleComponent,
    ViewSchedulesComponent,
    AdminViewScehdulesComponent,
    UserViewLocomotivesComponent,
    UserDashContentComponent,
    AdminDashContentComponent,
    HomeComponent,

    ClerkDashBoardComponent,
    ClerkHeaderComponent,
    ClerkSideNavComponent,
    ClerkDashContentComponent,
    CreateUserComponent,
    MainLoginPageComponent,
    CommonHeaderComponent,
    UserProfileComponent,
    ViewLocoComponent,
    EditLocoComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    AdminEditLocomotiveComponent,
    ViewImageComponent,
    ViewUsersComponent,
    EditUserComponent,
    ViewLocoProfileComponent,
    MileageReportComponent,
    ViewMileageComponent,
    ConfirmDialogComponent,
    RejectDialogComponent,
    ManagerDashboardComponent,
    ManagerDashContentComponent,
    ManagerSideNavComponent,
    ManagerHeaderComponent,
    ViewMileagesComponent,
    RequestScheduleComponent,
    ViewManagerSchedulesComponent,
    SendProgressComponent,
    EditReqScheduleComponent,
    ViewMoreSchedulesComponent,
    EditLocomotiveComponent,

    AddLoadTrialComponent,

    UpdateFinalMileageComponent,

    ViewScheduleProfileComponent,

    ViewProgressReportComponent,

    ViewMoreProgressComponent,

    ViewLoadTrialsComponent,

    ViewLoadProfComponent,

    ViewManLoadComponent,

    ViewManLoadProComponent,

    MViewLocomotiveComponent,

    ViewAdLoadTrialComponent,

    AddCommentLoadComponent,

    ViewAdloadProComponent,

    AddFeedBacksComponent,

    ViewFeedBacksComponent,

    ViewProgressComponent,

    ResetPasswordCommonComponent,

    ViewOneMileageComponent,

    AppCardsComponent,

    ViewMangerScheduleComponent,

    ViewAllLocoBarChartComponent,

    AdminProfileComponent,

    LoadTrialDohNutComponent,

    CommnetsDohNutComponent,

    LocomotiveDohNutComponent,

    ScheduleDohNutComponent,

    ComposComponent,

    UserLoadTrialDohNutComponent,

    UserPerformanceLineComponent,

    ManagerprofileComponent,

    MileageDohNutComponent,

    SchedulePieComponent,

    ViewHistoryLocoComponent,

    ClerkProfileComponent,

    ClerkViewLocomotivesComponent,

    ClerkLocoProfileComponent,

    ClerkViewSchedulesComponent,

    ClerkScheduleProfileComponent,

    ViewNextSchedulesComponent,

    ClerkViewOneMileageComponent,

    MAnagerLocoProfileComponent,

    AdminViewUsersComponent,

    AdminViewMoreUserComponent,

    ViewAssignedLocosComponent,

    ViewAssigedSchedulesComponent,

    ViewAssigedMileagesComponent,

    ViewIssuedLoadTrialsComponent,

    LocoDriverDashboardComponent,

    LocoDriverHeaderComponent,

    ViewDriverLocoComponent,

    ViewDriverLocoProfileComponent,

    ChartViewComponent,

    LocoPerformceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    FullCalendarModule,
    ChartsModule,
    PdfViewerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [EventEmitterService],
  bootstrap: [AppComponent],
  entryComponents: [
    ModelComponent,
    ViewHistoryLocoComponent,
    AddFeedBacksComponent,
    ViewProgressComponent,
    ViewFeedBacksComponent,
    ViewMoreProgressComponent,
    EditLocoComponent,
    ViewImageComponent,
    ConfirmDialogComponent,
    RejectDialogComponent,
    SendProgressComponent,
    UpdateFinalMileageComponent,
    ViewNextSchedulesComponent,
    AddCommentLoadComponent,
    LocoPerformceComponent,
  ],
})
export class AppModule {}
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
