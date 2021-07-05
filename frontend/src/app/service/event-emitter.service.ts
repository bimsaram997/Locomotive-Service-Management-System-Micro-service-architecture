import { Injectable } from '@angular/core';
import {Subscription} from "rxjs";
import {EventEmitter} from "events";

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {
  invokeFirstComponentFunction = new EventEmitter();
  subsVar: Subscription;

  constructor() { }
  onFirstComponentButtonClick() {
    this.invokeFirstComponentFunction.emit();
  }
}
