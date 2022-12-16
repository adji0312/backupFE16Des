import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppProgLangComponent } from './app-prog-lang.component';

describe('AppProgLangComponent', () => {
  let component: AppProgLangComponent;
  let fixture: ComponentFixture<AppProgLangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppProgLangComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppProgLangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
