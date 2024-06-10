import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler  } from '@angular/common/http';
import { LoadingComponent } from './loading.component';
import { OAuthService, UrlHelperService, OAuthLogger, DateTimeProvider } from 'angular-oauth2-oidc';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadingComponent],
      providers: [HttpClient, HttpHandler, OAuthService, UrlHelperService, OAuthLogger, DateTimeProvider]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
