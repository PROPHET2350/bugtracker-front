import { TestBed } from '@angular/core/testing';

import { ActionProjectAdminService } from './action-project-admin.service';

describe('ActionProjectAdminService', () => {
  let service: ActionProjectAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActionProjectAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
