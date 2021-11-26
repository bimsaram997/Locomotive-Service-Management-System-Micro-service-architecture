import { Injectable } from '@angular/core';
import LocoScheduleDTO from '../dto/LocoScheduleDTO';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  myUrl = environment.baseUrlTwo;
  constructor(private http: HttpClient) {}
  public saveSchedule(dto: LocoScheduleDTO): Observable<any> {
    return this.http.post(this.myUrl + 'scheduleRoute/saveSchedule', {
      scheduleNo: dto.scheduleNo,
      scheduleUpdate: dto.scheduleUpdate,
      locoCatId: dto.locoCatId,
      locoNumber: dto.locoNumber,
      userNic: dto.userNic,
      userName: dto.userName,
      userEmail: dto.userEmail,
      scheduleStatus: dto.scheduleStatus,
      scheduleCom: dto.scheduleCom,
      scheduleTrackMotors: dto.scheduleTrackMotors,
      scheduleLocoBody: dto.scheduleLocoBody,
      scheduleElCuUnit: dto.scheduleElCuUnit,
      scheduleEMechanical: dto.scheduleEMechanical,
      scheduleMach: dto.scheduleMach,
      scheduleRemark: dto.scheduleRemark,
    });
  }

  public saveOfSchedule(obj): Observable<any> {
    return this.http.post(this.myUrl + 'scheduleRoute/saveSchedule', obj);
  }

  public getAllSchedules(): Observable<any> {
    return this.http.get(this.myUrl + 'scheduleRoute/getAllSchedules');
  }

  public getAllScheduleAssigned(object): Observable<any> {
    return this.http.get(this.myUrl + `scheduleRoute/getAllScheduleAssigned/`, {
      params: object,
    });
  }

  public getAllCompSchedule(object): Observable<any> {
    return this.http.get(this.myUrl + 'scheduleRoute/getAllCompSchedule/', {
      params: object,
    });
  }

  public deleteSchedule(id: string): Observable<any> {
    return this.http.delete(this.myUrl + 'scheduleRoute/deleteSchedule', {
      headers: { id },
    });
  }

  public getOneSchedule(scheduleNo: string): Observable<any> {
    return this.http.get<any>(
      this.myUrl + `scheduleRoute/getOneSchedule/${scheduleNo}`
    );
  }

  public getCurrentScheduleByLocoNumber(locoNumber): Observable<any> {
    return this.http.get<any>(
      this.myUrl + `scheduleRoute/getCurrentScheduleByLocoNumber/${locoNumber}`
    );
  }

  public updateSchedule(dto: LocoScheduleDTO): Observable<any> {
    return this.http.put(this.myUrl + 'scheduleRoute/updateSchedule', {
      scheduleNo: dto.scheduleNo,
      scheduleUpdate: dto.scheduleUpdate,
      locoCatId: dto.locoCatId,
      locoNumber: dto.locoNumber,
      userNic: dto.userNic,
      userName: dto.userName,
      userEmail: dto.userEmail,
      scheduleStatus: dto.scheduleStatus,
      scheduleCom: dto.scheduleCom,
      scheduleTrackMotors: dto.scheduleTrackMotors,
      scheduleLocoBody: dto.scheduleLocoBody,
      scheduleElCuUnit: dto.scheduleElCuUnit,
      scheduleEMechanical: dto.scheduleEMechanical,
      scheduleMach: dto.scheduleMach,
      scheduleRemark: dto.scheduleRemark,
    });
  }

  public getSchedule(customerNic: string): Observable<LocoScheduleDTO> {
    return this.http.get<LocoScheduleDTO>(
      this.myUrl + 'scheduleRoute/getSchedule/: id',
      { headers: { customerNic } }
    );
  }

  public getMySampleData(): Observable<any> {
    return this.http.get(this.myUrl + 'scheduleRoute/getSample');
  }

  public getSMS(): Observable<any> {
    return this.http.get(this.myUrl + 'scheduleRoute/sendSMS');
  }

  public sendOneSchedule(scheduleNo): Observable<any> {
    return this.http.get<any>(
      this.myUrl + `scheduleRoute/sendOneSchedule/${scheduleNo}`
    );
  }

  public patchMileage(scheduleNo, progressValue): Observable<any> {
    return this.http.patch(
      this.myUrl + `scheduleRoute/patchMileage/${scheduleNo}/${progressValue}`,
      scheduleNo,
      progressValue
    );
  }

  getRelevantProgress(id): Observable<any> {
    return this.http.get<any>(
      this.myUrl + `scheduleRoute/getProSchedule/${id}`
    );
  }

  public changeScheduleSeven(data): Observable<any> {
    return this.http.put(
      this.myUrl + `scheduleRoute/changeScheduleSeven`,
      data
    );
  }

  public assignedLoadTrial(data): Observable<any> {
    return this.http.put(this.myUrl + `scheduleRoute/assignedLoadTrial`, data);
  }

  public scheduleEmail(data): Observable<any> {
    return this.http.post(this.myUrl + `scheduleRoute/scheduleEmail`, data);
  }

  public scheduleLapseEmail(data): Observable<any> {
    return this.http.post(
      this.myUrl + `scheduleRoute/scheduleLapseEmail`,
      data
    );
  }

  public getAllScheduleCalendar(): Observable<any> {
    return this.http.get(this.myUrl + 'scheduleRoute/getAllScheduleCalendar');
  }

  public getAllScheduleAssignedManager(object): Observable<any> {
    return this.http.get(
      this.myUrl + `scheduleRoute/getAllScheduleAssignedManager/`,
      { params: object }
    );
  }

  //nextSchedules

  public saveNextSchedule(obj): Observable<any> {
    return this.http.post(this.myUrl + 'scheduleRoute/saveNextSchedule', obj);
  }
  public nextScheduleEmail(data): Observable<any> {
    return this.http.post(this.myUrl + `scheduleRoute/nextScheduleEmail`, data);
  }

  public getAllNextSchedules(locoNumber): Observable<any> {
    return this.http.get(
      this.myUrl + `scheduleRoute/getAllNextSchedules/${locoNumber}`
    );
  }

  public getAllNextSchedulesNotFilter(): Observable<any> {
    return this.http.get(
      this.myUrl + 'scheduleRoute/getAllNextSchedulesNotFilter'
    );
  }

  public sendOneNextSchedule(nxtSchId): Observable<any> {
    return this.http.get<any>(
      this.myUrl + `scheduleRoute/sendOneNextSchedule/${nxtSchId}`
    );
  }

  public changeStatusNextSchedule(data): Observable<any> {
    return this.http.put(
      this.myUrl + `scheduleRoute/changeStatusNextSchedule`,
      data
    );
  }

  public getNextAllSchedules(): Observable<any> {
    return this.http.get(this.myUrl + 'scheduleRoute/getNextAllSchedules');
  }
}
