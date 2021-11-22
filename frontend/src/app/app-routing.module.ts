import { UserAnalysisComponent } from './UserDashBoard/user-dashboard/SubComponents/user-analysis/user-analysis.component';
import { ViewDriverLocoProfileComponent } from './LocoDriverDashBoard/loco-driver-dashboard/Sub Components/view-driver-loco-profile/view-driver-loco-profile.component';
import { ViewDriverLocoComponent } from './LocoDriverDashBoard/loco-driver-dashboard/Sub Components/view-driver-loco/view-driver-loco.component';
import { LocoDriverDashboardComponent } from './LocoDriverDashBoard/loco-driver-dashboard/loco-driver-dashboard.component';
import { AdminViewUsersComponent } from './AdminDashBoard/admin-dash-board/sub-components/admin-view-users/admin-view-users.component';
import { ClerkViewOneMileageComponent } from './ClerkDashBoard/clerk-dash-board/SubComponents/ViewMileage/clerk-view-one-mileage/clerk-view-one-mileage.component';
import { ClerkScheduleProfileComponent } from './ClerkDashBoard/clerk-dash-board/SubComponents/Schedules/clerk-schedule-profile/clerk-schedule-profile.component';
import { ClerkViewSchedulesComponent } from './ClerkDashBoard/clerk-dash-board/SubComponents/Schedules/clerk-view-schedules/clerk-view-schedules.component';
import { ClerkViewLocomotivesComponent } from './ClerkDashBoard/clerk-dash-board/SubComponents/clerk-view-locomotives/clerk-view-locomotives.component';
import { ClerkProfileComponent } from './ClerkDashBoard/clerk-dash-board/SubComponents/clerk-profile/clerk-profile.component';
import { ManagerprofileComponent } from './ServiceManagerDashBoard/manager-dashboard/Subcomps/managerprofile/managerprofile.component';
import { ViewOneMileageComponent } from './Common/view-one-mileage/view-one-mileage.component';
import { ViewAdLoadTrialComponent } from './AdminDashBoard/admin-dash-board/sub-components/Load Trials/view-ad-load-trial/view-ad-load-trial.component';
import { MViewLocomotiveComponent } from './ServiceManagerDashBoard/manager-dashboard/Subcomps/Locomotives/m-view-locomotive/m-view-locomotive.component';
import { ViewManLoadProComponent } from './ServiceManagerDashBoard/manager-dashboard/Subcomps/View-loadTrials/view-man-load-pro/view-man-load-pro.component';
import { ViewManLoadComponent } from './ServiceManagerDashBoard/manager-dashboard/Subcomps/View-loadTrials/view-man-load/view-man-load.component';
import { ViewLoadProfComponent } from './UserDashBoard/user-dashboard/SubComponents/load-trail/view-load-trials/view-load-prof/view-load-prof.component';
import { ViewLoadTrialsComponent } from './UserDashBoard/user-dashboard/SubComponents/load-trail/view-load-trials/view-load-trials.component';
import { ViewProgressReportComponent } from './UserDashBoard/user-dashboard/SubComponents/Schedules/view-schedules/view-progress-report/view-progress-report.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashBoardComponent } from './AdminDashBoard/admin-dash-board/admin-dash-board.component';
import { LoginAndSignupComponent } from './root/login-and-signup/login-and-signup.component';
import { CreateCustomerComponent } from './AdminDashBoard/admin-dash-board/sub-components/create-customer/create-customer.component';
import { UpdateCustomerComponent } from './AdminDashBoard/admin-dash-board/sub-components/update-customer/update-customer.component';
import { CreateLocomotiveComponent } from './AdminDashBoard/admin-dash-board/sub-components/Locomotives/create-locomotive/create-locomotive.component';
import { CustomerDetailComponent } from './AdminDashBoard/admin-dash-board/sub-components/create-customer/customer-detail/customer-detail.component';
import { ViewLocomotivesComponent } from './AdminDashBoard/admin-dash-board/sub-components/Locomotives/view-locomotives/view-locomotives.component';
import { UserDashboardComponent } from './UserDashBoard/user-dashboard/user-dashboard.component';
import { CreateScheduleComponent } from './UserDashBoard/user-dashboard/SubComponents/Schedules/create-schedule/create-schedule.component';
import { ViewSchedulesComponent } from './UserDashBoard/user-dashboard/SubComponents/Schedules/view-schedules/view-schedules.component';
import { AdminViewScehdulesComponent } from './AdminDashBoard/admin-dash-board/sub-components/Schedules/admin-view-scehdules/admin-view-scehdules.component';
import { UserViewLocomotivesComponent } from './UserDashBoard/user-dashboard/SubComponents/Locomotives/user-view-locomotives/user-view-locomotives.component';
//import {SignUpUserComponent} from "./AdminDashBoard/admin-dash-board/sub-components/Users/sign-up-user/sign-up-user.component";
import { AuthGuard } from './auth.guard';
import { AdminAuthGuardGuard } from './admin-auth-guard.guard';
import { UserDashContentComponent } from './UserDashBoard/user-dashboard/SubComponents/user-dash-content/user-dash-content.component';
import { AdminDashContentComponent } from './AdminDashBoard/admin-dash-board/sub-components/admin-dash-content/admin-dash-content.component';
import { ClerkDashBoardComponent } from './ClerkDashBoard/clerk-dash-board/clerk-dash-board.component';
import { ClerkDashContentComponent } from './ClerkDashBoard/clerk-dash-board/SubComponents/clerk-dash-content/clerk-dash-content.component';
import { CreateUserComponent } from './ClerkDashBoard/clerk-dash-board/SubComponents/Users/create-user/create-user.component';
import { MainLoginPageComponent } from './Common/main-login-page/main-login-page.component';
import { UserProfileComponent } from './UserDashBoard/user-dashboard/SubComponents/UserProfile/user-profile/user-profile.component';
import { ForgotPasswordComponent } from './Common/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './ClerkDashBoard/clerk-dash-board/SubComponents/ResetPassword/reset-password/reset-password.component';
import { ViewUsersComponent } from './ClerkDashBoard/clerk-dash-board/SubComponents/Users/view-users/view-users.component';
import { ViewLocoProfileComponent } from './AdminDashBoard/admin-dash-board/sub-components/Locomotives/view-locomotives/view-loco-profile/view-loco-profile.component';
import { MileageReportComponent } from './ClerkDashBoard/clerk-dash-board/SubComponents/mileage-report/mileage-report.component';
import { ViewMileageComponent } from './AdminDashBoard/admin-dash-board/sub-components/view-mileage/view-mileage.component';
import { ManagerDashboardComponent } from './ServiceManagerDashBoard/manager-dashboard/manager-dashboard.component';
import { ManagerDashContentComponent } from './ServiceManagerDashBoard/manager-dashboard/Subcomps/manager-dash-content/manager-dash-content.component';
import { ViewMileagesComponent } from './ClerkDashBoard/clerk-dash-board/SubComponents/ViewMileage/view-mileages/view-mileages.component';
import { ClerkAuthoGuardGuard } from './clerk-autho-guard.guard';
import { RequestScheduleComponent } from './ServiceManagerDashBoard/manager-dashboard/Subcomps/request-schedule/request-schedule.component';
import { ViewManagerSchedulesComponent } from './ServiceManagerDashBoard/manager-dashboard/Subcomps/view-manager-schedules/view-manager-schedules.component';
import { EditReqScheduleComponent } from './ServiceManagerDashBoard/manager-dashboard/Subcomps/request-schedule/edit-req-schedule/edit-req-schedule.component';
import { ViewMoreSchedulesComponent } from './ServiceManagerDashBoard/manager-dashboard/Subcomps/view-manager-schedules/view-more-schedules/view-more-schedules.component';
import { AdminEditLocomotiveComponent } from './AdminDashBoard/admin-dash-board/sub-components/Locomotives/view-locomotives/admin-edit-locomotive/admin-edit-locomotive.component';
import { EditLocomotiveComponent } from './AdminDashBoard/admin-dash-board/sub-components/Locomotives/view-locomotives/edit-locomotive/edit-locomotive.component';
import { ViewLocoComponent } from './UserDashBoard/user-dashboard/SubComponents/Locomotives/user-view-locomotives/view-loco/view-loco.component';
import { AddLoadTrialComponent } from './UserDashBoard/user-dashboard/SubComponents/load-trail/add-load-trial/add-load-trial.component';
import { ViewScheduleProfileComponent } from './AdminDashBoard/admin-dash-board/sub-components/Schedules/ViewScheduleProfile/view-schedule-profile/view-schedule-profile.component';
import { ViewAdloadProComponent } from './AdminDashBoard/admin-dash-board/sub-components/Load Trials/view-adload-pro/view-adload-pro.component';
import { ResetPasswordCommonComponent } from './Common/reset-password/reset-password-common/reset-password-common.component';
import { AdminProfileComponent } from './AdminDashBoard/admin-dash-board/sub-components/admin-profile/admin-profile.component';
import { ClerkLocoProfileComponent } from './ClerkDashBoard/clerk-dash-board/SubComponents/clerk-view-locomotives/clerk-loco-profile/clerk-loco-profile.component';
import { MAnagerLocoProfileComponent } from './ServiceManagerDashBoard/manager-dashboard/Subcomps/Locomotives/m-view-locomotive/manager-loco-profile/manager-loco-profile.component';
import { AdminViewMoreUserComponent } from './AdminDashBoard/admin-dash-board/sub-components/admin-view-users/admin-view-more-user/admin-view-more-user.component';
import { DriverGuard } from './driver.guard';

