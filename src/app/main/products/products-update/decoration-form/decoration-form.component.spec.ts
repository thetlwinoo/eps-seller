import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecorationFormComponent } from './decoration-form.component';

describe('DecorationFormComponent', () => {
  let component: DecorationFormComponent;
  let fixture: ComponentFixture<DecorationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecorationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecorationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
