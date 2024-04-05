import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SubprojectsComponent } from './projects/subprojects/subprojects.component';
import { SubprojectCardComponent } from './projects/subproject-card/subproject-card.component';
import { BreadcrumbsComponent } from './shared/breadcrumbs/breadcrumbs.component';
import { ViewPageComponent } from './projects/view-page/view-page.component';
import { MainPageComponent } from './projects/main-page/main-page.component';
import { CreateEditPageComponent } from './projects/create-edit-page/create-edit-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    SubprojectsComponent,
    SubprojectCardComponent,
    BreadcrumbsComponent,
    ViewPageComponent,
    MainPageComponent,
    CreateEditPageComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
