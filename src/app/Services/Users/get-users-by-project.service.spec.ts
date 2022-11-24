import { TestBed } from '@angular/core/testing';

import { GetUsersByProjectService } from './get-users-by-project.service';

describe('GetUsersByProjectService', () => {
  let service: GetUsersByProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetUsersByProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
