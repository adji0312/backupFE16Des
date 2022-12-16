import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, switchMap, timeInterval, timer } from 'rxjs';
import Swal from 'sweetalert2';
import { LoginAuthService } from '../login-auth.service';
import { UserService } from '../user/user.service';
import { Application } from './application';
import { ApplicationService } from './application.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {

  applications!: Application[];
  public loginuser: any = {};
  public user: any = {};
  addApplicationForm!: FormGroup;
  public deleteApplication: Application = new Application;
  title = 'angular-app';
  fileName = 'applicationList.xlsx';

  page: number = 1;
  count: number = 0;
  tableSize: number = 8;

  viewApplication: Application = new Application;

  realTimeDataSubscription$!: Subscription;

  private loadData(){
    this.getApplications();
  }

  constructor(
    private applicationService: ApplicationService,
    private userService: UserService,
    private formBuilder: FormBuilder, 
    private authService: LoginAuthService,
    private router: Router
    ) {
      this.authService.isLoggedIn();
      this.loginuser = JSON.parse(localStorage.getItem('currentUser') as string);
    }

  ngOnInit(): void {
    this.loadData();
    this.userService.getUser(this.loginuser.token).subscribe(user => {
      this.user = user;
      console.log(user);
    }, err => {
      // console.log(err);
    })
  }

  private getApplications(){
    this.realTimeDataSubscription$ = timer(0, 1000)
      .pipe(switchMap(_ => this.applicationService.getAllApplications(this.loginuser.token)))
      .subscribe(data => {
        this.applications = data;
    });
  }

  onTableDataChange(event: any){
    this.page = event;
    this.getApplications();
  }

  // onAddApplication(): void {

  //   if(this.addApplicationForm.invalid){
  //     return;
  //   }

  //   this.applicationService.addApplication(this.addApplicationForm.value, this.loginuser.token).subscribe(
  //     (response: Application) => {
  //       this.getApplications();
  //       // console.log(user);
  //       Swal.fire({
  //         position: 'center',
  //         icon: 'success',
  //         title: 'Berhasil menambah Application',
  //         showConfirmButton: true,
  //         timer: 1500
  //       })
  //     },
  //     (error: HttpErrorResponse) => {
  //       Swal.fire({
  //         position: 'center',
  //         icon: 'error',
  //         title: 'Gagal menambah Application',
  //         showConfirmButton: true,
  //         timer: 1500
  //       })
  //     }
  //   );

  //   document.getElementById('add-user-form')!.click();
  //   this.addApplicationForm.reset();
  //   for (let name in this.addApplicationForm.controls) {
  //     this.addApplicationForm.controls[name].setErrors(null);
  //   }
  // }

  onCloseAddUserModal(){
    this.addApplicationForm.reset();
  }

  onDeleteApplication(id: number): void{
    document.getElementById('delete-app')!.click();
    this.applicationService.deleteApplication(this.deleteApplication.id, this.loginuser.token).subscribe(
      (response: void) => {
        console.log(response);
        this.getApplications();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Berhasil menghapus Application',
          showConfirmButton: true,
          timer: 1500
        })
    },
    (error: HttpErrorResponse) => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Gagal menghapus Application',
        showConfirmButton: true,
        timer: 1500
      })
    });
  }

  public onOpenModal(application: Application, mode: string): void {
    // const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    // button.style.display = 'none';
    // button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      this.applicationService.addApp = application;
      this.router.navigate(['/applicationAdd'], {skipLocationChange: true});
      // button.setAttribute('data-target', '#addApplicationModal');
      // this.addApplicationForm.patchValue({
      //   role: null
      // });
    }
    if (mode === 'edit') {
      this.applicationService.editApp = application;
      this.router.navigate(['/applicationEdit'], {skipLocationChange: true});
    }
    if (mode === 'view') {
      this.applicationService.viewApp = application;
      this.router.navigate(['/applicationView'], {skipLocationChange: true});
    }
    if(mode == 'delete'){
      this.deleteApplication = application;
      button.setAttribute('data-target', '#deleteApplicationModal');
    }
    // container!.appendChild(button);
    button.click();
  }


  exportexcel(): void{
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, this.fileName);
  }
}
