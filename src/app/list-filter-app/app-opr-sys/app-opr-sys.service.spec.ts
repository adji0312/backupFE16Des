import { TestBed } from '@angular/core/testing';

import { AppOprSysService } from './app-opr-sys.service';

describe('AppOprSysService', () => {
  let service: AppOprSysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppOprSysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
