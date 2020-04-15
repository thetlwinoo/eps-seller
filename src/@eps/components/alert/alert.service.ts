import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RootAlertService {
  private _mode: BehaviorSubject<string>;
  private _message: BehaviorSubject<string>;
  private _visible: BehaviorSubject<boolean>;

  constructor(private _router: Router) {
    this._init();
  }

  show(): void {
    this._visible.next(true);
  }

  hide(): void {
    this._visible.next(false);
  }

  setMode(value: 'danger' | 'warning' | 'info' | 'success'): void {
    this._mode.next(value);
  }

  setMessage(value: string, mode: 'danger' | 'warning' | 'info' | 'success'): void {
    this.hide();
    this.setMode(mode);
    this._message.next(value);
    this.show();
  }

  get mode(): Observable<any> {
    return this._mode.asObservable();
  }

  get message(): Observable<any> {
    return this._message.asObservable();
  }

  get visible(): Observable<any> {
    return this._visible.asObservable();
  }

  private _init(): void {
    this._mode = new BehaviorSubject('indeterminate');
    this._message = new BehaviorSubject('');
    this._visible = new BehaviorSubject(false);
  }
}
