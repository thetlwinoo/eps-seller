import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RootConfigService } from '@root/services';

@Component({
  selector: 'app-layout1',
  templateUrl: './layout1.component.html',
  styleUrls: ['./layout1.component.scss']
})
export class Layout1Component implements OnInit {
  rootConfig: any;
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _rootConfigService: RootConfigService
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this._rootConfigService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config) => {
        this.rootConfig = config;
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
