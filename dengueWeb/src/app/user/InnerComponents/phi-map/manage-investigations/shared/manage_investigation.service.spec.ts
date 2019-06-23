import { TestBed, inject } from '@angular/core/testing';

import { ManageInvestigationService } from './manage_investigation.service';

describe('ManageInvestigationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManageInvestigationService]
    });
  });

  it('should be created', inject([ManageInvestigationService], (service: ManageInvestigationService) => {
    expect(service).toBeTruthy();
  }));
});
