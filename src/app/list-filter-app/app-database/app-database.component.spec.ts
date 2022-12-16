import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDatabaseComponent } from './app-database.component';

describe('AppDatabaseComponent', () => {
  let component: AppDatabaseComponent;
  let fixture: ComponentFixture<AppDatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppDatabaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
