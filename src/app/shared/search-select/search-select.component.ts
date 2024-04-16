import { Component } from '@angular/core';

@Component({
  selector: 'app-search-select',
  template: `
  <div class="form-control mt-4 mb-4">
  <div class="input-group">
    <input type="search" [(ngModel)]="inputTag" (keyup)="onInputKeyup($event)" class="input input-bordered w-full" />
  </div>
  <div class="flex flex-wrap gap-2 mt-2">
    <div class="box-content bg-gray-200 p-1 font-robotoCondensed font-bold" *ngFor="let tag of tags">
      {{ tag }}
      <button class="btn btn-xs bg-gray-200 border-gray-200" (click)="removeTag(tag)">×</button>
    </div>
  </div>
</div>
  `
})

export class SearchSelectComponent {
  tags: string[] = [];
  inputTag: string = '';

  addTag(): void {
    if (this.inputTag && !this.tags.includes(this.inputTag)) {
      this.tags.push(this.inputTag.trim());
      this.inputTag = '';
    }
  }

  removeTag(tagToRemove: string): void {
    this.tags = this.tags.filter(tag => tag !== tagToRemove);
  }

  onInputKeyup(event: KeyboardEvent): void {
    if (event.key === "Enter") {
      this.addTag();
    }
  }
}
