import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from '../../environments/environment';
import UserDTO from "../dto/UserDTO";
import {map} from "rxjs/operators";
import LocoDTO from "../dto/LocoDTO";

@Injectable({
  providedIn: 'root'
})
export class AccessService {
  myUrl = environment.baseUrl;
  private  currntUserSubject :BehaviorSubject<any>;
  public currentUser:Observable<any>;

  constructor(private http: HttpClient) {
      //this.currntUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
     // this.currentUser = this.currntUserSubject.asObservable()


  }

 public register(email: string, uName: string, works: string, nic: string, mobile: string, role: string, password: string): Observable<any> {
    return this.http.post(this.myUrl + 'accessRoute/signUp', {
      email,
      uName,
      works,
      nic,
      mobile,
      role,
      password,
    });
 }
 public sendEmail(email: string, receive: string, subject: string, text: string): Observable<any> {
    return this.http.post(this.myUrl + 'accessRoute/sendMails', {
      email,
      receive,
      subject,
      text
    });
 }
 public  sendPasEmail(email: string, text: string): Observable<any>{
    return this.http.post(this.myUrl + 'accessRoute/sendPassEmail', {
      email,
      text
    });
 }

 public requestPassword(body): Observable<any>{
    return this.http.post(this.myUrl + 'accessRoute/requestPassword' , body)
 }
 public newPassword(body): Observable<any>{
   return this.http.post(this.myUrl + 'accessRoute/requestPassword' , body)
 }

  // public get currentUsrValue() {
  //   return this.currntUserSubject.value;
  // }
  public getAllUsers(): Observable<any> {
    return this.http.get( this.myUrl + 'accessRoute/getAllUsers');
  }
  public getMangers(): Observable<any> {
    return this.http.get( this.myUrl + 'accessRoute/getMangers');
  }

  public getUsers(): Observable<any> {
    return this.http.get( this.myUrl + 'accessRoute/getUsers');
  }

  public deleteUser(id: string): Observable<any> {
    return this.http.delete( this.myUrl + 'accessRoute/deleteUser', {headers: {id}});

  }
  public updateUser(dto: UserDTO): Observable<any>{
    return this.http.put(this.myUrl + 'accessRoute/updateUser', {
      userName: dto.userName,
      userWorks: dto.userWorks,
      userMobile: dto.userMobile,
      userRole: dto.userRole,
      userNic: dto. userNic,



    });
  }
  public login(email: string, password: string): Observable<any>{
    return this.http.get<any>(this.myUrl + 'accessRoute/loginUser', {headers: {email, password}}).pipe(
      map(user => {
        if(user && user.token){
          localStorage.setItem('currentUser' ,JSON.stringify(user));
       // this.currntUserSubject.next(user);
        }


        return  user;
      })
    );
  }
  findOne(id: string): Observable<any> {
    return this.http.get('accessRoute/getUser/: id', {headers: {id}});
  }
  getOneUser(userNic): Observable<any>{
    return this.http.get<any>(this.myUrl + `accessRoute/getOneUser/${userNic}`);
  }
  getOneSup(supervisorName): Observable<any>{
    return this.http.get<any>(this.myUrl + `accessRoute/getOneSup/${supervisorName}`);
  }
  getOneMan(managerName): Observable<any>{
    return this.http.get<any>(this.myUrl + `accessRoute/getOneMan/${managerName}`);
  }
}
