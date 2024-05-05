import {Component, NgZone, OnInit} from '@angular/core';
import { ActivatedRoute} from "@angular/router";
import { ApiService} from "../../api.service";
import { SessionStorageService } from "../../session-storage.service";
import { AuthGoogleService } from "../../auth-google.service";

@Component({
  selector: 'app-project-members-page',
  template: `
    <!--    <app-loading *ngIf="response === undefined"/>-->
    <!--    <app-breadcrumbs-->
    <!--        *ngIf="response !== undefined"-->
    <!--        [breadcrumbs]="response.breadcrumbs"-->
    <!--    />-->
    <div class="overflow-x-auto mx-20 mt-4">
      <div class="bg-white py-6 rounded-lg">
        <form class="overflow-x-auto md:mr-96 mt-4">
          <div class="flex flex-row">
            <div class="dropdown dropdown-right flex items-stretch md:mb-12">
              <div tabindex="0" role="button" class="btn m-1">{{ selectedRole }}</div>
              <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><a (click)="updateSelectedRole('Todos los roles')">Todos los roles</a></li>
                <li><a (click)="updateSelectedRole('Líderes')">Líderes</a></li>
                <li><a (click)="updateSelectedRole('Miembros')">Miembros</a></li>
              </ul>
            </div>
            <input
              type="search" [(ngModel)]="searchQuery"
              (keyup)="onSearchChange()"
              class="md:ml-4 md:mt-1 w-64 h-12 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Buscar miembro"/>
          </div>
        </form>
        <div class="flex justify-center items-center">
          <table class="w-full my-5 overflow-auto">
            <thead class="text-left font-medium">
            <tr class="border-none box-shadow-none">
              <th
                class="font-roboto text-left italic px-4 py-2 no-border whitespace-nowrap overflow-auto text-[#676767]">
                Nombre
              </th>
              <th
                class="font-roboto text-left italic px-4 py-2 no-border whitespace-nowrap overflow-auto text-[#676767]">
                Email
              </th>
              <th
                class="font-roboto text-left italic px-4 py-2 no-border whitespace-nowrap overflow-auto text-[#676767]">
                Rol
              </th>
            </tr>
            </thead>
            <tbody>
            <tr class="cursor-pointer hover:bg-gray-50 border-2 font-robotoCondensed"
                 *ngFor="let member of filteredMembers">
              <td class="text-left px-4 py-2 font-semibold">
                <div class="flex flex-row">
                  <img [src]="storage.getItem('profileUrl')" class="w-10 rounded-full mx-2"/>
                  {{ member.name }}
                </div>
              </td>
              <td class="text-left px-4 py-2 font-semibold">
                {{ member.email }}
              </td>
              <td class="text-left px-4 py-2 font-semibold">
                {{ member.isLeader ? 'Líder' : 'Miembro'}}
              </td>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class ProjectMembersPageComponent implements OnInit{
  constructor(private route: ActivatedRoute, private api: ApiService, private zone: NgZone, protected storage: SessionStorageService, protected auth: AuthGoogleService) { }

  membersResponse: UserWithRole[] = [];
  filteredMembers: UserWithRole[] = [];
  selectedRole : string = "Todos los roles";
  searchQuery: string = '';


  ngOnInit(): void {
    this.auth.profile.subscribe((profile) => {
      if (!sessionStorage.getItem('profileName') && profile) {
        this.zone.run(() => {
          this.storage.setItem('profileName', profile.name);
          this.storage.setItem('profileUrl', profile.picture);
        });
      }
    });

    this.route.params.subscribe(params => {
      this.api.get(`projects/${params["id"]}/members`).subscribe((response: any) => {
        this.membersResponse = response;
        this.onRoleChange();
      });
    });
  }

  // Method triggered when the role is updated
  updateSelectedRole(role: string) {
    this.selectedRole = role;
    console.log(this.selectedRole);
    this.onRoleChange();
  }

  // Method triggered when the selection changes
  onRoleChange() {
    // Update the filtered members based on the selected role and search query
    if (this.selectedRole === "Todos los roles") {
      this.filteredMembers = this.membersResponse.filter(member =>
        member.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else if (this.selectedRole === "Líderes") {
      this.filteredMembers = this.membersResponse.filter(member =>
        member.isLeader && member.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredMembers = this.membersResponse.filter(member =>
        !member.isLeader && member.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  onSearchChange() {
    const lowerCaseSearchQuery = this.searchQuery.toLowerCase();

    if (this.selectedRole === "Todos los roles") {
      this.filteredMembers = this.membersResponse.filter(member =>
        member.name.toLowerCase().includes(lowerCaseSearchQuery)
      );
    } else if (this.selectedRole === "Líderes") {
      this.filteredMembers = this.membersResponse.filter(member =>
        member.isLeader && member.name.toLowerCase().includes(lowerCaseSearchQuery)
      );
    } else {
      this.filteredMembers = this.membersResponse.filter(member =>
        !member.isLeader && member.name.toLowerCase().includes(lowerCaseSearchQuery)
      );
    }
  }

}
