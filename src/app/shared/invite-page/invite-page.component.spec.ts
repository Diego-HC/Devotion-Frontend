import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { InvitePageComponent } from './invite-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OAuthService, UrlHelperService, OAuthLogger, DateTimeProvider } from 'angular-oauth2-oidc';
import { of } from 'rxjs';
import { ActivatedRoute } from "@angular/router";
import { ApiService } from "../../api.service";
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('InvitePageComponent', () => {
  let component: InvitePageComponent;
  let fixture: ComponentFixture<InvitePageComponent>;
  let apiService: ApiService;
  let route: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvitePageComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [OAuthService, UrlHelperService, OAuthLogger, DateTimeProvider,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ inviteId: '123' })
          }
        },
        {
          provide: ApiService,
          useValue: {
            get: jasmine.createSpy('get').and.returnValue(of({ is_task: false, resource: '456' }))
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]

    })

    .compileComponents();
    
    fixture = TestBed.createComponent(InvitePageComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    route = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call API and set isTask and projectOrTaskId correctly on init', () => {
    expect(apiService.get).toHaveBeenCalledWith('invites/123/');
    expect(component.isTask).toBeFalse();
    expect(component.projectOrTaskId).toBe('456');
  });

  it('should display app-main-page when isTask is false', () => {
    component.isTask = false;
    component.projectOrTaskId = '456';
    fixture.detectChanges();
    const mainPage: DebugElement = fixture.debugElement.query(By.css('app-main-page'));
    const taskMainPage: DebugElement = fixture.debugElement.query(By.css('app-task-main-page'));
    expect(mainPage).toBeTruthy();
    expect(taskMainPage).toBeNull();
  });
  it('should display app-task-main-page when isTask is true', () => {
    component.isTask = true;
    component.projectOrTaskId = '456';
    fixture.detectChanges();
    const mainPage: DebugElement = fixture.debugElement.query(By.css('app-main-page'));
    const taskMainPage: DebugElement = fixture.debugElement.query(By.css('app-task-main-page'));
    expect(taskMainPage).toBeTruthy();
    expect(mainPage).toBeNull();
  });


});
