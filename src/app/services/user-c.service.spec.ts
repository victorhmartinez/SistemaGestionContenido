import { TestBed } from '@angular/core/testing';

import { UserCService } from './user-c.service';

describe('UserCService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserCService = TestBed.get(UserCService);
    expect(service).toBeTruthy();
  });
});
