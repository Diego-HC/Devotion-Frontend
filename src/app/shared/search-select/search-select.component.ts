import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { ApiService } from "../../api.service";

@Component({
  selector: "app-search-select",
  template: `
    <div class="form-control md:mt-4 md:mb-4">
      <div class="input-group flex items-center">
        <div
          class="flex flex-row flex-wrap py-2 gap-y-1 input input-bordered md:w-full shadow-md items-center h-fit min-h-12 relative"
        >
          @for (member of selectedMembers; track $index) {
          <span
            class="box-content bg-gray-200 font-robotoCondensed font-bold px-1 mx-1 text-s items-center tag"
          >
            {{ member.firstNames }} {{ member.lastNames }}
            <button (click)="deselectMembers(member)" class="md:gap-2 ">
              x
            </button>
          </span>
          }
          <input
            class="flex-grow h-full"
            type="search"
            [(ngModel)]="inputTag"
            (keyup)="updateSuggestions()"
            (focus)="changeShowUsers(true)"
          />
          @if (suggestions.length > 0 && inputTag) {
          <dialog
            class="absolute top-16 left-0 z-10 w-48 h-fit max-h-72 overflow-y-scroll p-4 bg-white shadow-lg rounded-md"
            open
          >
            <ul class="list-none">
              @for (suggestion of suggestions; track $index) {
              <li class="">
                <button
                  class="btn btn-xs w-full py-1 h-fit"
                  (click)="selectMembers(suggestion)"
                >
                  {{ suggestion.firstNames }} {{ suggestion.lastNames }}
                </button>
              </li>
              }
            </ul>
          </dialog>
          }
        </div>
      </div>

      @if (showUsers) {
      <div
        class="scroll-container md:mt-2"
        style="max-height: 80px; overflow-y: auto;"
      >
        <div class="flex flex-wrap md:gap-2 md:mt-2">
          <div
            class="box-content bg-gray-200 p-0 font-robotoCondensed font-bold"
            *ngFor="let member of projectMembers"
            [class.text-white]="isSelected(member)"
            [class.bg-[#5CCEFF]]="isSelected(member)"
          >
            <button
              class="btn btn-xs px-1 w-full h-full rounded-none bg-gray-200 border-gray-200 "
              (click)="selectMembers(member)"
              [class.bg-[#5CCEFF]]="isSelected(member)"
              [class.text-white]="isSelected(member)"
            >
              {{ member.firstNames }} {{ member.lastNames }}
            </button>
          </div>
        </div>
      </div>
      }
    </div>
  `,
})
export class SearchSelectComponent implements OnInit {
  tags: string[] = [];
  inputTag: string = "";
  projectMembers: any[] = [];

  selectedMembers: any[] = [];
  selectedMembersId: any[] = [];
  selectedLeaders: any[] = [];
  selectedLeadersId: any[] = [];

  suggestions: any[] = [];
  showUsers: boolean = false;

  @Input() projectId: string = "";
  @Input() singleSelectedMode: boolean = false;

  @Output() selectedMembersOutput = new EventEmitter<any[]>(); // Event emitter for selected members
  @Output() selectedLeadersOutput = new EventEmitter<any[]>();
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.fetchMembers();
  }

  changeShowUsers(showUsers: boolean) {
    this.showUsers = showUsers;
    console.log(this.showUsers);
  }

  fetchMembers() {
    this.api
      .get(
        this.singleSelectedMode && this.projectId
          ? `projects/${this.projectId}/members`
          : "users/"
      )
      .subscribe((members: any[]) => {
        this.projectMembers = members;
      });
  }

  updateSuggestions() {
    console.log(this.inputTag);
    if (!this.inputTag) {
      this.suggestions = [];
      return;
    }

    this.suggestions = this.projectMembers.filter(
      (member) =>
        !this.selectedMembers.includes(member) &&
        !this.selectedLeaders.includes(member) &&
        `${member.firstNames} ${member.lastNames}`
          .toLowerCase()
          .includes(this.inputTag.toLowerCase())
    );
    console.log(this.inputTag, this.suggestions);
  }

  selectMembers(member: any) {
    if (this.singleSelectedMode) {
      this.selectedMembers = [member];
      this.selectedMembersId = [member.id];
      this.selectedMembersOutput.emit(this.selectedMembersId);
      return;
    } else {
      if (!this.selectedMembers.includes(member)) {
        this.selectedMembers.push(member);
        this.selectedLeaders.push(member);
        this.selectedMembersId.push(member.id);
        this.selectedLeadersId.push(member.id);
        this.selectedMembersOutput.emit(this.selectedMembersId);
        this.selectedLeadersOutput.emit(this.selectedLeadersId);
      }
    }

    this.inputTag = "";
  }

  deselectMembers(member: any) {
    this.selectedMembers = this.selectedMembers.filter(
      (m) => m.id !== member.id
    );
    this.selectedLeaders = this.selectedLeaders.filter(
      (m) => m.id !== member.id
    );
    this.selectedMembersOutput.emit(this.selectedMembers);
    this.selectedLeadersOutput.emit(this.selectedLeaders);

    // Remove the tag associated with the deselected member
    this.removeTag(member.firstNames);
  }

  isSelected(member: any): boolean {
    return this.selectedMembers.includes(member);
  }

  removeTag(tagToRemove: string): void {
    this.tags = this.tags.filter((tag) => tag !== tagToRemove);
  }
}
