import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksByBeinexSectorsComponent } from './tasks-by-beinex-sectors.component';

describe('TasksByBeinexSectorsComponent', () => {
  let component: TasksByBeinexSectorsComponent;
  let fixture: ComponentFixture<TasksByBeinexSectorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksByBeinexSectorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksByBeinexSectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
