import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardMainPageComponent } from './dashboard-main-page.component';
import { HttpClientModule } from '@angular/common/http';
import { OAuthService, UrlHelperService, OAuthLogger, DateTimeProvider } from 'angular-oauth2-oidc';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('DashboardMainPageComponent', () => {
  let component: DashboardMainPageComponent;
  let fixture: ComponentFixture<DashboardMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardMainPageComponent],
      imports: [RouterTestingModule, HttpClientModule],
      providers: [OAuthService, UrlHelperService, OAuthLogger, DateTimeProvider],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
