import { createAction, props } from '@ngrx/store';
import { HttpHeaders } from '@angular/common/http';
import { IProductCategory } from '@eps/models';

export const loadCategory = createAction('[Category] Load Category', props<{ category: IProductCategory }>());

export const selectCategory = createAction('[View Category] Select Category', props<{ id: number }>());

export const categoryFailure = createAction('[Category/API] Category Failure', props<{ errorMsg: string }>());
