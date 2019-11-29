import { TestBed } from '@angular/core/testing';

import { GroupContactService } from './group-contact.service';

describe('GroupContactService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GroupContactService = TestBed.get(GroupContactService);
    expect(service).toBeTruthy();
  });
});
