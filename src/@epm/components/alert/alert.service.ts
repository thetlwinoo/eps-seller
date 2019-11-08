import { Injectable } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RootAlertService {
    private _mode: BehaviorSubject<string>;
    private _message: BehaviorSubject<string>;
    private _visible: BehaviorSubject<boolean>;

    constructor(
        private _router: Router
    ) {
        this._init();
    }

    get mode(): Observable<any> {
        return this._mode.asObservable();
    }

    setMode(value: 'danger' | 'warning' | 'info' | 'success'): void {
        this._mode.next(value);
    }

    get message(): Observable<any> {
        return this._message.asObservable();
    }

    setMessage(value: string, mode: 'danger' | 'warning' | 'info' | 'success'): void {
        this.hide();
        this.setMode(mode);
        this._message.next(value);        
        this.show();
    }

    get visible(): Observable<any> {
        return this._visible.asObservable();
    }

    private _init(): void {
        this._mode = new BehaviorSubject('indeterminate');
        this._message = new BehaviorSubject("");
        this._visible = new BehaviorSubject(false);
    }

    show(): void {
        this._visible.next(true);
    }

    hide(): void {
        this._visible.next(false);
    }
}

