import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiService} from "../../api.service";
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-search-select',
  template: `
  <div class="form-control md:mt-4 md:mb-4">
    <div class="input-group flex items-center">
      <div class="input input-bordered md:w-full shadow-md items-center justify-center">
          <span *ngFor="let member of selectedMembers" class="box-content bg-gray-200 p-0 font-robotoCondensed font-bold px-1 mr-1 text-s items-center tag">
            {{member.firstNames}}
            <button (click)="deselectMembers(member)" class = "md:gap-2 md:mt-2">x</button>
          </span>
          <input class= "" type="search" [(ngModel)]="inputTag" (click)="fetchMembers()" readonly>
        </div>
    </div>
  
  <div class="scroll-container md:mt-2" style="max-height: 80px; overflow-y: auto;">
  <div class="flex flex-wrap md:gap-2 md:mt-2">
    <div class="box-content bg-gray-200 p-0 font-robotoCondensed font-bold" *ngFor="let member of projectMembers" [class.text-white]="isSelected(member)" [class.bg-[#5CCEFF]]="isSelected(member)">
      <button class="btn btn-xs px-1 w-full h-full rounded-none bg-gray-200 border-gray-200 " (click) = "selectMembers(member)" [class.bg-[#5CCEFF]]="isSelected(member)" [class.text-white]="isSelected(member)">{{member.firstNames}}</button>
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
  selectedLeaders: any[] = [];


  @Output() selectedMembersOutput = new EventEmitter<any[]>(); // Event emitter for selected members
  @Output() selectedLeadersOutput = new EventEmitter<any[]>();

  constructor(private api: ApiService, private http: HttpClient) {}

  ngOnInit(): void {
  }
  
  fetchMembers() {
    const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE0NTg2NzgzLCJpYXQiOjE3MTMyOTA3ODMsImp0aSI6IjA4YjM4MWE4N2M3ODQ1ZGNiOTMxMmUyOWRmYTkxMmU4IiwidXNlcl9pZCI6IjJmNTMwNWMwLTdiMDMtNDcwNy1hNzM2LTM4MWY1OGFkMDI5OSJ9.lAuebpqOQ-VYBmnto-Dtk1oxWgoCVfCcuDFKyAIyQIc"
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    })
    const url = 'https://api.umm-actually.com/users/';
    this.http.get<any[]>(url, {headers}).subscribe((members: any[]) => {
      this.projectMembers = members;
      console.log(this.projectMembers);
    });
  }

  selectMembers(member: any) {
    if (!this.selectedMembers.includes(member)) {
      this.selectedMembers.push(member.id);
      this.selectedLeaders.push(member.id);
      this.projectMembers = this.projectMembers.filter(m => m.id !== member.id);
      this.selectedMembersOutput.emit(this.selectedMembers);
      this.selectedLeadersOutput.emit(this.selectedLeaders);
    }
  }

  deselectMembers(member: any){
    this.selectedMembers = this.selectedMembers.filter(m => m.id !== member.id);
    this.selectedLeaders = this.selectedLeaders.filter(m => m.id !== member.idd);
    this.projectMembers.push(member.id);
    this.selectedMembersOutput.emit(this.selectedMembers); 
    this.selectedLeadersOutput.emit(this.selectedLeaders);
  }

  isSelected(member: any): boolean {
    return this.selectedMembers.includes(member);
  }

  addTag(): void {
    if (this.inputTag && !this.tags.includes(this.inputTag)) {
      this.tags.push(this.inputTag.trim());
      this.inputTag = '';
    }
  }

  removeTag(tagToRemove: string): void {
    this.tags = this.tags.filter(tag => tag !== tagToRemove);
  }

}
