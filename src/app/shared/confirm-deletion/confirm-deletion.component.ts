import { Component, Input } from '@angular/core';
import { Router } from "@angular/router";
import { ApiService } from '../../api.service';
import { StoreService } from '../../store.service';

@Component({
  selector: 'app-confirm-deletion',
  template: `
    <div
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div
        *ngIf="!isDeleting"
        class="bg-white p-8 rounded-lg shadow-lg"
      >
        <p class="text-lg font-bold text-center">¿Deseas eliminar est{{ deletingTask ? "a tarea" : "e proyecto" }}?</p>
        <div class="flex justify-center mt-8">
          <button
            class="text-cardRed border border-cardRed bg-white text-sm font-roboto font-bold py-2 px-4 rounded-lg mt-4"
            (click)="handleDelete()"
          >
            Eliminar
          </button>
          <button
            class="text-devotionPrimary border border-devotionPrimary bg-white text-sm font-roboto font-bold py-2 px-4 rounded-lg mt-4 ml-4"
            (click)="handleCancel()"
          >
            Cancelar
          </button>
        </div>
      </div>
      <div
        *ngIf="isDeleting"
        class="bg-white p-8 rounded-lg shadow-lg"
      >
        <p class="text-lg font-bold text-center">Eliminando...</p>
      </div>
    </div>
  `
})
export class ConfirmDeletionComponent {
  constructor(private router: Router, private api: ApiService, private store: StoreService) {}

  @Input() deletingTask = false;
  isDeleting = false;

  handleDelete() {
    this.isDeleting = true;
    this.api.delete(
      this.deletingTask
        ? `tasks/${this.store.task.id}`
        : `projects/${this.store.project.id}`
    ).subscribe(() => {
      void this.router.navigateByUrl('/home');
      this.store.showConfirmDeletion = false;
      this.isDeleting = false;
    }, () => {
      this.store.showConfirmDeletion = false;
      this.isDeleting = false;
      alert('No se pudo eliminar. Revisa si tienes el rol de líder.');
    });
  }

  handleCancel() {
    this.store.showConfirmDeletion = false;
  }
}
