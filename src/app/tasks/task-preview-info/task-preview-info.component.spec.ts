import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskPreviewInfoComponent } from './task-preview-info.component';
import { OAuthService, UrlHelperService, OAuthLogger, DateTimeProvider } from 'angular-oauth2-oidc';
import { RouterTestingModule } from '@angular/router/testing';

describe('TaskPreviewInfoComponent', () => {
  let component: TaskPreviewInfoComponent;
  let fixture: ComponentFixture<TaskPreviewInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskPreviewInfoComponent],
      imports: [HttpClientTestingModule, RouterTestingModule], 
      providers: [OAuthService, UrlHelperService, OAuthLogger, DateTimeProvider]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskPreviewInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
