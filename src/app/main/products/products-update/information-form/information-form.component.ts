import { Component, OnInit, OnDestroy, ViewEncapsulation, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { rootAnimations } from '@eps/animations';
import { IWarrantyTypes, IBarcodeTypes } from '@eps/models';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromProducts from 'app/ngrx/products/reducers';
import { FetchActions, CategoryActions } from 'app/ngrx/products/actions';
import { CommonUtils } from '@eps/utils/common.utils';

@Component({
  selector: 'information-form',
  templateUrl: './information-form.component.html',
  styleUrls: ['./information-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: rootAnimations,
})
export class InformationFormComponent implements OnInit {
  @Input() productsForm: FormGroup;

  warrantyTypes$: Observable<IWarrantyTypes[]>;
  dangerousGoods: any = {
    battery: false,
    liquid: false,
    none: false,
    flammable: false,
  };

  constructor(private store: Store<fromProducts.State>) {
    this.warrantyTypes$ = this.store.pipe(select(fromProducts.getFetchWarrantyTypes));
  }

  get productInformationForm(): FormGroup {
    if (this.productsForm) {
      return this.productsForm.get('productDocument') as FormGroup;
    }
  }

  ngOnInit(): void {}

  compareObjects(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  onDangerousGoodsChanged(): void {
    if (this.productInformationForm) {
      this.productInformationForm.patchValue({
        dangerousGoods: CommonUtils.ObjectToString(this.dangerousGoods),
      });
    }
  }
}
