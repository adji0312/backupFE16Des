import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginAuthService } from 'src/app/login-auth.service';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ApplicationService } from '../application.service';
import { Application } from '../application';
import { AppProgLangService } from 'src/app/list-filter-app/app-prog-lang/app-prog-lang.service';
import { AppOprSysService } from 'src/app/list-filter-app/app-opr-sys/app-opr-sys.service';
import { AppDatabaseService } from 'src/app/list-filter-app/app-database/app-database.service';
import { AppServerService } from 'src/app/list-filter-app/app-server/app-server.service';
import { ServerService } from 'src/app/list-filter-app/server/server.service';
import { AppTypeService } from 'src/app/list-filter-app/app-type/app-type.service';
import { ApplicationProgrammingLanguage } from 'src/app/list-filter-app/app-prog-lang/app-prog-lang';
import { ApplicationOperatingSystem } from 'src/app/list-filter-app/app-opr-sys/app-opr-sys';
import { ApplicationDatabase } from 'src/app/list-filter-app/app-database/app-database';
import { ApplicationServer } from 'src/app/list-filter-app/app-server/app-server';
import { Server } from 'src/app/list-filter-app/server/server';
import { ApplicationType } from 'src/app/list-filter-app/app-type/app-type';
import { Subscription, switchMap, timer } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-application-edit',
  templateUrl: './application-edit.component.html',
  styleUrls: ['./application-edit.component.css']
})
export class ApplicationEditComponent implements OnInit {

  public loginuser: any = {};
  editApplication: Application = new Application;
  editApplicationForm!: FormGroup;

  progLangs!: ApplicationProgrammingLanguage[];
  oprSys!: ApplicationOperatingSystem[];
  databases!: ApplicationDatabase[];
  serversApp!: ApplicationServer[];
  servers!: Server[];
  types!: ApplicationType[];
  applications: Application[] = [];

  realTimeDataSubscription$!: Subscription;

  selectedDevice:any = [];
  selectedType:any = [];
  selectedProgLang:any = [];
  selectedServer:any = [];
  selectedDatabase:any = [];
  selectedAppServer:any = [];
  selectedOprSys:any = [];

  devices: any = [];
  appTypes: any = [];
  appProgLangs: any = [];
  serverApp: any = [];
  appDatabases: any = [];
  appServers: any = [];
  oprSystems: any = [];

  viewApplication: Application = new Application;
  constructor(
    private authservice: LoginAuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private applicationService: ApplicationService,
    private progLangService: AppProgLangService,
    private oprSysService: AppOprSysService,
    private databaseService: AppDatabaseService,
    private serversAppService: AppServerService,
    private serverService: ServerService,
    private typeService: AppTypeService
  ) { 
    this.authservice.isLoggedIn();
      this.authservice.isLoggedIn();
      this.loginuser = JSON.parse(localStorage.getItem('currentUser') as string);
      this.editApplicationForm = this.formBuilder.group({
        application_name: [''],
        application_short_dsc: [''],
        application_device: [''],
        application_type: [''],
        application_programming_language: [''],
        application_database: [''],
        application_server: [''],
        application_operating_system: [''],
        server: [''],
    });
  }

  ngOnInit(): void {
    this.getProgLangs();
    this.getOprSys();
    this.getDabases();
    this.getServersApp();
    this.getServers();
    this.getTypes();

    this.viewApplication = this.applicationService.editApp;
    console.log(this.viewApplication.application_database);
    this.appTypes = this.viewApplication.application_type.split(',');
    this.devices = this.viewApplication.application_device.split(',');
    this.appProgLangs = this.viewApplication.application_programming_language.split(',');
    this.serverApp = this.viewApplication.server.split(',');
    this.appDatabases = this.viewApplication.application_database.split(',');
    this.appServers = this.viewApplication.application_server.split(',');
    this.oprSystems = this.viewApplication.application_operating_system.split(',');
  }


  onChangeDevice(event:any){
    let index = this.selectedDevice.indexOf(event.target.value);
    if(index == -1){
      this.selectedDevice.push(event.target.value);
    }else{
      this.selectedDevice.splice(index,1);
    }
    console.log(this.selectedDevice);
  }

