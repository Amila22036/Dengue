import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageInvestigationComponent } from './manage_investigation.component';

describe('ManageInvestigationComponent', () => {
  let component: ManageInvestigationComponent;
  let fixture: ComponentFixture<ManageInvestigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageInvestigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageInvestigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
