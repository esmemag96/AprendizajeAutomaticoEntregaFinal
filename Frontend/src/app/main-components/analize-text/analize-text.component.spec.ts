import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalizeTextComponent } from './analize-text.component';

describe('AnalizeTextComponent', () => {
  let component: AnalizeTextComponent;
  let fixture: ComponentFixture<AnalizeTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalizeTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalizeTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
