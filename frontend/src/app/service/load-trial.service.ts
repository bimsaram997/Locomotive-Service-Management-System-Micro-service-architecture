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
}
