import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TaskMainPageComponent } from './task-main-page.component';
import { OAuthService, OAuthLogger, UrlHelperService, DateTimeProvider } from 'angular-oauth2-oidc';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of, throwError} from 'rxjs';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';

// Autora: Alexa Jimena Ramírez Ortiz - A00833943

describe('TaskMainPageComponent', () => {
  let component: TaskMainPageComponent;
  let fixture: ComponentFixture<TaskMainPageComponent>;
  let mockApiService: MockApiService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskMainPageComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: ApiService, Router,
          useFactory: () => new MockApiService(false)},
        OAuthService, UrlHelperService, OAuthLogger, DateTimeProvider],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskMainPageComponent);
    component = fixture.componentInstance;
    mockApiService = TestBed.inject(ApiService) as unknown as MockApiService;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  class MockApiService {

    public isLeader: boolean; 

    constructor (isLeader: boolean){
      this.isLeader = isLeader;
    }

    put(url: string, data: any) {
      console.log('Data:', data);
      console.log('Leader: ', this.isLeader)
      if (data.status === 3 && !this.isLeader) {
        return throwError({ error: { message: 'No autorizado' } });
      }
      if (data.status === 2 && this.isLeader) {
        return of({ status: data.status });
      }
      return of({ status: data.status });
    }

    get(url: string) {
    if (this.isLeader) {
      return of({
        id: '123',
        name: 'Revisar documento',
        description: 'Revisar el documento de requisitos del proyecto X',
        startDate: '2024-06-01',
        dueDate: '2024-06-15',
        assignee: {
          id: 'user1',
          name: 'Juan Perez',
          email: 'juan.perez@example.com',
          isLeader: true
        },
        priority: 2,
        status: 0,
        parentProject: 'proj1',
        tasks: [],
        breadcrumbs: [['Inicio', true], ['Proyecto X', false]],
      } as TaskResponse);
    } else {
      return of({
        id: '123',
        name: 'Revisar documento',
        description: 'Revisar el documento de requisitos del proyecto X',
        startDate: '2024-06-01',
        dueDate: '2024-06-15',
        assignee: {
          id: 'user1',
          name: 'Juan Perez',
          email: 'juan.perez@example.com',
          isLeader: false
        },
        priority: 2,
        status: 0,
        parentProject: 'proj1',
        tasks: [],
        breadcrumbs: [['Inicio', true], ['Proyecto X', false]],
      } as TaskResponse);
    }
  }
}

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // H9T1: De no empezado a en proceso como miembro 
  it('Should change state from not started to in progress as a member',(done) => {

    mockApiService = new MockApiService(false);
    fixture.detectChanges();

    // fixture.whenStable funciona como un setTimeout pero para pruebas asíncronas
    fixture.whenStable().then(() => {
      // Verificando que el estado inicial sea "No iniciado"
      expect(component.task!.status).toBe(0);
      // Cambiando el estado a "En proceso"
      component.updateStatus(1);
      // Actualizando la vista
      fixture.detectChanges();
      // Verificando que el estado haya cambiado a "En proceso"
      fixture.whenStable().then(() => {
        expect(component.task!.status).toBe(1);
        done();
        });
    });
  });

  // H9T2 De no empezado a en proceso como líder
  it('Should change state from not started to in progress as a leader',(done) => {
    mockApiService = new MockApiService(true);
    fixture.detectChanges();

    // fixture.whenStable funciona como un setTimeout pero para pruebas asíncronas
    fixture.whenStable().then(() => {
      // Verificando que el estado inicial sea "No iniciado"
      expect(component.task!.status).toBe(0);
      // Cambiando el estado a "En proceso"
      component.updateStatus(1);
      // Actualizando la vista
      fixture.detectChanges();
      // Verificando que el estado haya cambiado a "En proceso"
      fixture.whenStable().then(() => {
        expect(component.task!.status).toBe(1);
        done();
      });
    });
  });

  // H9T3: En revision a completado como lider
  it('Should change state from in review to completed as a leader',(done) => {
    mockApiService = new MockApiService(true);
    fixture.detectChanges();

    // Cambiando el estado inicial de la tarea a "En revisión"
    component.task!.status = 2;
    console.log(component.task!.status);
    //
    fixture.whenStable().then(() => {
      component.updateStatus(3);  // Intentar cambiar al estado "Completado"
      console.log('Nuevo Status', component.task!.status);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.showWarning).toBe(true);
        done();
      });
    });
  });

  // H9T4: En revision a completado como miembro
  // Como miembro no debería poder cambiar el estado de una tarea a "Completado"
  it('Should NOT change state from in review to completed as a member', (done) => {
    mockApiService = new MockApiService(false);
    fixture.detectChanges();

    // Cambiando el estado inicial de la tarea a "En revisión"
    component.task!.status = 2;
    // 
    fixture.whenStable().then(() => {
      component.updateStatus(3);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.showWarning).toBe(true);
        done();
      });
    });
  });

});

