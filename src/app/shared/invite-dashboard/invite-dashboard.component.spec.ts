import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { InviteDashboardComponent } from './invite-dashboard.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OAuthService, UrlHelperService, OAuthLogger, DateTimeProvider } from 'angular-oauth2-oidc';

describe('InviteDashboardComponent', () => {
  let component: InviteDashboardComponent;
  let fixture: ComponentFixture<InviteDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InviteDashboardComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [OAuthService, UrlHelperService, OAuthLogger, DateTimeProvider]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InviteDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
