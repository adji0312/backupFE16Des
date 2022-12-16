import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoleListComponent } from './role/role-list/role-list.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectTypeComponent } from './projectType/project-type/project-type.component';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BacklogDevelopmentComponent } from './backlogDev/backlog-development/backlog-development.component';
import { BacklogDevDetailComponent } from './backlogDev/backlog-dev-detail/backlog-dev-detail.component';
import { BacklogDevEditComponent } from './backlogDev/backlog-dev-edit/backlog-dev-edit.component';
import { UserService } from './user/user.service';
import { AuthGuard } from './auth.guard';
import { LoginAuthService } from './login-auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Toast, ToastrModule } from 'ngx-toastr';
import { ApplicationComponent } from './application/application.component';
import { ListFilterAppComponent } from './list-filter-app/list-filter-app.component';
import { AppDatabaseComponent } from './list-filter-app/app-database/app-database.component';
import { AppTypeComponent } from './list-filter-app/app-type/app-type.component';
import { AppProgLangComponent } from './list-filter-app/app-prog-lang/app-prog-lang.component';
import { AppServerComponent } from './list-filter-app/app-server/app-server.component';
import { AppOprSysComponent } from './list-filter-app/app-opr-sys/app-opr-sys.component';
import { ServerComponent } from './list-filter-app/server/server.component';
import { ApplicationAddComponent } from './application/application-add/application-add.component';
import { ApplicationViewComponent } from './application/application-view/application-view.component';
import { ApplicationEditComponent } from './application/application-edit/application-edit.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SearchFilterPipe } from './search-filter.pipe';
import { OrderByPipe } from './order-by.pipe';

@NgModule({
  declarations: [
    AppComponent,
    RoleListComponent,
    UserListComponent,
    LoginComponent,
    SidebarComponent,
    DashboardComponent,
    ProjectTypeComponent,
    ProjectListComponent,
    BacklogDevelopmentComponent,
    BacklogDevDetailComponent,
    BacklogDevEditComponent,
    ApplicationComponent,
    ListFilterAppComponent,
    AppDatabaseComponent,
    AppTypeComponent,
    AppProgLangComponent,
    AppServerComponent,
    AppOprSysComponent,
    ServerComponent,
    ApplicationAddComponent,
    ApplicationViewComponent,
    ApplicationEditComponent,
    SearchFilterPipe,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    TooltipModule.forRoot(),
    Ng2SearchPipeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true
    })
  ],
  providers: [
    UserService,
    AuthGuard,
    LoginAuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
