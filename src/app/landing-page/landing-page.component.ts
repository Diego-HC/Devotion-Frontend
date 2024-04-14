import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  template: `
    <app-devotion-logo
      width="146"
      height="40"
    />
    <app-dashboard-icon />
    <app-projects-icon />
    <app-files-icon />
    <app-plus-icon />
    <p>
      landing-page works!
    </p>
  `
})
export class LandingPageComponent {

}
