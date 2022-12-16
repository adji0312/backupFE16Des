import { TestBed } from '@angular/core/testing';

import { AppTypeService } from './app-type.service';

describe('AppTypeService', () => {
  let service: AppTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
