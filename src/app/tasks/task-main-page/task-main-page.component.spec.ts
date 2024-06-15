import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TaskMainPageComponent } from './task-main-page.component';
import { OAuthService, OAuthLogger, UrlHelperService, DateTimeProvider } from 'angular-oauth2-oidc';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('TaskMainPageComponent', () => {
  let component: TaskMainPageComponent;
  let fixture: ComponentFixture<TaskMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskMainPageComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [OAuthService, UrlHelperService, OAuthLogger, DateTimeProvider],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
