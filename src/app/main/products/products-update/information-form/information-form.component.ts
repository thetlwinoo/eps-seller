import { Component, OnInit, OnDestroy, ViewEncapsulation, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { rootAnimations } from '@epm/animations';
import { IWarrantyTypes, IBarcodeTypes } from '@epm/models';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromProducts from 'app/ngrx/products/reducers';
import { FetchActions, CategoryActions } from 'app/ngrx/products/actions';

@Component({
  selector: 'information-form',
  templateUrl: './information-form.component.html',
  styleUrls: ['./information-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: rootAnimations
})
export class InformationFormComponent implements OnInit {
  @Input() productInformationForm: FormGroup;

  warrantyTypes$: Observable<IWarrantyTypes[]>;  

  constructor(
    private store: Store<fromProducts.State>,
  ) {
    this.warrantyTypes$ = this.store.pipe(select(fromProducts.getFetchWarrantyTypes)) as Observable<IWarrantyTypes[]>;    
  }

  ngOnInit() {
  }

  compareObjects(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
