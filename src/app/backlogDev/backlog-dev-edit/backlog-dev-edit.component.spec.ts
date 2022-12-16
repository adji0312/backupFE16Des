import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BacklogDevEditComponent } from './backlog-dev-edit.component';

describe('BacklogDevEditComponent', () => {
  let component: BacklogDevEditComponent;
  let fixture: ComponentFixture<BacklogDevEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BacklogDevEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BacklogDevEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
