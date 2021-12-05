import { Injectable } from '@angular/core';
import LocoDTO from '../dto/LocoDTO';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocomotiveService {
  myUrl = environment.baseUrlOne;
  constructor(private http: HttpClient) {}

  public saveLoco(dto: LocoDTO): Observable<any> {
    return this.http.post(this.myUrl + 'locoRoute/saveLoco', {
      locoCatId: dto.locoCatId,
      locoPower: dto.locoPower,
      locoNumber: dto.locoNumber,
      locoAvailability: dto.locoAvailability,
      locoMileage: dto.locoMileage,
      userNic: dto.userNic,
      locoDate: dto.locoDate,
      locoOil: dto.locoOil,
      locoFuel: dto.locoFuel,
      locoWater: dto.locoWater,
      locoMainGen: dto.locoMainGen,
      locoTracMot: dto.locoTracMot,
      locoVBreak: dto.locoVBreak,
      locoDBreak: dto.locoDBreak,
      locoNote: dto.locoNote,
      image: dto.image,
    });
  }

  public getAllLocomotives(): Observable<any> {
    return this.http.get(this.myUrl + 'locoRoute/getAllLocomotives');
  }

  public getData(): Observable<any> {
    return this.http.get(this.myUrl + 'locoRoute/getData');
  }

  public deleteLoco(id: string): Observable<any> {
    return this.http.delete(this.myUrl + 'locoRoute/deleteLoco', {
      headers: { id },
    });
  }
  public getAllLocosSelect(): Observable<any> {
    return this.http.get(this.myUrl + 'locoRoute/getAllLocosSelect');
  }
  public updateLoco(data): Observable<any> {
    return this.http.put(this.myUrl + `locoRoute/updateLocomotive`, data);
  }
  public getInCount(): Observable<any> {
    return this.http.get(this.myUrl + 'locoRoute/getInCount');
  }
  public getOutCount(): Observable<any> {
    return this.http.get(this.myUrl + 'locoRoute/getOutCount');
  }
  public saveLocomotive(obj): Observable<any> {
    return this.http.post(this.myUrl + 'locoRoute/save-locomotive', obj);
  }
  public sendLocomotiveAssigned(data): Observable<any> {
    return this.http.post(
      this.myUrl + `locoRoute/sendLocomotiveAssigned`,
      data
    );
  }

  public saveMileage(obj): Observable<any> {
    return this.http.post(this.myUrl + 'locoRoute/saveMileage', obj);
  }
  public getAllMileage(object): Observable<any> {
    return this.http.get(this.myUrl + 'locoRoute/getAllMileage', {
      params: object,
    });
  }

  public updateMileage(data): Observable<any> {
    return this.http.put(this.myUrl + `locoRoute/updateMileage`, data);
  }
  public getAcceptedMileage(): Observable<any> {
    return this.http.get(this.myUrl + 'locoRoute/getAcceptedMileage');
  }
  public getLocoReport(): Observable<any> {
    return this.http.get(this.myUrl + 'locoRoute/getLocoReport');
  }

  public updateMileStatus(id): Observable<any> {
    return this.http.patch(this.myUrl + `locoRoute/patch-mile/${id}`, id);
  }

  public acceptLoadLoco(obj): Observable<any> {
    return this.http.put(this.myUrl + `locoRoute/acceptLoadLoco/`, obj);
  }

  public updateRejectStatus(id, reason): Observable<any> {
    return this.http.patch(
      this.myUrl + `locoRoute/reject-mile/${id}/${reason}`,
      id,
      reason
    );
  }
  getOneLoco(id): Observable<any> {
    return this.http.get<any>(this.myUrl + `locoRoute/getOneLoco/${id}`);
  }

  getLocoByLocoNumber(locoNumber): Observable<any> {
    return this.http.get<any>(
      this.myUrl + `locoRoute/getLocoByLocoNumber/${locoNumber}`
    );
  }

  getLocoNum(locoNumber): Observable<any> {
    return this.http.get<any>(
      this.myUrl + `locoRoute/getLocoNum/${locoNumber}`
    );
  }

  getRelevantSch(id): Observable<any> {
    return this.http.get<any>(this.myUrl + `locoRoute/getlocoSche/${id}`);
  }

  getOneLocoNew(mLocoNumber): Observable<any> {
    return this.http.get<any>(
      this.myUrl + `locoRoute/getOneLocoNew/${mLocoNumber}`
    );
  }

  getOneMileage(mReportNumber): Observable<any> {
    return this.http.get<any>(
      this.myUrl + `locoRoute/getOneMileage/${mReportNumber}`
    );
  }

  public sendLocoStatus(body): Observable<any> {
    return this.http.post(this.myUrl + 'locoRoute/sendLocoStatus', body);
  }
  public sendStatusEmail(
    locoNumber: number,
    supervisorEmail: string
  ): Observable<any> {
    return this.http.post(this.myUrl + 'locoRoute/sendStatusEmail', {
      locoNumber,
      supervisorEmail,
    });
  }
  public patchFinalMile(object): Observable<any> {
    return this.http.patch(this.myUrl + `locoRoute/patchFinalMile/`, object);
  }

  public getAllLocoAssigned(object): Observable<any> {
    return this.http.get(this.myUrl + `locoRoute/getAllLocoAssigned/`, {
      params: object,
    });
  }

  public getAllLocoAssignedHistory(object): Observable<any> {
    return this.http.get(this.myUrl + `locoRoute/getAllLocoAssignedHistory/`, {
      params: object,
    });
  }

  public patchSch(object): Observable<any> {
    return this.http.patch(this.myUrl + `locoRoute/patchSch/`, object);
  }

  public assignedToMileage(object): Observable<any> {
    return this.http.patch(this.myUrl + `locoRoute/assignedToMileage/`, object);
  }

  public patchLoadLoco(object): Observable<any> {
    return this.http.patch(this.myUrl + `locoRoute/patchLoadLoco/`, object);
  }

  public patchSchMileage(object): Observable<any> {
    return this.http.put(this.myUrl + `locoRoute/patchSchMileage/`, object);
  }

  public assignedLoadTrialLoco(object): Observable<any> {
    return this.http.put(
      this.myUrl + `locoRoute/assignedLoadTrialLoco/`,
      object
    );
  }

  public getOneMileageById(mReportNumber): Observable<any> {
    return this.http.get<any>(
      this.myUrl + `locoRoute/getOneMileageById/${mReportNumber}`
    );
  }

  public sendMileEmail(data): Observable<any> {
    return this.http.post(this.myUrl + `locoRoute/sendMileEmail`, data);
  }

  public sendLocoEmail(data): Observable<any> {
    return this.http.post(this.myUrl + `locoRoute/sendLocoEmail`, data);
  }

  public sendAcceptedEmail(data): Observable<any> {
    return this.http.post(this.myUrl + `locoRoute/sendAcceptedEmail`, data);
  }
  public sendRejectedEmail(data): Observable<any> {
    return this.http.post(this.myUrl + `locoRoute/sendRejectedEmail`, data);
  }
  //locoHistry

  public saveLocoHistory(obj): Observable<any> {
    return this.http.post(this.myUrl + 'locoRoute/saveLocoHistory', obj);
  }

  public getAllHistoryLoco(locoNumber): Observable<any> {
    return this.http.get(
      this.myUrl + `locoRoute/getAllHistoryLoco/${locoNumber}`
    );
  }

  getOneLocoHistory(id): Observable<any> {
    return this.http.get<any>(this.myUrl + `locoRoute/getOneLocoHistory/${id}`);
  }
}
