import { Injectable } from '@angular/core';
import { AuthConfig,OAuthService } from 'angular-oauth2-oidc';


@Injectable({
  providedIn: 'root'
})
export class AuthGoogleService {

  constructor(private oAuthService: OAuthService) {
    this.initLogin();
   }

  initLogin(){
    const config: AuthConfig = {
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      clientId: '271570148987-s8tfl47p8336j8luc80dv8fr4k0gbt7u.apps.googleusercontent.com',
      redirectUri: window.location.origin + '/home',
      scope: 'openid profile email',
    }

    this.oAuthService.configure(config);
    this.oAuthService.setupAutomaticSilentRefresh();
    this.oAuthService.loadDiscoveryDocumentAndTryLogin();
  }
  login(){
    this.oAuthService.initLoginFlow();
  }
  logout(){
    this.oAuthService.logOut();
  }
  getPofile(){
    return this.oAuthService.getIdentityClaims();
  }

}
