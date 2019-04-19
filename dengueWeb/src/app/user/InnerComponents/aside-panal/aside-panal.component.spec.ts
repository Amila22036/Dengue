import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsidePanalComponent } from './aside-panal.component';

describe('AsidePanalComponent', () => {
  let component: AsidePanalComponent;
  let fixture: ComponentFixture<AsidePanalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsidePanalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsidePanalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
