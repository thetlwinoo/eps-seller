import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsUpdateComponent } from './products-update.component';

describe('ProductsUpdateComponent', () => {
  let component: ProductsUpdateComponent;
  let fixture: ComponentFixture<ProductsUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
