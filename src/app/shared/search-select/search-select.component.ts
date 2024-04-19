import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {ApiService} from "../../api.service";

@Component({
  selector: 'app-search-select',
  template: `
    <div class="form-control md:mt-4 md:mb-4">
      <div class="input-group flex items-center">
        <div class="input input-bordered md:w-full shadow-md items-center justify-center">
          <span *ngFor="let member of selectedMembers"
                class="box-content bg-gray-200 p-0 font-robotoCondensed font-bold px-1 mr-1 text-s items-center tag">
            {{ member.firstNames }} {{ member.lastNames }}
            <button (click)="deselectMembers(member)" class="md:gap-2 md:mt-2">x</button>
          </span>
          <input class="" type="search" [(ngModel)]="inputTag" (click)="fetchMembers()" readonly>
        </div>
      </div>

      <div class="scroll-container md:mt-2" style="max-height: 80px; overflow-y: auto;">
        <div class="flex flex-wrap md:gap-2 md:mt-2">
          <div class="box-content bg-gray-200 p-0 font-robotoCondensed font-bold" *ngFor="let member of projectMembers"
               [class.text-white]="isSelected(member)" [class.bg-[#5CCEFF]]="isSelected(member)">
            <button class="btn btn-xs px-1 w-full h-full rounded-none bg-gray-200 border-gray-200 "
                    (click)="selectMembers(member)" [class.bg-[#5CCEFF]]="isSelected(member)"
                    [class.text-white]="isSelected(member)">{{ member.firstNames }} {{ member.lastNames }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})

export class SearchSelectComponent implements OnInit {
  tags: string[] = [];
  inputTag: string = '';
  projectMembers: any[] = [];

  selectedMembers: any[] = [];
  selectedMembersId: any[] = [];
  selectedLeaders: any[] = [];
  selectedLeadersId: any[] = [];

  @Input() projectId: string = '';
  @Input() singleSelectedMode: boolean = false;

  @Output() selectedMembersOutput = new EventEmitter<any[]>(); // Event emitter for selected members
  @Output() selectedLeadersOutput = new EventEmitter<any[]>();
  constructor(private api: ApiService) {
  }

  ngOnInit(): void {
  }

  fetchMembers() {
    this.api.get(
      (this.singleSelectedMode && this.projectId) ? `projects/${this.projectId}/members` : "users/"
    ).subscribe((members: any[]) => {
      this.projectMembers = members;
    });
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
  }

  deselectMembers(member: any) {
    this.selectedMembers = this.selectedMembers.filter(m => m.id !== member.id);
    this.selectedLeaders = this.selectedLeaders.filter(m => m.id !== member.id);
    this.selectedMembersOutput.emit(this.selectedMembers);
    this.selectedLeadersOutput.emit(this.selectedLeaders);

    // Remove the tag associated with the deselected member
    this.removeTag(member.firstNames);
  }

  isSelected(member: any): boolean {
    return this.selectedMembers.includes(member);
  }

  removeTag(tagToRemove: string): void {
    this.tags = this.tags.filter(tag => tag !== tagToRemove);
  }
}
