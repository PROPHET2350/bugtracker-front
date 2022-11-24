import { TestBed } from '@angular/core/testing';

import { UsersAdminActionsService } from './users-admin-actions.service';

describe('UsersAdminActionsService', () => {
  let service: UsersAdminActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersAdminActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
