import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BacklogDevelopmentComponent } from './backlog-development.component';

describe('BacklogDevelopmentComponent', () => {
  let component: BacklogDevelopmentComponent;
  let fixture: ComponentFixture<BacklogDevelopmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BacklogDevelopmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BacklogDevelopmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
