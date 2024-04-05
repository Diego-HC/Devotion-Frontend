import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskMainPageComponent } from './task-main-page.component';

describe('TaskMainPageComponent', () => {
  let component: TaskMainPageComponent;
  let fixture: ComponentFixture<TaskMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskMainPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
