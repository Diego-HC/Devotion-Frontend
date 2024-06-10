import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TaskPreviewComponent } from './task-preview.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('TaskPreviewComponent', () => {
  let component: TaskPreviewComponent;
  let fixture: ComponentFixture<TaskPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskPreviewComponent],
      imports: [HttpClientTestingModule],
      
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
