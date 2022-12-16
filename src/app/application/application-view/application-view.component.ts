import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApplicationDatabase } from 'src/app/list-filter-app/app-database/app-database';
import { AppDatabaseService } from 'src/app/list-filter-app/app-database/app-database.service';
import { ApplicationOperatingSystem } from 'src/app/list-filter-app/app-opr-sys/app-opr-sys';
import { AppOprSysService } from 'src/app/list-filter-app/app-opr-sys/app-opr-sys.service';
import { ApplicationProgrammingLanguage } from 'src/app/list-filter-app/app-prog-lang/app-prog-lang';
import { AppProgLangService } from 'src/app/list-filter-app/app-prog-lang/app-prog-lang.service';
import { ApplicationServer } from 'src/app/list-filter-app/app-server/app-server';
import { AppServerService } from 'src/app/list-filter-app/app-server/app-server.service';
import { ApplicationType } from 'src/app/list-filter-app/app-type/app-type';
import { AppTypeService } from 'src/app/list-filter-app/app-type/app-type.service';
import { Server } from 'src/app/list-filter-app/server/server';
import { ServerService } from 'src/app/list-filter-app/server/server.service';
import { LoginAuthService } from 'src/app/login-auth.service';
import { Application } from '../application';
import { ApplicationService } from '../application.service';

@Component({
  selector: 'app-application-view',
  templateUrl: './application-view.component.html',
  styleUrls: ['./application-view.component.css']
})
export class ApplicationViewComponent implements OnInit {


  public loginuser: any = {};
  devices: any = [];
  types: any = [];
  progLangs: any = [];
  servers: any = [];
  databases: any = [];
  appServers: any = [];
  oprSystems: any = [];
  viewApplication: Application = new Application;

  constructor(
    private applicationService: ApplicationService,
    private authService: LoginAuthService,
    private router: Router,
  ) { 
    this.authService.isLoggedIn();
    this.loginuser = JSON.parse(localStorage.getItem('currentUser') as string);
  }

  ngOnInit(): void {
    this.viewApplication = this.applicationService.viewApp;
    this.devices = this.viewApplication.application_device.split(',');
    this.types = this.viewApplication.application_type.split(',');
    this.progLangs = this.viewApplication.application_programming_language.split(',');
    this.servers = this.viewApplication.server.split(',');
    this.databases = this.viewApplication.application_database.split(',');
    this.appServers = this.viewApplication.application_server.split(',');
    this.oprSystems = this.viewApplication.application_operating_system.split(',');
  }

  public closeApplicationView(){
    this.router.navigate(['application']);
  }

}
