import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import { AuthGoogleService } from './../auth-google.service';
import { ApiService } from '../api.service';
import { Router } from "@angular/router";
import { OAuthModule } from "angular-oauth2-oidc";
import {StoreService} from "../store.service";
import {Subscription} from "rxjs";


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientTestingModule, OAuthModule.forRoot()],
      providers: [ApiService],
    })
    .compileComponents();
    
    
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