const routes: Routes = [
  { path: '', component: LoginAndSignupComponent },
  { path: 'MainLogin', component: MainLoginPageComponent },
  { path: 'ForgetPassword', component: ForgotPasswordComponent },
  { path: 'resetPasswordCommon/:id', component: ResetPasswordCommonComponent },
  {
    path: 'adminDashboard',
    canActivate: [AdminAuthGuardGuard],
    component: AdminDashBoardComponent,
    children: [
      { path: 'adminDashContent', component: AdminDashContentComponent },
      { path: 'createCustomer', component: CreateCustomerComponent },
      { path: 'createCustomer', component: CreateCustomerComponent },
      { path: 'createLocomotive', component: CreateLocomotiveComponent },
      {
        path: 'customerDetail/:id/:CustomerNic',
        component: CustomerDetailComponent,
      },
      { path: 'viewLocomotives', component: ViewLocomotivesComponent },
      { path: 'adminViewSchedules', component: AdminViewScehdulesComponent },
      { path: 'viewLocoProfile', component: ViewLocoProfileComponent },
      { path: 'viewMileage', component: ViewMileageComponent },
      { path: 'EditLocomotive/:id', component: EditLocomotiveComponent },
      { path: 'viewLoco/:id', component: ViewLocoProfileComponent },
      {
        path: 'viewSchedule/:scheduleNo',
        component: ViewScheduleProfileComponent,
      },
      { path: 'viewProgress', component: ViewProgressReportComponent },
      { path: 'viewAdLoadTrial', component: ViewAdLoadTrialComponent },
      { path: 'viewAdLoadProd/:loadNo', component: ViewAdloadProComponent },
      { path: 'adminProfile', component: AdminProfileComponent },
      { path: 'viewOneMileage/:id', component: ViewOneMileageComponent },
      { path: 'adminViewUsers', component: AdminViewUsersComponent },
      { path: 'adminViewMoreUser/:id', component: AdminViewMoreUserComponent },
    ],
  },
  {
    path: 'userDashboard',
    canActivate: [AuthGuard],
    component: UserDashboardComponent,
    children: [
      { path: 'userDashContent', component: UserDashContentComponent },
      { path: 'createSchedule', component: CreateScheduleComponent },
      { path: 'viewSchedules', component: ViewSchedulesComponent },
      { path: 'userViewLocomotives', component: UserViewLocomotivesComponent },
      { path: 'userProfile', component: UserProfileComponent },
      { path: 'viewLoco/:id', component: ViewLocoComponent },
      { path: 'viewLocoPro/:locoNumber', component: ViewLocoComponent },
      { path: 'addLoadTrial', component: AddLoadTrialComponent },
      {
        path: 'viewSchedule/:scheduleNo',
        component: ViewScheduleProfileComponent,
      },
      { path: 'viewProgress', component: ViewProgressReportComponent },
      { path: 'viewLoad', component: ViewLoadTrialsComponent },
      { path: 'viewLoadProf/:loadNo', component: ViewLoadProfComponent },
      { path: 'userAnalysis', component: UserAnalysisComponent },
    ],
  },
  {
    path: 'clerkDashBoard',
    canActivate: [ClerkAuthoGuardGuard],
    component: ClerkDashBoardComponent,
    children: [
      { path: 'clerkDashContent', component: ClerkDashContentComponent },
      { path: 'createUser', component: CreateUserComponent },
      { path: 'viewUsers', component: ViewUsersComponent },
      { path: 'createCustomer', component: CreateCustomerComponent },
      {
        path: 'response-reset-password/:token',
        component: ResetPasswordComponent,
      },
      { path: 'createMileage', component: MileageReportComponent },
      { path: 'viewMileages', component: ViewMileagesComponent },
      { path: 'viewProgress', component: ViewProgressReportComponent },
      { path: 'viewLoco/:id', component: ClerkLocoProfileComponent },
      {
        path: 'clerkViewLocomotives',
        component: ClerkViewLocomotivesComponent,
      },
      { path: 'clerkProfile', component: ClerkProfileComponent },
      { path: 'viewSchedules', component: ClerkViewSchedulesComponent },
      {
        path: 'viewSchedule/:scheduleNo',
        component: ClerkScheduleProfileComponent,
      },
      { path: 'viewOneMileage/:id', component: ClerkViewOneMileageComponent },
    ],
  },
  {
    path: 'managerDashBoard',
    component: ManagerDashboardComponent,
    children: [
      { path: 'mDashContent', component: ManagerDashContentComponent },
      { path: 'viewMileage', component: ViewMileageComponent },
      { path: 'requestSchedule', component: RequestScheduleComponent },
      { path: 'createSchedule', component: CreateScheduleComponent },
      {
        path: 'viewManagerSchedules',
        component: ViewManagerSchedulesComponent,
      },
      { path: 'editSchedule', component: EditReqScheduleComponent },
      { path: 'viewMoreSchedule', component: ViewMoreSchedulesComponent },
      {
        path: 'viewSchedule/:scheduleNo',
        component: ViewScheduleProfileComponent,
      },
      { path: 'viewProgress', component: ViewProgressReportComponent },
      { path: 'viewManLoad', component: ViewManLoadComponent },
      { path: 'viewManLoadProf/:id', component: ViewManLoadProComponent },
      { path: 'mViewLocomotives', component: MViewLocomotiveComponent },
      { path: 'viewLoco/:id', component: MAnagerLocoProfileComponent },
      { path: 'viewProgress', component: ViewProgressReportComponent },
      {
        path: 'viewOneMileage/:mReportNumber',
        component: ViewOneMileageComponent,
      },
      { path: 'viewManSchedule/:id', component: ViewMoreSchedulesComponent },
      { path: 'managerProfile', component: ManagerprofileComponent },
    ],
  },

  {
    path: 'locoDriverDashBoard',
    canActivate: [DriverGuard],
    component: LocoDriverDashboardComponent,
    children: [
      { path: 'viewLocoDriver', component: ViewDriverLocoComponent },
      {
        path: 'viewLocoDriverProfile/:id',
        component: ViewDriverLocoProfileComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
