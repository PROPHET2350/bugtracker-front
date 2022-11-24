import { TestBed } from '@angular/core/testing';

import { GetTicketsToGraphService } from './get-tickets-to-graph.service';

describe('GetTicketsToGraphService', () => {
  let service: GetTicketsToGraphService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetTicketsToGraphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
