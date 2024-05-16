import { Component, Input } from '@angular/core';
import { Router } from "@angular/router";
import { StoreService } from '../../store.service';

@Component({
  selector: 'app-confirm-go-back',
  template: `
    <div
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div
        *ngIf="!wannaGoBack"
        class="bg-white p-8 rounded-lg shadow-lg"
      >
        <p class="text-lg font-bold text-center">¿Deseas volver? Los cambios hechos no serán guardados.</p>
        <div class="flex justify-center mt-8">
          <button
            class="text-cardRed border border-cardRed bg-white text-sm font-roboto font-bold py-2 px-4 rounded-lg mt-4"
            (click)="handleGoBack()"
          >
            Volver
          </button>
          <button
            class="text-devotionPrimary border border-devotionPrimary bg-white text-sm font-roboto font-bold py-2 px-4 rounded-lg mt-4 ml-4"
            (click)="handleCancel()"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  `
})
export class ConfirmGoBackComponent {

  constructor(private router: Router, private store: StoreService) {}

  @Input() backButtonLink = "/home";
  wannaGoBack = false;

  handleGoBack() {
    this.wannaGoBack = true;
    this.router.navigateByUrl(this.backButtonLink);
    this.store.showConfirmGoBack = false;
  }

  handleCancel() {
    this.wannaGoBack = false;
    this.store.showConfirmGoBack = false;
  }

}
