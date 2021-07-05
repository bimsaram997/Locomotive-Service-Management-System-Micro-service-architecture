import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import  {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import {MAT_RADIO_DEFAULT_OPTIONS, MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatCalendar, MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import {HttpClientModule} from '@angular/common/http';
import {MatPaginatorModule} from '@angular/material/paginator';
import {ToastrModule} from 'ngx-toastr';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDividerModule} from '@angular/material/divider';
import {MatSliderModule} from '@angular/material/slider';
import {CKEditorModule} from 'ckeditor4-angular';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSortModule} from '@angular/material/sort';
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatTableExporterModule} from 'mat-table-exporter';
import {OwlModule} from 'ngx-owl-carousel';
import {NgImageSliderModule} from "ng-image-slider";
import {MatCarouselModule} from "@ngmodule/material-carousel";
import {MatStepperModule} from "@angular/material/stepper";
import {MatTabsModule} from "@angular/material/tabs";
import {BrowserModule} from "@angular/platform-browser";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {TableVirtualScrollDataSource, TableVirtualScrollModule} from "ng-table-virtual-scroll";
import {CookieModule} from "ngx-cookie";
import {CalendarView} from "@angular/material/datepicker/testing";
import {FlexLayoutModule} from "@angular/flex-layout";
import {NgxEventCalendarModule} from "ngx-event-calendar";
import {FullCalendarModule} from "@fullcalendar/angular";
import {CommonModule} from "@angular/common";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {NgImageFullscreenViewModule} from "ng-image-fullscreen-view";
import {MatExpansionModule} from "@angular/material/expansion";




const MaterialComponents = [
  MatButtonModule,
  MatCheckboxModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  FormsModule,
  ReactiveFormsModule,
  MatGridListModule,
  MatRadioModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTableModule,
  HttpClientModule,
  DragDropModule,
  MatPaginatorModule,
  ToastrModule.forRoot({
    timeOut: 3000,
    positionClass: 'toast-top-right',
    preventDuplicates: true,
  }),
  MatDialogModule,
  MatProgressBarModule,
  MatDividerModule,
  MatSliderModule,
  CKEditorModule,
  MatAutocompleteModule,
  MatListModule,
  MatSortModule,
  MatCheckboxModule,
  MatOptionModule,
  MatTooltipModule,
  MatCardModule,
  MatTableExporterModule,
  MatCarouselModule.forRoot(),
  MatStepperModule,
  MatTabsModule,
  BrowserModule,
  MatProgressSpinnerModule,
  CookieModule.forRoot(),
  FlexLayoutModule,
  NgxEventCalendarModule,
  CommonModule,
  NgImageFullscreenViewModule,
  MatExpansionModule







];
@NgModule({
  imports: [
    MaterialComponents

  ],
  exports: [
    MaterialComponents
  ],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
  }]
})
export class MaterialModule {

}
