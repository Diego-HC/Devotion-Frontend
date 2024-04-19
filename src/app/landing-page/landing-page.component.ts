import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGoogleService } from '../auth-google.service';

@Component({
  selector: 'app-landing-page',
  template: `
    <app-loading tips="false" />
  `
})
export class LandingPageComponent implements OnInit {
  constructor(private router: Router, private auth: AuthGoogleService) { }

  ngOnInit() {
    // wait a while before redirecting to home
    // ES UNA MEXICANADA PERO FUNCIONA
    setTimeout(() => {
      if (this.auth.oAuthService.hasValidAccessToken()) {
        this.router.navigate(['/home']);
      } else {
        this.router.navigate(['/login']);
      }
    }, 500);
  }
}
