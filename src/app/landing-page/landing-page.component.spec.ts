import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule} from "@angular/router/testing";
import { LandingPageComponent } from './landing-page.component';
import { AuthGoogleService } from '../auth-google.service';
import { OAuthService, UrlHelperService, OAuthLogger, DateTimeProvider } from 'angular-oauth2-oidc';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [LandingPageComponent],
      providers: [
        AuthGoogleService,
        OAuthService,
        UrlHelperService,
        OAuthLogger,
        DateTimeProvider
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
