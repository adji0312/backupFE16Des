import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationAddComponent } from './application/application-add/application-add.component';
import { ApplicationEditComponent } from './application/application-edit/application-edit.component';
import { ApplicationViewComponent } from './application/application-view/application-view.component';
import { ApplicationComponent } from './application/application.component';
import { AuthGuard } from './auth.guard';
import { BacklogDevDetailComponent } from './backlogDev/backlog-dev-detail/backlog-dev-detail.component';
import { BacklogDevEditComponent } from './backlogDev/backlog-dev-edit/backlog-dev-edit.component';
import { BacklogDevelopmentComponent } from './backlogDev/backlog-development/backlog-development.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListFilterAppComponent } from './list-filter-app/list-filter-app.component';
import { LoginComponent } from './login/login.component';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { ProjectTypeComponent } from './projectType/project-type/project-type.component';
import { RoleListComponent } from './role/role-list/role-list.component';
import { UserListComponent } from './user/user-list/user-list.component';

const routes: Routes = [
  {path: "", redirectTo:"login", pathMatch:"full"},
  {path: "login", component:LoginComponent},
  {path: "role", component:RoleListComponent, canActivate: [AuthGuard]},
  {path: "user", component:UserListComponent, canActivate: [AuthGuard]},
  {path: "dashboard", component:DashboardComponent, canActivate: [AuthGuard]},
  {path: "projectType", component:ProjectTypeComponent, canActivate: [AuthGuard]},
  {path: "project", component:ProjectListComponent, canActivate: [AuthGuard]},
  {path: "backlogDevelopment", component:BacklogDevelopmentComponent, canActivate: [AuthGuard]},
  {path: "backlogDevDetail", component:BacklogDevDetailComponent, canActivate: [AuthGuard]},
  {path: "backlogDevEdit", component:BacklogDevEditComponent, canActivate: [AuthGuard]},
  {path: "application", component:ApplicationComponent, canActivate: [AuthGuard]},
  {path: "applicationAdd", component:ApplicationAddComponent, canActivate: [AuthGuard]},
  {path: "applicationView", component:ApplicationViewComponent, canActivate: [AuthGuard]},
  {path: "applicationEdit", component:ApplicationEditComponent, canActivate: [AuthGuard]},
  {path: "listFilterApp", component:ListFilterAppComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
