import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Project } from '../project';
import { ProjectService } from '../project.service';
import Swal from 'sweetalert2';
import { Subscription, switchMap, timer } from 'rxjs';
import { formatDate } from '@angular/common';
import { ProjectTypeService } from 'src/app/projectType/project-type.service';
import { ProjectType } from 'src/app/projectType/projectType';
import { LoginAuthService } from 'src/app/login-auth.service';


@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  public projects!: Project[];
  public projectTypes!: ProjectType[];

  addProjectForm!: FormGroup;
  editProjectForm!: FormGroup;
  currentDate:any = new Date();
  public loginuser: any = {};
  public project: any = {};

  page: number = 1;
  count: number = 0;
  tableSize: number = 8;

  public viewProject: Project = new Project;
  public editProject: Project = new Project;
  public deleteProject: Project = new Project;

  realTimeDataSubscription$!: Subscription;

  constructor(
    private projectService: ProjectService,
    private projectTypeService: ProjectTypeService,
    private formBuilder: FormBuilder,
    private authservice: LoginAuthService) {
    this.authservice.isLoggedIn();
    this.loginuser = JSON.parse(localStorage.getItem('currentUser') as string);
    this.addProjectForm = this.formBuilder.group({
      application: ['', [Validators.required, Validators.maxLength(10)]],
      project_type: ['', [Validators.required]],
      project_bpro: ['', [Validators.required, Validators.maxLength(15)]],
      project_desc: ['', [Validators.required, Validators.maxLength(100)]],
      project_kickoff: ['', [Validators.required]]
    });

    this.editProjectForm = this.formBuilder.group({
      application: ['', [Validators.required, Validators.maxLength(10)]],
      project_type: ['', [Validators.required]],
      project_code: [{value: '', disabled: true}],
      project_bpro: ['', [Validators.required, Validators.maxLength(15)]],
      project_desc: ['', [Validators.required, Validators.maxLength(100)]],
      project_kickoff: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getProjects();
    this.getProjectTypes();
  }

  private getProjects(){
    this.realTimeDataSubscription$ = timer(0, 1000)
      .pipe(switchMap(_ => this.projectService.getProjects(this.loginuser.token)))
      .subscribe(data => {
        this.projects = data;
    });
  }

  private getProjectTypes(){
    this.projectTypeService.getProjectTypes(this.loginuser.token).subscribe(data => {
        this.projectTypes = data;
    });
  }

  onTableDataChange(event: any){
    this.page = event;
    this.getProjects();
  }

  get projectType(){
    return this.editProjectForm.get('project_type') as FormControl;
  }

  onAddProject(): void {

    if(this.addProjectForm.invalid){
      return;
    }

    this.projectService.addProject(this.addProjectForm.value, this.loginuser.token).subscribe(
      (response: Project) => {
        this.getProjects();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Berhasil menambah Project',
          showConfirmButton: true,
          timer: 1500
        })
      },
      (error: HttpErrorResponse) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Gagal menambah Project',
          showConfirmButton: true,
          timer: 1500
        })
      }
    );

    document.getElementById('add-project-form')!.click();
    this.addProjectForm.reset();
    for (let name in this.addProjectForm.controls) {
      this.addProjectForm.controls[name].setErrors(null);
    }
  }

  onCloseAddProjectModal(){
    this.addProjectForm.reset();
  }

  onUpdateProject(): void{

    if(this.editProjectForm.invalid){
      return;
    }

    this.projectService.updateProject(this.editProject.id, this.editProjectForm.value, this.loginuser.token).subscribe(
      (response: Project) => {
        this.getProjects();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Berhasil mengupdate Project',
          showConfirmButton: true,
          timer: 1500
        })
      },
      (error: HttpErrorResponse) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Gagal mengupdate Project',
          showConfirmButton: true,
          timer: 1500
        })
      });

    document.getElementById('edit-project-form')!.click();
    this.editProjectForm.reset();
    for (let name in this.editProjectForm.controls) {
      this.editProjectForm.controls[name].setErrors(null);
    }
  }

  public onDeleteProject(id: number): void{
    document.getElementById('delete-project')!.click();
    this.projectService.deleteProject(this.deleteProject.id, this.loginuser.token).subscribe(
      (response: void) => {
        this.getProjects();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Berhasil menghapus Project',
          showConfirmButton: true,
          timer: 1500
        })
      },
      (error: HttpErrorResponse) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Gagal menghapus Project',
          showConfirmButton: true,
          timer: 1500
        })
      });
  }

  public onOpenModal(project: Project, mode: string): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if(mode === 'add'){
      button.setAttribute('data-target', '#addProjectModal');
      this.addProjectForm.patchValue({
        project_type: null
      });
    }
    if(mode === 'edit'){
      this.editProject = project;
      this.editProjectForm.patchValue({
        application: this.editProject.application,
        project_type: this.editProject.project_type,
        project_code: this.editProject.project_code,
        project_bpro: this.editProject.project_bpro,
        project_status: this.editProject.project_status,
        project_desc: this.editProject.project_desc,
        project_kickoff: formatDate(this.editProject.project_kickoff,'yyyy-MM-dd', 'en'),
      });
      button.setAttribute('data-target', '#updateProjectModal');
    }
    if(mode === 'view'){
      this.viewProject = project;
      button.setAttribute('data-target', '#viewProjectModal');
    }
    if(mode === 'delete'){
      this.deleteProject = project;
      button.setAttribute('data-target', '#deleteProjectModal');
    }

    container!.appendChild(button);
    button.click();
  }
}
