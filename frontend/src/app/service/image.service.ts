import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  myUrl = environment.baseUrlOne;
  constructor(private http: HttpClient) { }

  public uploadImage(array: Array<File>): Observable<any>{
    const formData: any = new FormData();
    for(const temp of array){
      formData.append('image', temp);
    }
    return this.http.post(this.myUrl + 'imageController/saveImage', formData);
  }
}
