import { TestBed } from '@angular/core/testing';

import { AppServerService } from './app-server.service';

describe('AppServerService', () => {
  let service: AppServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
