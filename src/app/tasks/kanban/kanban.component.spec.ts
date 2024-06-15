import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KanbanComponent } from './kanban.component';
import { KanbanSectionComponent } from '../../kanban-section/kanban-section.component';
import { KanbanCardComponent } from '../../shared/kanban-card/kanban-card.component';
import { ApiService } from "../../api.service";
import { StoreService } from "../../store.service";
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';

// Autor: Alexa Jimena Ramirez Ortiz - A00833943
class MockStoreService {
  showAssignedTasks$ = of(false);
  showSubtreeTasks$ = of(false);
  needsUpdate$ = of(false);
}

class MockApiService {
  getTasks() {
    return of({}); // return an Observable of an empty object
  }

  get() {
    return of({}); // return an Observable of an empty object
  }
}

describe('KanbanComponent', () => {
  let component: KanbanComponent;
  let fixture: ComponentFixture<KanbanComponent>;
  let card: KanbanCardComponent;

  const mockTasks: KanbanLists = { 
    notStarted: [{id: '1', name: 'Task 1', description: 'Task Test 1', priority: 1, assignee: {id: '1', name: 'AlexaTest'}}, {id: '2', name: 'Task 2', description: 'Task Test 2', priority: 2, assignee: {id: '2', name: 'AlexaTest2'}}],
    inProgress: [{id: '3', name: 'Task 3', description: 'Task Test 3', priority: 3, assignee: {id: '3', name: 'AlexaTest3'}}, {id: '4', name: 'Task 4', description: 'Task Test 4', priority: 2, assignee: {id: '4', name: 'AlexaTest4'}}],
    inReview: [{id: '5', name: 'Task 5', description: 'Task Test 5', priority: 1, assignee: {id: '5', name: 'AlexaTest5'}}, {id: '6', name: 'Task 6', description: 'Task Test 6', priority: 2, assignee: {id: '6', name: 'AlexaTest6'}}],
    done: [{id: '7', name: 'Task 7', description: 'Task Test 7', priority: 1, assignee: {id: '7', name: 'AlexaTest7'}}, {id: '8', name: 'Task 8', description: 'Task Test 8', priority: 2, assignee: {id: '8', name: 'AlexaTest8'}}]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KanbanComponent,
                      KanbanSectionComponent,
                      KanbanCardComponent],
      imports: [DragDropModule],
      providers: [
        { provide: StoreService, useClass: MockStoreService },
        { provide: ApiService, useClass: MockApiService }
      ]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(KanbanComponent);
    component = fixture.componentInstance;
    component.response = { tasks: mockTasks };
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // H19T1 Visualización de las tareas directas del proyecto en las tarjetas de kanban.
  it('should have 4 kanban sections', () => {
    const sections = fixture.debugElement.queryAll(By.directive(KanbanSectionComponent));
    expect(sections.length).toBe(4);
  });

  it('should send the correct tasks to each section', () => {
  // Create a mock response
  const mockResponse = { tasks: mockTasks };
  // Set the component's response to the mock response
  component.response = mockResponse;
  // Trigger change detection so the view updates
  fixture.detectChanges();
  // Get all the app-kanban-section elements
  const sections = fixture.debugElement.queryAll(By.directive(KanbanSectionComponent));
  // Check the tasks in each section
  expect(sections[0].componentInstance.tasks).toBe(mockTasks.notStarted);
  expect(sections[1].componentInstance.tasks).toBe(mockTasks.inProgress);
  expect(sections[2].componentInstance.tasks).toBe(mockTasks.inReview);
  expect(sections[3].componentInstance.tasks).toBe(mockTasks.done);
  
    });

});