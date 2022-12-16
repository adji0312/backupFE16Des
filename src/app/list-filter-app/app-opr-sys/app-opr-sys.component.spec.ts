import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppOprSysComponent } from './app-opr-sys.component';

describe('AppOprSysComponent', () => {
  let component: AppOprSysComponent;
  let fixture: ComponentFixture<AppOprSysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppOprSysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppOprSysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
