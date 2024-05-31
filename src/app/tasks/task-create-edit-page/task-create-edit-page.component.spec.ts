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
  let mockRouter = {
    navigateByUrl: jasmine.createSpy('navigateByUrl'),
  };
  const taskId = "b3045125-c471-4c40-bcc3-6ec1ca9edc9f";

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
            delete: (url: string) => {
              return {
                subscribe: () => {
                  return [];
                },
              };
            }
          },
        },
        {
          provide: StoreService,
          useValue: {
            task: {
              id: '',
              name: '',
              description: '',
              startDate: '',
              dueDate: '',
              assignee: {
                id: '',
                name: '',
                email: '',
                isLeader: false
              },
              priority: 0,
              status: 0,
              parentProject: '',
              parentTask: ''
            },
          }
        }
      ]
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
