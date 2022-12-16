import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { Subscription, switchMap, timer } from 'rxjs';
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
import Swal from 'sweetalert2';
import { Application } from '../application';
import { ApplicationService } from '../application.service';

@Component({
  selector: 'app-application-add',
  templateUrl: './application-add.component.html',
  styleUrls: ['./application-add.component.css']
})
export class ApplicationAddComponent implements OnInit {

  public loginuser: any = {};
  // addApplication!: Application;
  addApplication=new Application();
  addApplicationForm!: FormGroup;
  formArray: any;
  applications: Application[] = [];

  progLangs!: ApplicationProgrammingLanguage[];
  oprSys!: ApplicationOperatingSystem[];
  databases!: ApplicationDatabase[];
  serversApp!: ApplicationServer[];
  servers!: Server[];
  types!: ApplicationType[];

  realTimeDataSubscription$!: Subscription;

  selectedDevice:any = [];
  selectedType:any = [];
  selectedProgLang:any = [];
  selectedServer:any = [];
  selectedDatabase:any = [];
  selectedAppServer:any = [];
  selectedOprSys:any = [];

  constructor(
    private applicationService: ApplicationService,
    private formBuilder: FormBuilder,
    private authService: LoginAuthService,
    private router: Router,
    private progLangService: AppProgLangService,
    private oprSysService: AppOprSysService,
    private databaseService: AppDatabaseService,
    private serversAppService: AppServerService,
    private serverService: ServerService,
    private typeService: AppTypeService
  ) {
    this.authService.isLoggedIn();
    this.loginuser = JSON.parse(localStorage.getItem('currentUser') as string);
    this.addApplicationForm = this.formBuilder.group({
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
    // this.addApplication = new Application();
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
    this.addApplicationForm.patchValue({
      application_device: this.addApplication.application_device = this.selectedDevice.toString(),
      application_type: this.addApplication.application_type = this.selectedType.toString(), 
      application_programming_language: this.addApplication.application_programming_language = this.selectedProgLang.toString(),
      server: this.addApplication.server = this.selectedServer.toString(),
      application_database: this.addApplication.application_database = this.selectedDatabase.toString(),
      application_server: this.addApplication.application_server = this.selectedAppServer.toString(),
      application_operating_system: this.addApplication.application_operating_system = this.selectedOprSys.toString()
    });
  }

  onAddApplication(){
    
    
    if(this.addApplicationForm.invalid){
      return;
    }
    
    this.addList();
    
    this.applicationService.addApplication(this.addApplicationForm.value, this.loginuser.token).subscribe(
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

  // get prog_langs(){
  //   return this.addApplicationForm.controls["prog_lang"] as FormArray;
  // }

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

  public closeApplicationAdd(){
    this.router.navigate(['application']);
  }

  // addProgLang(){
  //   this.prog_langs.push(
  //     this.formBuilder.group({
  //       progLang: new FormControl (null, [Validators.required]),
  //     })
  //   );
  // }

  // removeProgLang(idx: number){
  //   this.prog_langs.removeAt(idx);
  // }
}
