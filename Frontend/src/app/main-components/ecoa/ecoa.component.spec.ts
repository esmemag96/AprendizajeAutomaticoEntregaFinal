import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcoaComponent } from './ecoa.component';

describe('EcoaComponent', () => {
  let component: EcoaComponent;
  let fixture: ComponentFixture<EcoaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcoaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
