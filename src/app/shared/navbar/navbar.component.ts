import {Component, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {AuthGoogleService} from "../../auth-google.service";

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="bg-white py-3 fixed z-10 w-full shadow-lg">
      <div class="min-w-screen mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-full items-center">
          <div class = "flex flex-grow pl-20 pr-10">
            <a href="/"><app-devotion-logo fill="#000000" width="100" height="35" /></a>
            <h1 class="font-semibold text-2xl pl-8 text-black line-clamp-1">Administración de Proyectos</h1>
          </div>

          <div class="flex items-center justify-end pr-2">
          <img [src]="profileUrl" class="w-10 rounded-full" />
            <h1 class="px-5 align-middle font-robotoCondensed">{{ profileName }}</h1>
          </div>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent implements OnInit, OnChanges {
  profileName: any;
  profileUrl: any;

  constructor(private auth: AuthGoogleService) { }

  ngOnInit(): void {
    // this.auth.oAuthService.setupAutomaticSilentRefresh();
    // if (!this.auth.oAuthService.hasValidAccessToken()) {
    //   this.auth.oAuthService.initImplicitFlow();
    // }

    const profile = this.auth.getProfile();
    this.profileUrl = profile['picture'];
    this.profileName = profile['given_name'] + ' ' + profile['family_name'];
  }

  ngOnChanges(changes: SimpleChanges) {
    const profile = this.auth.getProfile();
    this.profileName = profile['given_name'] + ' ' + profile['family_name'];
    this.profileUrl = profile['picture'];
  }
}
