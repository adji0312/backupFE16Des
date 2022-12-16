import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription, switchMap, timer } from 'rxjs';
import { ProjectPIC } from 'src/app/projectPIC/projectPIC';
import { User } from 'src/app/user/user';
import { BacklogDevelopmentService } from '../backlog-development.service';
import { BacklogDevelopment } from '../backlogDevelopment';
import { Router } from '@angular/router';
import { LoginAuthService } from 'src/app/login-auth.service';

@Component({
  selector: 'app-backlog-development',
  templateUrl: './backlog-development.component.html',
  styleUrls: ['./backlog-development.component.css'],
})

export class BacklogDevelopmentComponent implements OnInit {

  backlogDevs!: BacklogDevelopment[];
  users!: User[];

  viewPICDevs!: ProjectPIC[];
  public loginuser: any = {};
  formArray: any;

  editBacklogDev: BacklogDevelopment = new BacklogDevelopment;
  viewBacklogDev: BacklogDevelopment = new BacklogDevelopment;

  editBacklogDevForm!: FormGroup;

  page: number = 1;
  count: number = 0;
  tableSize: number = 8;

  realTimeDataSubscription$!: Subscription;

  constructor(
    private backlogDevService: BacklogDevelopmentService,
    private router: Router,
    private authService: LoginAuthService
  ) {
    this.authService.isLoggedIn();
    this.loginuser = JSON.parse(localStorage.getItem('currentUser') as string);
  }

  ngOnInit(): void {
    this.getBacklogDevelopment();
  }

  private getBacklogDevelopment(){
    this.realTimeDataSubscription$ = timer(0, 1000)
    .pipe(switchMap(_ => this.backlogDevService.getAllBacklogDevelopment(this.loginuser.token)))
    .subscribe(data => {
      this.backlogDevs = data;
    });

    // this.backlogDevService.getAllBacklogDevelopment()
    // .subscribe(data => {
    //   this.backlogDevs = data;
    // });
  }


  onTableDataChange(event: any){
    this.page = event;
    this.getBacklogDevelopment();
  }


  public onOpenModal(backlogDev: BacklogDevelopment, mode: string): void{
    const button = document.createElement('button');
    button.type = 'button';

    if(mode === 'edit'){
      this.backlogDevService.editBacklogDev = backlogDev;
      this.router.navigate(['/backlogDevEdit'], {skipLocationChange: true});
    }
    if(mode === 'view'){
      this.backlogDevService.viewBacklogDev = backlogDev;
      this.router.navigate(['/backlogDevDetail'], {skipLocationChange: true});
    }

    button.click();
  }
}
