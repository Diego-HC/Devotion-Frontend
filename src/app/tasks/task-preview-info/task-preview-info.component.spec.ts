import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskPreviewInfoComponent } from './task-preview-info.component';

describe('TaskPreviewInfoComponent', () => {
  let component: TaskPreviewInfoComponent;
  let fixture: ComponentFixture<TaskPreviewInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskPreviewInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskPreviewInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
