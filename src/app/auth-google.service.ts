import { Injectable, EventEmitter } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthGoogleService {
  profile = new EventEmitter<any>();

  constructor(public oAuthService: OAuthService) {
    this.initLogin();
  }

  initLogin(){
    const config: AuthConfig = {
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      clientId: '271570148987-s8tfl47p8336j8luc80dv8fr4k0gbt7u.apps.googleusercontent.com',
      redirectUri: window.location.origin,
      scope: 'openid profile email',
    }

    this.oAuthService.configure(config);
    this.oAuthService.setupAutomaticSilentRefresh();
    this.oAuthService.loadDiscoveryDocumentAndTryLogin();

    this.oAuthService.events.subscribe(e => {
      if (e.type === 'token_received') {
        this.setProfile();
      }
    });
  }

  login(){
    this.oAuthService.initLoginFlow();
  }

  logout(){
    this.oAuthService.logOut();
  }

  getProfile(){
    return this.oAuthService.getIdentityClaims();
  }

  setProfile() {
    this.profile.emit(this.oAuthService.getIdentityClaims());
  }
}
