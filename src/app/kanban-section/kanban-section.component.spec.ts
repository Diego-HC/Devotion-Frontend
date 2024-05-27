import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KanbanSectionComponent } from './kanban-section.component';
import { Component, Input, OnInit } from '@angular/core';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ApiService } from '../api.service';
import { of } from 'rxjs';
import { KanbanCardComponent } from '../shared/kanban-card/kanban-card.component';

class MockApiService {
  put() {
    return of({}); 
  }
} 

describe('KanbanSectionComponent', () => {
  let component: KanbanSectionComponent;
  let fixture: ComponentFixture<KanbanSectionComponent>;

  const mockTasks: KanbanTask[] = [{id: '1', name: 'Task 1', description: 'Task Test 1', priority: 1, assignee: {id: '1', name: 'AlexaTest'}}, {id: '2', name: 'Task 2', description: 'Task Test 2', priority: 2, assignee: {id: '2', name: 'AlexaTest2'}}];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KanbanSectionComponent, KanbanCardComponent],
      providers: [
        { provide: ApiService, useClass: MockApiService }
      ],
      imports: [DragDropModule],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KanbanSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
   // H20T1 Visualización de las tareas directas del proyecto en las tarjetas de kanban.
  it('should display the tasks in the kanban cards', () => {
    component.tasks = mockTasks;
    fixture.detectChanges();
    const kanbanCards = fixture.nativeElement.querySelectorAll('app-kanban-card');
    expect(kanbanCards.length).toBe(2);
  });
});
