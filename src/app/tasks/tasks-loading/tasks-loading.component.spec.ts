import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksLoadingComponent } from './tasks-loading.component';

describe('TasksLoadingComponent', () => {
  let component: TasksLoadingComponent;
  let fixture: ComponentFixture<TasksLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TasksLoadingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TasksLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
