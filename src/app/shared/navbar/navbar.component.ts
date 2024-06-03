import { Router } from "@angular/router";
import {Component, OnInit, NgZone } from '@angular/core';
import { AuthGoogleService } from "../../auth-google.service";
import { SessionStorageService } from "../../session-storage.service";
import { ApiService } from "../../api.service";

@Component({
  selector: 'app-navbar',
  template: `
    <nav [ngClass]="(isInvite ? 'bg-devotionSecondary' : 'bg-white') + ' py-3 fixed z-10 w-full shadow-lg'">
      <div class="min-w-screen mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-full items-center">
          <div class = "flex flex-grow pl-20 pr-10">
            <a href="/"><app-devotion-logo fill="black" width="100" height="35" /></a>
            <h1 class="font-semibold text-2xl pl-8 line-clamp-1">Administración de Proyectos</h1>
          </div>

          <div class="flex items-center justify-end pr-2">
            @if (isInvite) {
              <p class="px-5 align-middle font-robotoCondensed">Vista de invitado</p>
            } @else {
              <img [src]="storage.getItem('profileUrl')" class="w-10 rounded-full" />
              <p class="px-5 align-middle font-robotoCondensed">{{ storage.getItem('profileName') }}</p>
              <button (click)="logout()" class="px-5 align-middle font-robotoCondensed">Cerrar Sesión</button>
            }
          </div>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent implements OnInit {
  constructor(protected auth: AuthGoogleService, private router: Router, private zone: NgZone, protected storage: SessionStorageService, private api: ApiService) { }

  isInvite = window.location.pathname.includes('invite');

  ngOnInit() {
    this.auth.profile.subscribe((profile) => {
      this.api.put("me/", { profile_picture: profile.picture }).subscribe();
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
