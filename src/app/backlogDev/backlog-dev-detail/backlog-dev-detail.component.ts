import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoginAuthService } from 'src/app/login-auth.service';
import { ProjectPicService } from 'src/app/projectPIC/project-pic.service';
import { ProjectPIC } from 'src/app/projectPIC/projectPIC';
import { UserService } from 'src/app/user/user.service';
import { BacklogDevelopmentService } from '../backlog-development.service';
import { BacklogDevelopment } from '../backlogDevelopment';

@Component({
  selector: 'app-backlog-detail',
  templateUrl: './backlog-dev-detail.component.html',
  styleUrls: ['./backlog-dev-detail.component.css']
})
export class BacklogDevDetailComponent implements OnInit {

  viewBacklogDev: BacklogDevelopment = new BacklogDevelopment;
  viewPICDevs!: ProjectPIC[];
  public loginuser: any = {};

  // editBacklogDevForm!: FormGroup;

  constructor(
    private backlogDevService: BacklogDevelopmentService,
    private projectPICService: ProjectPicService,
    private router: Router,
    private authservice: LoginAuthService
    ) {
      this.authservice.isLoggedIn();
    this.loginuser = JSON.parse(localStorage.getItem('currentUser') as string);
    }

  ngOnInit(): void {
    this.viewBacklogDev = this.backlogDevService.viewBacklogDev;

    this.projectPICService.getProjectPICByProjectCode(this.viewBacklogDev.backlog_code, this.loginuser.token).subscribe(data => {
      this.viewPICDevs = data;
    });

  }

  closeBacklogDevDetail(){
    this.router.navigate(['/backlogDevelopment']);
  }

}
