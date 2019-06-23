import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageInvestigationsComponent } from './manage-investigations.component';

describe('ManageInvestigationsComponent', () => {
  let component: ManageInvestigationsComponent;
  let fixture: ComponentFixture<ManageInvestigationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageInvestigationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageInvestigationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
