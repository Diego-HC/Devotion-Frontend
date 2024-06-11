import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import { AuthGoogleService } from './../auth-google.service';
import { ApiService } from '../api.service';
import { Router } from "@angular/router";
import { OAuthModule } from "angular-oauth2-oidc";
import {StoreService} from "../store.service";
import {Subscription} from "rxjs";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import { DevotionLogoComponent } from '../shared/icons/devotion-logo/devotion-logo.component';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let authGoogleService: AuthGoogleService;
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    const authGoogleServiceMock = {
      login: jasmine.createSpy('login').and.returnValue(of(true))
    };
    await TestBed.configureTestingModule({
      declarations: [LoginComponent, DevotionLogoComponent],
      imports: [HttpClientTestingModule, OAuthModule.forRoot()],
      providers: [
        { provide: AuthGoogleService, useValue: authGoogleServiceMock },
        ApiService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
    
    
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authGoogleService = TestBed.inject(AuthGoogleService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login method when button is clicked', () => {
    spyOn(component, 'login');
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(component.login).toHaveBeenCalled();
  });

  it('should call AuthGoogleService login method', () => {
    component.login();
    expect(authGoogleService.login).toHaveBeenCalled();
  });

});
