import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksDistributionComponent } from './tasks-distribution.component';

describe('TasksDistributionComponent', () => {
  let component: TasksDistributionComponent;
  let fixture: ComponentFixture<TasksDistributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksDistributionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
