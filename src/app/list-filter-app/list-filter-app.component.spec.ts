import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFilterAppComponent } from './list-filter-app.component';

describe('ListFilterAppComponent', () => {
  let component: ListFilterAppComponent;
  let fixture: ComponentFixture<ListFilterAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFilterAppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListFilterAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
