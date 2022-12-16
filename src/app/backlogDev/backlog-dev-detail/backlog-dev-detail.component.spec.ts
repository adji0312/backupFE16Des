import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BacklogDetailComponent } from './backlog-dev-detail.component';

describe('BacklogDetailComponent', () => {
  let component: BacklogDetailComponent;
  let fixture: ComponentFixture<BacklogDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BacklogDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BacklogDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
