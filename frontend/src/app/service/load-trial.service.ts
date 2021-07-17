import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoadTrialService {
  myUrl = environment. baseUrlTwo;
  constructor(private http: HttpClient) { }

  public saveLoadTrial(obj): Observable<any>{
    return this.http.post(this.myUrl + 'loadTrialRoute/saveLoadTrial' , obj);
  }
  public makeComment(obj): Observable<any>{
    return this.http.post(this.myUrl + 'loadTrialRoute/makeComment' , obj);
  }
  public getAllLoadTrial(): Observable<any> {
    return this.http.get( this.myUrl + 'loadTrialRoute/getAllLoadTrial');
  }
  getOneLoad(id): Observable<any>{
    return this.http.get<any>(this.myUrl + `loadTrialRoute/getOneLoad/${id}`);
  }
  public  addComment(data): Observable<any>{
    return this.http.put(this.myUrl + `loadTrialRoute/addComment`, data);
  }

  getRelevantComments(id): Observable<any>{
    return this.http.get<any>(this.myUrl + `loadTrialRoute/getLoadComments/${id}`);
  }

  //Feedback

  public getOneComment(loadNo): Observable<any>{
    return this.http.get<any>(this.myUrl + `loadTrialRoute/getOneComment/${loadNo}`);
  }
 
}
