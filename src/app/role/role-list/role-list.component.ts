import { Component, OnInit } from '@angular/core';
import { Role } from '../role';
import { RoleService } from '../role.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Subscription, switchMap, timer } from 'rxjs';
import { LoginAuthService } from 'src/app/login-auth.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {

  public roles!: Role[];
  public editRole: Role = new Role;
  public deleteRole: Role = new Role;
  public viewRole: Role = new Role;
  public loginuser: any = {};
  public role: any = {};

  page: number = 1;
  count: number = 0;
  tableSize: number = 8;

  addRoleForm!: FormGroup;
  editRoleForm!: FormGroup;

  realTimeDataSubscription$!: Subscription;

  constructor(private roleService: RoleService, private formBuilder: FormBuilder, private authservice: LoginAuthService) {
    this.authservice.isLoggedIn();
    this.loginuser = JSON.parse(localStorage.getItem('currentUser') as string);
    this.addRoleForm = this.formBuilder.group({
      role_id: ['', [Validators.required,Validators.maxLength(10)]],
      role_name: ['', [Validators.required,Validators.maxLength(15)]],
      role_desc: ['', [Validators.required, Validators.maxLength(25)]]
    });

    this.editRoleForm = this.formBuilder.group({
      role_id: ['', [Validators.required,Validators.maxLength(10)]],
      role_name: ['', [Validators.required,Validators.maxLength(15)]],
      role_desc: ['', [Validators.required, Validators.maxLength(25)]]
    });
  }

  ngOnInit(): void {
    this.getRoles();
  }

  onTableDataChange(event: any){
    this.page = event;
    this.getRoles();
  }

  private getRoles(){
    this.realTimeDataSubscription$ = timer(0, 1000)
      .pipe(switchMap(_ => this.roleService.getRoles(this.loginuser.token)))
      .subscribe(data => {
        this.roles = data;
    });
  }

  onAddRole(): void{

      if(this.addRoleForm.invalid){
        return;
      }

      this.roleService.addRole(this.addRoleForm.value, this.loginuser.token).subscribe(
        (response: Role) => {
          this.getRoles();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Berhasil menambah Role',
            showConfirmButton: true,
            timer: 1500
          })
        },
        (error: HttpErrorResponse) => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Gagal menambah Role',
            showConfirmButton: true,
            timer: 1500
          })
        });


        document.getElementById('add-role-form')!.click();
        this.addRoleForm.reset();
        for (let name in this.addRoleForm.controls) {
          this.addRoleForm.controls[name].setErrors(null);
        }

  }

  closeAddRoleModal(){
    this.addRoleForm.reset();
  }

  onUpdateRole(): void{

    if(this.editRoleForm.invalid){
      return;
    }

    this.roleService.updateRole(this.editRole.id, this.editRoleForm.value, this.loginuser.token).subscribe(
      (response: Role) => {
        this.getRoles();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Berhasil mengupdate Role',
          showConfirmButton: true,
          timer: 1500
        })

      },
      (error: HttpErrorResponse) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Gagal mengupdate Role',
          showConfirmButton: true,
          timer: 1500
        })
      });

      document.getElementById('edit-role-form')!.click();
      this.editRoleForm.reset();
      for (let name in this.editRoleForm.controls) {
        this.editRoleForm.controls[name].setErrors(null);
      }
  }

  onDeleteRole(id: number): void{
    document.getElementById('delete-role')!.click();
    this.roleService.deleteRole(this.deleteRole.id, this.loginuser.token).subscribe(
      (response: void) => {
        console.log(response);
        this.getRoles();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Berhasil menghapus Role',
          showConfirmButton: true,
          timer: 1500
        })
    },
    (error: HttpErrorResponse) => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Gagal menghapus Role',
        showConfirmButton: true,
        timer: 1500
      })
    });
  }

  onOpenModal(role: Role, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addRoleModal');
    }
    if (mode === 'edit') {
      this.editRole = role;
      this.editRoleForm.patchValue({
        role_id: this.editRole.role_id,
        role_name: this.editRole.role_name,
        role_desc: this.editRole.role_desc
      });
      button.setAttribute('data-target', '#updateRoleModal');
    }
    if(mode == 'delete'){
      this.deleteRole = role;
      button.setAttribute('data-target', '#deleteRoleModal');
    }
    if(mode == 'view'){
      this.viewRole = role;
      button.setAttribute('data-target', '#viewRoleModal');
    }
    container!.appendChild(button);
    button.click();
  }
}
