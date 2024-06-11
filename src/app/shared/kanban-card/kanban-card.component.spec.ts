import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {Router } from '@angular/router';

import { KanbanCardComponent } from './kanban-card.component';

describe('KanbanCardComponent', () => {
  let component: KanbanCardComponent;
  let fixture: ComponentFixture<KanbanCardComponent>;
  const Task = {id: '1', name: 'Task 1', description: 'Task Test 1', priority: 1, assignee: {id: '1', name: 'AlexaTest'}};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KanbanCardComponent],
      imports: [DragDropModule],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KanbanCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
