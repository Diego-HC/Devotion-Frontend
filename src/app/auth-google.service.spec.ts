import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OAuthService, UrlHelperService, OAuthLogger,DateTimeProvider } from 'angular-oauth2-oidc';
import { AuthGoogleService } from './auth-google.service';

describe('AuthGoogleService', () => {
  let service: AuthGoogleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthGoogleService,
        OAuthService,
        UrlHelperService,
        OAuthLogger,
        DateTimeProvider
      ]
    });

    service = TestBed.inject(AuthGoogleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
