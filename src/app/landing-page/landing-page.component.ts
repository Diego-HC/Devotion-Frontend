import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { AuthGoogleService } from '../auth-google.service';

@Component({
  selector: 'app-landing-page',
  template: `
    <a href="/login" class="ml-20">
      <button class="my-button">Go to Login</button>
    </a>
    <button (click)="logOut()" class="my-button">Close session</button>
    <p class="ml-20">{{ response?.message ?? "Loading..." }}</p>
  `,
  styles: [`
    .my-button {
      background-color: #4CAF50;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
    }
  `]
})
export class LandingPageComponent implements OnInit {
  constructor(private api: ApiService, private router: Router, private authGoogleService: AuthGoogleService) { }

  response: any;

  ngOnInit() {
    this.api.get('test/').subscribe((response) => {
      console.log(response);
      this.response = response;
    });
  }
  logOut(){
    this.authGoogleService.logout();
    this.router.navigate(['/login']);

  }
}
