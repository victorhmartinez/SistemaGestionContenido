import { TestBed } from '@angular/core/testing';

import { GroupEventService } from './groupEvent.service';

describe('GroupEventService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GroupEventService = TestBed.get(GroupEventService);
    expect(service).toBeTruthy();
  });
});
