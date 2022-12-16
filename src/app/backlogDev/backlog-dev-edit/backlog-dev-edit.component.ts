import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginAuthService } from 'src/app/login-auth.service';
import { ProjectPicService } from 'src/app/projectPIC/project-pic.service';
import { ProjectPIC } from 'src/app/projectPIC/projectPIC';
import { User } from 'src/app/user/user';
import { UserService } from 'src/app/user/user.service';
import Swal from 'sweetalert2';
import { BacklogDevelopmentService } from '../backlog-development.service';
import { BacklogDevelopment } from '../backlogDevelopment';

@Component({
  selector: 'app-backlog-dev-edit',
  templateUrl: './backlog-dev-edit.component.html',
  styleUrls: ['./backlog-dev-edit.component.css']
})
export class BacklogDevEditComponent implements OnInit {

  editBacklogDev: BacklogDevelopment = new BacklogDevelopment;
  editPICDevs!: ProjectPIC[];
  editBacklogDevForm!: FormGroup;
  users!: User[];
  public loginuser: any = {};
  public backlogdev: any = {};

  minDate!: Date;

  formArray: any;

  private dateRangeValidator: ValidatorFn = (): { [key: string]: any;} | null => {
    let invalid = false;
    const startDate = this.editBacklogDevForm && this.editBacklogDevForm.get("backlog_start")?.value;
    const endDate = this.editBacklogDevForm && this.editBacklogDevForm.get("backlog_end")?.value;
    if (startDate && endDate) {
      invalid = new Date(startDate).valueOf() >= new Date(endDate).valueOf();
    }
    return invalid ? { invalidRange: { startDate, endDate } } : null;
  };

  constructor(
    private backlogDevService: BacklogDevelopmentService,
    private projectPICService: ProjectPicService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authservice: LoginAuthService
    ) {
      this.authservice.isLoggedIn();
      this.loginuser = JSON.parse(localStorage.getItem('currentUser') as string);
      this.editBacklogDevForm = this.formBuilder.group({
        application: [{value: '', disabled:true}],
        backlog_type: [{value: '', disabled:true}],
        backlog_code: [{value: '', disabled:true}],
        backlog_bpro: [{value: '', disabled:true}],
        backlog_desc: [{value: '', disabled:true}],
        backlog_kickoff: [{value: '', disabled:true}],
        backlog_status: [{value: '', disabled:true}],
        backlog_start: ['', [Validators.required]],
        backlog_end: ['', [Validators.required]],
        // pic_PM: ['',Validators.required],
        pic_Devs: this.formBuilder.array([])
    }, {validators: this.dateRangeValidator});
  }

  ngOnInit(): void {
    this.editBacklogDev = this.backlogDevService.editBacklogDev;
    this.minDate = new Date(this.editBacklogDev.backlog_kickoff);
    this.editBacklogDevelopment();
    this.getUsers();
  }

  private getUsers(){
    this.userService.getAllUsers(this.loginuser.token).subscribe(data => {
        this.users = data;
    });
  }

  editBacklogDevelopment(){
    this.editBacklogDevForm.patchValue({
      application: this.editBacklogDev.application,
      backlog_type: this.editBacklogDev.backlog_type,
      backlog_code: this.editBacklogDev.backlog_code,
      backlog_bpro: this.editBacklogDev.backlog_bpro,
      backlog_desc: this.editBacklogDev.backlog_desc,
      backlog_kickoff: formatDate(this.editBacklogDev.backlog_kickoff,'dd MMMM YYYY', 'en'),
      backlog_status: this.editBacklogDev.backlog_status,
      backlog_start: '',
      backlog_end: ''
    });


    if(this.editBacklogDev.backlog_start !== null && this.editBacklogDev.backlog_end !== null){
      this.editBacklogDevForm.patchValue({
        backlog_start: formatDate(this.editBacklogDev.backlog_start,'yyyy-MM-dd', 'en'),
        backlog_end: formatDate(this.editBacklogDev.backlog_end,'yyyy-MM-dd', 'en')
      });
    }

    this.projectPICService.getProjectPICByProjectCode(this.editBacklogDev.backlog_code, this.loginuser.token).subscribe(data => {
      this.editPICDevs = data;

      if(this.editPICDevs.length == 0){
        this.addPICDev();
      }else{
        this.setPicDev(this.editPICDevs);
      }
    });
  }

  onUpdateBacklogDevelopment(){

    var updatePIC: string[] = [];
    var existedPIC: string[] = [];
    var countSuccess = 0;

    for (let pic of this.pic_Devs.controls) {
      updatePIC.push(pic.value.pic_Dev);
    }

    this.editPICDevs.forEach(function(item){
      existedPIC.push(item.pic_id);
    });

    let missing = existedPIC.filter(item => updatePIC.indexOf(item) == -1);

    for (let pic of this.pic_Devs.controls) {
      this.projectPICService.addProjectPIC(this.editBacklogDev.backlog_code, pic.value.pic_Dev, this.loginuser.token).subscribe(
        (response: ProjectPIC) => {
          countSuccess++;

          if(countSuccess == this.pic_Devs.length){

            for(let deletePIC of missing){
              this.projectPICService.deleteProjectPIC(this.editBacklogDev.backlog_code, deletePIC, this.loginuser.token).subscribe();
            }

            this.backlogDevService.updateBacklogDevelopment(this.editBacklogDev.id, this.editBacklogDevForm.value, this.loginuser.token).subscribe(
              (response: BacklogDevelopment) => {
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Berhasil mengupdate Backlog Development',
                  showConfirmButton: true,
                  timer: 1000
                });
              },
              (error: HttpErrorResponse) => {
                Swal.fire({
                  position: 'center',
                  icon: 'error',
                  title: 'Gagal mengupdate Backlog Development',
                  showConfirmButton: true,
                  timer: 1000
                });
              });
          }
        },
        (error: HttpErrorResponse) => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Gagal mengupdate Backlog Development',
            showConfirmButton: true,
            timer: 1500
          });
        });
    }

      this.closeBacklogDevEdit();
  }

  get pic_Devs(){
    return this.editBacklogDevForm.controls["pic_Devs"] as FormArray;
  }

  addPICDev(){
    this.pic_Devs.push(
      this.formBuilder.group({
        pic_Dev: new FormControl (null, [Validators.required]),
      })
    );
  }

  removePICDev(idx: number){
    this.pic_Devs.removeAt(idx);
  }

  private setPicDev(picDevs: ProjectPIC[]){

    this.userService.getAllUsers(this.loginuser.token).subscribe(data => {
      this.users = data;

      this.formArray = new FormArray([]);

      for (let i = 0; i < picDevs.length; i++) {
        for (let j = 0; j < this.users.length; j++) {
          if(picDevs[i].pic_id == this.users[j].user_id){
            // console.log(this.users[j]);
            this.formArray.push(this.formBuilder.group({
              pic_Dev: this.users[j],
            }));
          }
        }
      }

      for (let i = 0; i < picDevs.length; i++) {
        for (let j = 0; j < this.users.length; j++) {
          if(picDevs[i].pic_id == this.users[j].user_id){
            this.formArray.at(i).get("pic_Dev").patchValue(this.users[j].user_id);
          }
        }
      }

      return this.editBacklogDevForm.setControl("pic_Devs", this.formArray);

    });


  }


  public closeBacklogDevEdit(){
    this.router.navigate(['backlogDevelopment']);
  }

}
