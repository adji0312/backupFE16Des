import { TestBed } from '@angular/core/testing';

import { AppProgLangService } from './app-prog-lang.service';

describe('AppProgLangService', () => {
  let service: AppProgLangService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppProgLangService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
