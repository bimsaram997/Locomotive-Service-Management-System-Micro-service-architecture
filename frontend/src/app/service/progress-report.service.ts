import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})

export class ProgressReportService {
  myUrl = environment.baseUrlTwo;
  private  currntUserSubject :BehaviorSubject<any>;
  public currentUser:Observable<any>;
  constructor(private http: HttpClient) { }

  public sendProReport(body): Observable<any>{
    return this.http.post(this.myUrl + 'progressRoute/sendProReport', body);
  }
  public  sendProEmail(managerEmail: string, scheduleNo: string): Observable<any>{
    return this.http.post(this.myUrl + 'progressRoute/sendProEmail', {
    managerEmail,
      scheduleNo
    });
  }
  public saveProgress(obj): Observable<any>{
    return this.http.post(this.myUrl + 'progressRoute/saveProgress' , obj);
  }
}
