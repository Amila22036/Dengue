import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestigationRoutesComponent } from './investigation-routes.component';

describe('InvestigationRoutesComponent', () => {
  let component: InvestigationRoutesComponent;
  let fixture: ComponentFixture<InvestigationRoutesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestigationRoutesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestigationRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
