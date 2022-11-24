import { TestBed } from '@angular/core/testing';

import { UserSignInServiceService } from './user-sign-in-service.service';

describe('UserSignInServiceService', () => {
  let service: UserSignInServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSignInServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
