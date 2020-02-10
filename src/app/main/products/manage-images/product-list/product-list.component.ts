import { Component, OnInit, ViewEncapsulation, ViewChild, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { rootAnimations } from '@eps/animations';
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subject, of, fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import { StockItemsService, PhotosService } from '@eps/services';
import { ImageUtils } from '@eps/services';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: rootAnimations
})
export class ProductListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
