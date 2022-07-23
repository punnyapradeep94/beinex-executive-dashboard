import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksByAuraaComponent } from './tasks-by-auraa.component';

describe('TasksByAuraaComponent', () => {
  let component: TasksByAuraaComponent;
  let fixture: ComponentFixture<TasksByAuraaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksByAuraaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksByAuraaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
