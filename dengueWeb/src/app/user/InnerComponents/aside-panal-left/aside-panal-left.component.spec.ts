import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsidePanalLeftComponent } from './aside-panal-left.component';

describe('AsidePanalLeftComponent', () => {
  let component: AsidePanalLeftComponent;
  let fixture: ComponentFixture<AsidePanalLeftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsidePanalLeftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsidePanalLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
