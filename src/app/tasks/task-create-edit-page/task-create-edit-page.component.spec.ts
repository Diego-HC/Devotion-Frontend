import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCreateEditPageComponent } from './task-create-edit-page.component';

describe('TaskCreateEditPageComponent', () => {
  let component: TaskCreateEditPageComponent;
  let fixture: ComponentFixture<TaskCreateEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskCreateEditPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskCreateEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
