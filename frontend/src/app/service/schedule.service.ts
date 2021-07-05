import { Injectable } from '@angular/core';
import LocoScheduleDTO from '../dto/LocoScheduleDTO';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  myUrl = environment.baseUrlTwo;
  constructor(private http: HttpClient) { }
  public saveSchedule(dto: LocoScheduleDTO): Observable<any>{
    return this.http.post(this.myUrl + 'scheduleRoute/saveSchedule', {
      scheduleNo: dto.scheduleNo,
      scheduleUpdate: dto.scheduleUpdate,
      locoCatId: dto.locoCatId,
      locoNumber: dto.locoNumber,
      userNic: dto.userNic,
      userName: dto.userName,
      userEmail: dto.userEmail,
      scheduleStatus: dto. scheduleStatus,
      scheduleCom: dto. scheduleCom,
      scheduleTrackMotors: dto.scheduleTrackMotors,
      scheduleLocoBody: dto.scheduleLocoBody,
      scheduleElCuUnit: dto.scheduleElCuUnit,
      scheduleEMechanical: dto.scheduleEMechanical,
      scheduleMach: dto.scheduleMach,
      scheduleRemark: dto.scheduleRemark
    });
  }
  public saveOfSchedule(obj): Observable<any>{
    return this.http.post(this.myUrl + 'scheduleRoute/saveSchedule' , obj);
  }
  public getAllSchedules(): Observable<any> {
    return this.http.get(this.myUrl + 'scheduleRoute/getAllSchedules');
  }
  public deleteSchedule(id: string): Observable<any> {
    return this.http.delete( this.myUrl + 'scheduleRoute/deleteSchedule', {headers: {id}});

  }
  public getOneSchedule(id: string): Observable<any>{
    return this.http.get(this.myUrl + 'scheduleRoute/sendOneSchedule', {headers: {id}});

  }
  public updateSchedule(dto: LocoScheduleDTO): Observable<any> {
    return this.http.put( this.myUrl + 'scheduleRoute/updateSchedule', {
      scheduleNo: dto.scheduleNo,
      scheduleUpdate: dto.scheduleUpdate,
      locoCatId: dto.locoCatId,
      locoNumber: dto.locoNumber,
      userNic: dto.userNic,
      userName: dto.userName,
      userEmail: dto.userEmail,
      scheduleStatus: dto. scheduleStatus,
      scheduleCom: dto.scheduleCom,
      scheduleTrackMotors: dto.scheduleTrackMotors,
      scheduleLocoBody: dto.scheduleLocoBody,
      scheduleElCuUnit: dto.scheduleElCuUnit,
      scheduleEMechanical: dto.scheduleEMechanical,
      scheduleMach: dto.scheduleMach,
      scheduleRemark: dto.scheduleRemark
    });

  }
  public getSchedule(customerNic: string): Observable<LocoScheduleDTO>
  {
    return this.http.get<LocoScheduleDTO>(this.myUrl + 'scheduleRoute/getSchedule/: id',{headers: {customerNic}})
  }

  public getMySampleData(): Observable<any> {
    return this.http.get(this.myUrl + 'scheduleRoute/getSample');
  }
  public getSMS(): Observable<any> {
    return this.http.get(this.myUrl + 'scheduleRoute/sendSMS');
  }
  public sendOneSchedule(id): Observable<any>{
    return this.http.get<any>(this.myUrl + `scheduleRoute/sendOneSchedule/${id}`);
  }
  public patchMileage(scheduleNo, progressValue):Observable<any> {
    return this.http.patch( this.myUrl + `scheduleRoute/patchMileage/${scheduleNo}/${progressValue}` , scheduleNo, progressValue);
  }
}
