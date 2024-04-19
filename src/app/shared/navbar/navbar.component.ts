import { Router } from "@angular/router";
import {Component, OnInit, NgZone } from '@angular/core';
import { AuthGoogleService } from "../../auth-google.service";
import {SessionStorageService} from "../../session-storage.service";

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
          <img [src]="storage.getItem('profileUrl')" class="w-10 rounded-full" />
            <p class="px-5 align-middle font-robotoCondensed">{{ storage.getItem('profileName') }}</p>
            <button (click)="logout()" class="px-5 align-middle font-robotoCondensed">Cerrar Sesión</button>
          </div>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent implements OnInit {
  constructor(protected auth: AuthGoogleService, private router: Router, private zone: NgZone, protected storage: SessionStorageService) { }

  ngOnInit() {
    this.auth.profile.subscribe((profile) => {
      if (!sessionStorage.getItem('profileName') && profile) {
        this.zone.run(() => {
          this.storage.setItem('profileName', profile.name);
          this.storage.setItem('profileUrl', profile.picture);
        });
      }
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
