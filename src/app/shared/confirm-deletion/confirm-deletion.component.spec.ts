
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientModule} from "@angular/common/http";
import {OAuthModule} from "angular-oauth2-oidc";
import {Router} from "@angular/router";
import {of, throwError} from 'rxjs';

import {ConfirmDeletionComponent} from './confirm-deletion.component';
import {ApiService} from '../../api.service';
import {StoreService} from '../../store.service';

// Autor: Andrea Badillo - A00833511


describe('ConfirmDeletionComponent', () => {
  let component: ConfirmDeletionComponent;
  let fixture: ComponentFixture<ConfirmDeletionComponent>;

  const taskId = "b3045125-c471-4c40-bcc3-6ec1ca9edc9f";
  const projectId = "b3045125-c471-4c40-bcc3-6ec1ca9edc9f";
  let mockRouter = {
    navigateByUrl: jasmine.createSpy("navigateByUrl"),
  };
  const mockStoreService = {
    task: {
      id: taskId,
      name: "Test Task",
      description: "Test Description",
      startDate: "2024-11-12",
      dueDate: "2024-11-13",
      assignee: {
        id: "id1",
        name: "Assignee Name",
        email: "assginee@salad.com",
        isLeader: false
      },
      priority: 0,
      status: 0,
      parentProject: "b3045125-c471-4c40-bcc3-6ec1ca9edc9f",
      parentTask: ""
    } as Task,
    showConfirmDeletion: false,
    taskRequestBody: () => {
      return {
        id: taskId,
        name: "Task Name",
        description: "Task Description",
        startDate: "2024-11-12",
        dueDate: "2021-11-13",
        assignee: {
          id: "id1",
          name: "Assignee Name",
          email: "assginee@salad.com",
          isLeader: false
        },
        priority: 0,
        status: 0,
        parentProject: "b3045125-c471-4c40-bcc3-6ec1ca9edc9f",
        parentTask: ""
      };
    },
    project: {
      id: projectId,
      name: "Test Project",
      description: "Test Description",
      parent: "",
      leaders: [],
      members: []
    } as Project,
    projectRequestBody: () => {
      return {
        id: projectId,
        name: "Project Name",
        description: "Project Description",
        leaders: [
          {
            id: "id1",
            name: "Leader Name",
            email: "leaders@salad.com",
            isLeader: true
          }
        ],
        members: [
          {
            id: "id2",
            name: "Member Name",
            email: "member@salad.com",
            isLeader: false
          }
        ]
      };
    }
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
    mockStoreService.showConfirmDeletion = false;
    mockStoreService.project = {
      id: "",
      name: "",
      description: "",
      parent: "",
      leaders: [],
      members: []
    };
  };

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [ConfirmDeletionComponent],
        imports: [HttpClientModule, OAuthModule.forRoot()],
        providers: [
          {
            provide: Router,
            useValue: mockRouter,
          },
          {
            provide: ApiService,
            useValue: {
              delete: (url: string) => {
                return {
                  subscribe: (success: Function, error: Function) => {
                    success();
                  }
                };
              }
            },
          },
          {
            provide: StoreService,
            useValue: mockStoreService,
          }
        ]
      })
        .compileComponents();

      fixture = TestBed.createComponent(ConfirmDeletionComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      resetStore();
      spyOn(window, 'alert').and.stub();
    });

    afterEach(() => {
      resetStore();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    // --------------------- H15 - Eliminar proyectos/subproyectos ---------------------
    it('should delete a project successfully', () => {
      mockStoreService.project.id = projectId;
      component.deletingTask = true;
      component.handleDelete();
      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/home');
      expect(mockStoreService.showConfirmDeletion).toBeFalse();
      expect(component.isDeleting).toBeFalse();
    });

    // Confirmación al eliminar un proyecto
    it('should confirm the project deletion', () => {
      mockStoreService.project.id = projectId;
      component.deletingTask = false;
      component.handleDelete();
      expect(mockStoreService.showConfirmDeletion).toBeFalse();
    });

    // Rol de miembro trata de borrar un proyecto
    it('should alert the user if the project could not be deleted', () => {
      const apiService = TestBed.inject(ApiService);
      spyOn(apiService, 'delete').and.callFake((url: string) => {
        return throwError(() => new Error('error'));
      });

      mockStoreService.project.id = projectId;
      component.deletingTask = false;
      component.handleDelete();
      expect(mockStoreService.showConfirmDeletion).toBeFalse();
      expect(component.isDeleting).toBeFalse();
      expect(window.alert).toHaveBeenCalledWith('No se pudo eliminar. Revisa si tienes el rol de líder.');
    });

    // --------------------- H16 - Eliminar tareas/subtareas ---------------------
    //H16 T1 - El usuario borra una tarea exitosamente
    it('should delete a task successfully', () => {
      mockStoreService.task.id = taskId;
      component.deletingTask = true;
      component.handleDelete();
      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/home');
      expect(mockStoreService.showConfirmDeletion).toBeFalse();
      expect(component.isDeleting).toBeFalse();
    });

    // Confirmación al eliminar una tarea
    it('should confirm the task deletion', () => {
      mockStoreService.task.id = taskId;  // Ensure task id is set
      component.deletingTask = true;
      component.handleDelete();
      expect(mockStoreService.showConfirmDeletion).toBeFalse();
    });

    // Rol de miembro trata de borrar una tarea
    it('should alert the user if the task could not be deleted', () => {
      // Mock the delete method to call the error callback
      const apiService = TestBed.inject(ApiService);
      spyOn(apiService, 'delete').and.callFake((url: string) => {
        return throwError(() => new Error('error'));
      });

      mockStoreService.task.id = taskId;  // Ensure task id is set
      component.deletingTask = true;
      component.handleDelete();
      expect(mockStoreService.showConfirmDeletion).toBeFalse();
      expect(component.isDeleting).toBeFalse();
      expect(window.alert).toHaveBeenCalledWith('No se pudo eliminar. Revisa si tienes el rol de líder.');
    });

  });
