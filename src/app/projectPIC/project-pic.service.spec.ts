import { TestBed } from '@angular/core/testing';

import { ProjectPicService } from './project-pic.service';

describe('ProjectPicService', () => {
  let service: ProjectPicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectPicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
