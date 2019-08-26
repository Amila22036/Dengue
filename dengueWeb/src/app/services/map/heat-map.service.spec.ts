import { TestBed } from '@angular/core/testing';

import { HeatMapService } from './heat-map.service';

describe('HeatMapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HeatMapService = TestBed.get(HeatMapService);
    expect(service).toBeTruthy();
  });
});
