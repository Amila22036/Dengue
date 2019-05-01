import { TestBed } from '@angular/core/testing';

import { MainUIService } from './main-ui.service';

describe('MainUIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MainUIService = TestBed.get(MainUIService);
    expect(service).toBeTruthy();
  });
});
