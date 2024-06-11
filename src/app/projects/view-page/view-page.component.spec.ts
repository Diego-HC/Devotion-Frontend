import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewPageComponent } from './view-page.component';
import { ApiService } from '../../api.service';
import { StoreService } from '../../store.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthGoogleService } from '../../auth-google.service';
import { OAuthService, UrlHelperService, OAuthLogger, DateTimeProvider } from 'angular-oauth2-oidc';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ViewPageComponent', () => {
  let component: ViewPageComponent;
  let fixture: ComponentFixture<ViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewPageComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientTestingModule],
      providers: [ApiService, StoreService, AuthGoogleService, OAuthService, UrlHelperService, OAuthLogger, DateTimeProvider]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
