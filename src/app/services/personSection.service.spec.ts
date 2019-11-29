import { TestBed } from '@angular/core/testing';

import { PersonSectionService } from './personSection.service';

describe('PersonSectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PersonSectionService = TestBed.get(PersonSectionService);
    expect(service).toBeTruthy();
  });
});
