import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { StoreService } from "../../store.service";

@Component({
  selector: 'app-project-members-page',
  template: `
    <div class="mx-20 mt-4">
      <a
        [routerLink]="backButtonLink"
        class="text-devotionPrimary text-lg font-semibold"
      >
        〈ㅤVolver
      </a>
      <form class="md:mr-96 mt-4">
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
            type="search"
            name="search"
            [(ngModel)]="searchQuery"
            (keyup)="onRoleChange()"
            class="md:ml-4 md:mt-1 w-64 h-12 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Buscar miembro"/>
        </div>
      </form>
      <div class="flex justify-center items-center">
          <table class="w-full my-3 overflow-auto">
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
                <div class="flex flex-row items-center gap-2">
                  <img [src]="member.profilePicture || '../../assets/dummy-avatar.jpg'" class="w-10 rounded-full mx-2"/>
                  {{ member.name }}
                </div>
              </td>
              <td class="text-left px-4 py-2">
                {{ member.email }}
              </td>
              <td class="text-left px-4 py-2">
                {{ member.isLeader ? 'Líder' : 'Miembro'}}
              </td>
            </tbody>
          </table>
        </div>
    </div>
  `
})
export class ProjectMembersPageComponent implements OnInit{
  constructor(private route: ActivatedRoute, private router: Router, protected store: StoreService) { }

  filteredMembers: MinimalUser[] = [];
  selectedRole : string = "Todos los roles";
  searchQuery: string = "";
  backButtonLink = "/home";


  ngOnInit(): void {
    if (this.store.pageWasReloaded) {
      void this.router.navigateByUrl(this.backButtonLink);
      return;
    }
    this.route.params.subscribe(params => {
      this.backButtonLink = `/project/${params["id"]}`;
    });
    this.filteredMembers = [...this.store.project.leaders, ...this.store.project.members];
  }

  // Method triggered when the role is updated
  updateSelectedRole(role: string) {
    this.selectedRole = role;
    this.onRoleChange();
  }

  onRoleChange() {
    const lowerCaseSearchQuery = this.searchQuery.toLowerCase();

    if (this.selectedRole === "Todos los roles") {
      this.filteredMembers = [...this.store.project.leaders, ...this.store.project.members].filter(member =>
        member.name.toLowerCase().includes(lowerCaseSearchQuery)
      );
    } else if (this.selectedRole === "Líderes") {
      this.filteredMembers = this.store.project.leaders.filter(member =>
        member.isLeader && member.name.toLowerCase().includes(lowerCaseSearchQuery)
      );
    } else {
      this.filteredMembers = this.store.project.members.filter(member =>
        !member.isLeader && member.name.toLowerCase().includes(lowerCaseSearchQuery)
      );
    }
  }
}
