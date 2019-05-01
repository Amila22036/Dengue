import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhisListComponent } from './phis-list.component';

describe('UsersListComponent', () => {
  let component: PhisListComponent;
  let fixture: ComponentFixture<PhisListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhisListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhisListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
