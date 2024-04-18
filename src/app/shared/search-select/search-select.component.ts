import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../api.service';
import { HttpClient} from "@angular/common/http";
import { ActivatedRoute} from "@angular/router";
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-search-select',
  template: `
  <div class="form-control md:mt-4 md:mb-4">
  <div class="input-group">
    <input type="search" [(ngModel)]="inputTag" class="input input-bordered md:w-full shadow-md" (click)="fetchProjectMembers()" [placeholder]="selectedMember ? selectedMember.firstNames : 'Search member'"/>
  </div>
  <div class="flex flex-wrap md:gap-2 md:mt-2" *ngIf="projectMembers.length > 0">
    <div class="box-content bg-gray-200 p-1 font-robotoCondensed font-bold" *ngFor="let member of projectMembers">
      <button class="btn btn-xs bg-gray-200 border-gray-200" (click)="selectMember(member)" [class.bg-blue-500]="isSelected(member)" [class.text-white]="isSelected(member)">{{ member.firstNames }}</button>
    </div>
  </div>
</div>
  `
})

export class SearchSelectComponent implements OnInit {
  tags: string[] = [];
  inputTag: string = '';
  projectMembers: any[] = [];
  projectId: string = '';
  selectedMember: any = null;

  @Output() selectedMemberId = new EventEmitter<string>();

  constructor(private api: ApiService, private http: HttpClient, private route: ActivatedRoute) { }



  ngOnInit() {
    // Retrieve project ID from route parameters
    this.route.queryParams.subscribe(params => {
      this.projectId = params['Parent'];
    });
  }

  fetchProjectMembers(): void {
    // Replace 'projectId' with the actual project ID
    const id = this.projectId;
    const authToken: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE0NTg2NzgzLCJpYXQiOjE3MTMyOTA3ODMsImp0aSI6IjA4YjM4MWE4N2M3ODQ1ZGNiOTMxMmUyOWRmYTkxMmU4IiwidXNlcl9pZCI6IjJmNTMwNWMwLTdiMDMtNDcwNy1hNzM2LTM4MWY1OGFkMDI5OSJ9.lAuebpqOQ-VYBmnto-Dtk1oxWgoCVfCcuDFKyAIyQIc"
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });
    this.http.get<any[]>(`https://api.umm-actually.com/projects/${id}/members`, {headers})
      .subscribe((members: any[]) => {
        this.projectMembers = members;
      });
  }

  selectMember(member: any): void {
    // Do something with the selected member, like assigning it to the task
    this.selectedMember = member;
    this.selectedMemberId.emit(member.id);
    console.log('Selected member:', member);
    // You can add further logic here to handle the selected member
  }

  isSelected(member: any): boolean {
    return member === this.selectedMember;
  }

  addTag(): void {
    if (this.inputTag && !this.tags.includes(this.inputTag)) {
      this.tags.push(this.inputTag.trim());
      this.inputTag = '';
    }
  }

  // removeTag(tagToRemove: string): void {
  //   this.tags = this.tags.filter(tag => tag !== tagToRemove);
  // }
  //
  // onInputKeyup(event: KeyboardEvent): void {
  //   if (event.key === "Enter") {
  //     this.addTag();
  //   }
  // }
}
