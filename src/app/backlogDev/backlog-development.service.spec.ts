import { TestBed } from '@angular/core/testing';

import { BacklogDevelopmentService } from './backlog-development.service';

describe('BacklogDevelopmentService', () => {
  let service: BacklogDevelopmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BacklogDevelopmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
