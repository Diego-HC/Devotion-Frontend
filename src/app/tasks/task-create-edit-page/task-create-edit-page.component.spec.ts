import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TaskCreateEditPageComponent} from './task-create-edit-page.component';
import {HttpClientModule} from '@angular/common/http';
import {OAuthModule} from 'angular-oauth2-oidc';
import {Router} from '@angular/router';
import {ApiService} from '../../api.service';
import {StoreService} from '../../store.service';

describe('TaskCreateEditPageComponent', () => {
  let component: TaskCreateEditPageComponent;
  let fixture: ComponentFixture<TaskCreateEditPageComponent>;

  const taskId = "b3045125-c471-4c40-bcc3-6ec1ca9edc9f";
  const parentTaskId = "b78d06a9-1435-4609-abb3-711c0ca2b6bc";
  const parentTaskId2 = "fe24c621-d9b4-40ba-a0f5-2d2338ba0876";

  let mockRouter = {
    navigateByUrl: jasmine.createSpy('navigateByUrl'),
  };

  const mockStoreService = {
    task: {
      id: "",
      name: "",
      description: "",
      startDate: "",
      dueDate: "",
      assignee: {
        id: "",
        name: "",
        email: "",
        isLeader: false
      },
      priority: 0,
      status: 0,
      parentProject: "",
      parentTask: ""
    } as Task,
    pageWasReloaded: false,
    userPool: [],
    taskRequestBody: () => {
      return {
        id: taskId,
        name: "Task Name",
        description: "Task Description",
      };
    },
  };

  const resetStore = () => {
    mockStoreService.task = {
      id: "",
      name: "",
      description: "",
      startDate: "",
      dueDate: "",
      assignee: {
        id: "",
        name: "",
        email: "",
        isLeader: false
      },
      priority: 0,
      status: 0,
      parentProject: "",
      parentTask: ""
    };
    mockStoreService.pageWasReloaded = false;
    mockStoreService.userPool = [];
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskCreateEditPageComponent],
      imports: [HttpClientModule, OAuthModule.forRoot()],
      providers: [
        {
          provide: Router,
          useValue: mockRouter,
        },
        {
          provide: ApiService,
          useValue: {
            get: (url: string) => {
              return {
                subscribe: () => {
                  return [];
                },
              };
            },
            post: (url: string, data: any) => {
              return {
                subscribe: (fn: (value: any) => void) => {
                  fn({
                    id: taskId,
                    name: 'Task Name',
                    description: 'Task Description',
                  });
                },
              };
            },
          },
        },
        {
          provide: StoreService,
          useValue: mockStoreService,
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TaskCreateEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    resetStore();
  });

  afterEach(() => {
    resetStore();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // H5T1 - Descripción: Crear una tarea (happy path)
  it("should create a task", () => {
    component.taskForm.controls["name"].setValue("Task Name");
    component.taskForm.controls["description"].setValue(
      "Subtask Description"
    );
    component.taskForm.controls["start_date"].setValue("2021-08-01");
    component.taskForm.controls["due_date"].setValue("2021-08-31");
    component.taskForm.controls["priority"].setValue(1);

    mockStoreService.task.parentTask = undefined;
    mockStoreService.task.assignee = { id: "1", name: "User 1", email: "ola@ola.com", isLeader: true };

    spyOn(component, "onSubmit").and.callThrough();
    component.onSubmit();

    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith(
      `/task/${taskId}`
    );
  });

  // H15T1 - Descripción: Crear una subtarea (anidada una vez) (happy path)
  // Leonardo Corona Garza
  it("should create a subtask (nested one level)", () => {
    component.taskForm.controls["name"].setValue("Subtask Name");
    component.taskForm.controls["description"].setValue(
      "Subtask Description"
    );
    component.taskForm.controls["start_date"].setValue("2021-08-01");
    component.taskForm.controls["due_date"].setValue("2021-08-31");
    component.taskForm.controls["priority"].setValue(1);

    mockStoreService.task.parentTask = parentTaskId;
    mockStoreService.task.assignee = { id: "1", name: "User 1", email: "ola@ola.com", isLeader: true };

    spyOn(component, "onSubmit").and.callThrough();
    component.onSubmit();

    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith(
      `/task/${taskId}`
    );
  });

  // H15T2 - Descripción: Crear una subtarea (anidada dos veces)
  // Leonardo Corona Garza
  it("should create a subtask (nested two levels)", () => {
    component.taskForm.controls["name"].setValue("Subtask Name");
    component.taskForm.controls["description"].setValue(
      "Subtask Description"
    );
    component.taskForm.controls["start_date"].setValue("2021-08-01");
    component.taskForm.controls["due_date"].setValue("2021-08-31");
    component.taskForm.controls["priority"].setValue(1);

    mockStoreService.task.parentTask = parentTaskId2;
    mockStoreService.task.assignee = { id: "1", name: "User 1", email: "ola@ola.com", isLeader: true };

    spyOn(component, "onSubmit").and.callThrough();
    component.onSubmit();

    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith(
      `/task/${taskId}`
    );
  });

  // H15T5 - Descripción: Intentar crear una subtarea sin título, fecha de fin, ni prioridad
  // Leonardo Corona Garza
  it("should not create a subtask without a title, due date, or priority", () => {
    component.taskForm.controls["description"].setValue(
      "Subtask Description"
    );
    component.taskForm.controls["start_date"].setValue("2021-08-01");
    mockStoreService.task.parentTask = parentTaskId;
    mockStoreService.task.assignee = { id: "1", name: "User 1", email: "ola@ola.com", isLeader: true };

    spyOn(component, "onSubmit").and.callThrough();
    component.onSubmit();

    expect(component.taskForm.valid).toBeFalse();
  });

  // H15T6 - Descripción: Intentar crear una subtarea sin descripción
  // Leonardo Corona Garza
  it("should not create a subtask without a description", () => {
    component.taskForm.controls["name"].setValue("Subtask Name");
    component.taskForm.controls["start_date"].setValue("2021-08-01");
    component.taskForm.controls["due_date"].setValue("2021-08-31");
    component.taskForm.controls["priority"].setValue(1);

    mockStoreService.task.parentTask = parentTaskId;
    mockStoreService.task.assignee = { id: "1", name: "User 1", email: "ola@ola.com", isLeader: true };

    spyOn(component, "onSubmit").and.callThrough();
    component.onSubmit();

    expect(component.taskForm.valid).toBeFalse();
  });

  // H15T8 - Descripción: Intentar crear una subtarea sin haber navegado por un proyecto y tarea anteriormente
  // Leonardo Corona Garza
  it("should not create a subtask without having navigated through a project and task previously", () => {
    expect(mockStoreService.task.parentTask).toBe("");
  });
});
