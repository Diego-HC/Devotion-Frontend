import { Component, Input } from "@angular/core";
import { StoreService } from "../../store.service";

type SelectionType = 'leaders' | 'members' | 'assignee';

@Component({
  selector: "app-search-select",
  template: `
      <div class="form-control md:mt-4 md:mb-4">
          <div class="input-group flex items-center">
              <div
                      class="flex flex-row flex-wrap py-2 gap-y-1 input input-bordered md:w-full shadow-md items-center h-fit min-h-12 relative"
                      *ngIf="store.userPool.length > 0"
              >
                  @for (member of selection(); track $index) {
                      <span class="box-content bg-gray-200 font-robotoCondensed font-bold px-1 mx-1 text-s items-center">
              {{ member.name }}
                          <button (click)="deselectMember(member)" class="md:gap-2 ">×</button>
            </span>
                  }
                  <input
                          class="flex-grow h-full"
                          type="search"
                          [(ngModel)]="searchInput"
                          (keyup)="updateSuggestions($event)"
                          (focusin)="showSuggestions = true"
                          (focusout)="showSuggestions = false"
                  />
                  @if (showSuggestions && suggestions.length > 0) {
                      <dialog
                              class="absolute top-16 left-0 z-10 w-10/12 h-fit max-h-72 overflow-y-scroll p-4 bg-white shadow-lg rounded-md"
                              open
                      >
                          <ul class="list-none flex flex-wrap gap-2">
                              @for (suggestion of suggestions; track $index) {
                                  <li class="">
                                      <button
                                              class="btn btn-xs w-full py-2 h-fit"
                                              (mousedown)="selectSuggestionMouseDown($event)"
                                              (click)="selectSuggestion(suggestion)"
                                      >
                                          {{ suggestion.name }}
                                      </button>
                                  </li>
                              }
                          </ul>
                      </dialog>
                  }
              </div>
          </div>
      </div>
  `,
})
export class SearchSelectComponent {
  suggestions: User[] = [];
  showSuggestions = false;
  searchInput = "";

  @Input() selecting: SelectionType = 'members';

  constructor(public store: StoreService) {}

  selection(): User[] {
    if (this.selecting === 'assignee') {
      if (this.store.task.assignee.id === "") {
        return [];
      }
      return [this.store.task.assignee];
    }
    return this.store.project[this.selecting];
  }

  selectMember(member: User) {
    if (this.selecting === 'assignee') {
      this.store.task.assignee = member;
      return;
    }
    if (this.store.project[this.selecting].includes(member)) {
      return;
    }
    this.store.project[this.selecting].push(member);
  }

  deselectMember(member: User) {
    if (this.selecting === 'assignee') {
      this.store.task.assignee = { id: "", name: "", email: "", isLeader: false };
      return;
    }
    this.store.project[this.selecting] = this.store.project[this.selecting].filter(
      (m) => m.id !== member.id
    );
  }

  deselectLastMember() {
    if (this.selection().length === 0) {
      return;
    }
    if (this.selecting === 'assignee') {
      this.store.task.assignee = { id: "", name: "", email: "", isLeader: false };
      return;
    }
    this.store.project[this.selecting] = this.store.project[this.selecting].slice(0, -1);
  }

  updateSuggestions(event: KeyboardEvent) {
    if (!this.searchInput && event.key === "Backspace") {
      this.deselectLastMember();
      return;
    }

    this.suggestions = this.store.userPool.filter((member) => {
      return !this.selection().includes(member) &&
        member.name.toLowerCase().includes(this.searchInput.toLowerCase());
    });
  }

  selectSuggestion(member: User) {
    this.searchInput = "";
    this.suggestions = [];
    this.selectMember(member);
  }

  selectSuggestionMouseDown(event: MouseEvent) {
    event.preventDefault();
  }

  checkLeaders() {
    if (this.store.project.leaders.length === 0) {
      window.alert('Es necesario agregar líderes');
    }
  }
}
