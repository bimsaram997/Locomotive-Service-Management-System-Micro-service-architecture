import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserTaskService {
  myUrl = environment.baseUrl;
  constructor(private http: HttpClient) {
    //this.currntUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    // this.currentUser = this.currntUserSubject.asObservable()
  }
  public saveTask(obj): Observable<any> {
    return this.http.post(this.myUrl + 'userTaskRoute/saveTask', obj);
  }

  public getAllTasksAssigned(object): Observable<any> {
    return this.http.get(this.myUrl + `userTaskRoute/getAllTasksAssigned/`, {
      params: object,
    });
  }
}
