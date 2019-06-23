import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageInvestigationListComponent } from './manage_investigation-list.component';

describe('ManageInvestigationListComponent', () => {
  let component: ManageInvestigationListComponent;
  let fixture: ComponentFixture<ManageInvestigationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageInvestigationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageInvestigationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
