import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestigationSitesListComponent } from './investigation-sites-list.component';

describe('InvestigationSitesListComponent', () => {
  let component: InvestigationSitesListComponent;
  let fixture: ComponentFixture<InvestigationSitesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestigationSitesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestigationSitesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
