import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkuFormComponent } from './sku-form.component';

describe('SkuFormComponent', () => {
  let component: SkuFormComponent;
  let fixture: ComponentFixture<SkuFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkuFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkuFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
