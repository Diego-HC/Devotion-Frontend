import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { InvitePageComponent } from './invite-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OAuthService, UrlHelperService, OAuthLogger, DateTimeProvider } from 'angular-oauth2-oidc';

describe('InvitePageComponent', () => {
  let component: InvitePageComponent;
  let fixture: ComponentFixture<InvitePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvitePageComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [OAuthService, UrlHelperService, OAuthLogger, DateTimeProvider]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvitePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