  onChangeType(event:any){
    let index = this.selectedType.indexOf(event.target.value);
    if(index == -1){
      this.selectedType.push(event.target.value);
    }else{
      this.selectedType.splice(index,1);
    }
    console.log(this.selectedType);
  }
  
  onChangeProgLang(event:any){
    let index = this.selectedProgLang.indexOf(event.target.value);
    if(index == -1){
      this.selectedProgLang.push(event.target.value);
    }else{
      this.selectedProgLang.splice(index,1);
    }
    console.log(this.selectedProgLang);
  }

  onChangeServer(event:any){
    let index = this.selectedServer.indexOf(event.target.value);
    if(index == -1){
      this.selectedServer.push(event.target.value);
    }else{
      this.selectedServer.splice(index,1);
    }
    console.log(this.selectedServer);
  }

  onChangeDatabase(event:any){
    let index = this.selectedDatabase.indexOf(event.target.value);
    if(index == -1){
      this.selectedDatabase.push(event.target.value);
    }else{
      this.selectedDatabase.splice(index,1);
    }
    console.log(this.selectedDatabase);
  }

  onChangeAppServer(event:any){
    let index = this.selectedAppServer.indexOf(event.target.value);
    if(index == -1){
      this.selectedAppServer.push(event.target.value);
    }else{
      this.selectedAppServer.splice(index,1);
    }
    console.log(this.selectedAppServer);
  }
  onChangeOprSys(event:any){
    let index = this.selectedOprSys.indexOf(event.target.value);
    if(index == -1){
      this.selectedOprSys.push(event.target.value);
    }else{
      this.selectedOprSys.splice(index,1);
    }
    console.log(this.selectedOprSys);
  }

  addList(){
    this.editApplicationForm.patchValue({
      application_device: this.editApplication.application_device = this.selectedDevice.toString(),
      application_type: this.editApplication.application_type = this.selectedType.toString(), 
      application_programming_language: this.editApplication.application_programming_language = this.selectedProgLang.toString(),
      server: this.editApplication.server = this.selectedServer.toString(),
      application_database: this.editApplication.application_database = this.selectedDatabase.toString(),
      application_server: this.editApplication.application_server = this.selectedAppServer.toString(),
      application_operating_system: this.editApplication.application_operating_system = this.selectedOprSys.toString()
    });
  }
  private getProgLangs(){
    this.progLangService.getAllProgLang(this.loginuser.token).subscribe(data => {
      this.progLangs = data;
    })
  }

  private getOprSys(){
    this.oprSysService.getAllOprSys(this.loginuser.token).subscribe(
      data => {
        this.oprSys = data;
      }
    )
  }

  private getServersApp(){
    this.serversAppService.getAllAppServer(this.loginuser.token).subscribe(
      data => {
        this.serversApp = data;
      }
    )  
  }
  
  private getDabases(){
    this.databaseService.getAllDatabase(this.loginuser.token).subscribe(
      data => {
        this.databases = data;
      }
    )
  }

  private getServers(){
    this.serverService.getAllServer(this.loginuser.token).subscribe(
      data => {
        this.servers = data;
      }
    )
  }

  private getTypes(){
    this.typeService.getAllServer(this.loginuser.token).subscribe(
      data => {
        this.types = data;
      }
    )
  }

  onEditApplication(){
    if(this.editApplicationForm.invalid){
      return;
    }

    this.addList();

    this.applicationService.addApplication(this.editApplicationForm.value, this.loginuser.token).subscribe(
      (response: Application) => {
        this.getApplications();
        console.log(response);
        Swal.fire({
          position: 'center',
            icon: 'success',
            title: 'Berhasil menambah Application',
            showConfirmButton: true,
            timer: 1500
        })
      },
      (error: HttpErrorResponse) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Gagal menambah Applications',
          showConfirmButton: true,
          timer: 1500
        })
      });

      this.closeApplicationAdd();
  }

  private getApplications(){
    this.realTimeDataSubscription$ = timer(0, 1000)
      .pipe(switchMap(_ => this.applicationService.getAllApplications(this.loginuser.token)))
      .subscribe(data => {
        this.applications = data;
    });
  }

  public closeApplicationAdd(){
    this.router.navigate(['application']);
  }
}
