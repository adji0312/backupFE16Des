import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { data } from 'jquery';
import { Subscription, switchMap, timer } from 'rxjs';
import { LoginAuthService } from 'src/app/login-auth.service';
import { Role } from 'src/app/role/role';
import { RoleService } from 'src/app/role/role.service';
import Swal from 'sweetalert2';
// import { SearchParamsUser } from '../search-params-user';
import { SearchModel, User } from '../user';
import { UserService } from '../user.service';



@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

// export interface SearchItem {
//   name: string;
// }

export class UserListComponent implements OnInit {

  searchRole!: string;
  searchUserName!: string;
  searchUserId!: string;

  users!: User[];
  roles!: Role[];
  roleDropdown = null;
  selectedRole!: any;

  page: number = 1;
  count: number = 0;
  tableSize: number = 8;

  addUserForm!: FormGroup;
  editUserForm!: FormGroup;

  roleID!: number;

  viewUser: User = new User;
  editUser: User = new User;
  deleteUser: User = new User;

  
  public loginuser: any = {};
  public user: any = {};
  realTimeDataSubscription$!: Subscription;
  

  listUser: Array<User> = [];
  model:SearchModel = new SearchModel();

  

  private loadData(){
    this.getUsers();
    this.getRoles();
  }

  constructor(private userService: UserService, private roleService: RoleService, private formBuilder: FormBuilder, private authService: LoginAuthService) {

    this.authService.isLoggedIn();
    this.loginuser = JSON.parse(localStorage.getItem('currentUser') as string);
    this.addUserForm = this.formBuilder.group({
      user_id: ['', [Validators.required, Validators.maxLength(10)]],
      user_name: ['', [Validators.required, Validators.maxLength(25)]],
      role: ['', [Validators.required]],
    });

    this.editUserForm = this.formBuilder.group({
      user_id: ['', [Validators.required, Validators.maxLength(10)]],
      user_name: ['', [Validators.required, Validators.maxLength(25)]],
      role: ['', Validators.required],
    });

  }

  ngOnInit() {
    this.loadData();
    this.userService.getUser(this.loginuser.token).subscribe(user => {
      this.user = user;
      console.log(user);
    }, err => {
      // console.log(err);
    })

    this.userService.getUsers(this.loginuser.token).subscribe((data: any) => {
      this.listUser = data;
      console.log(data);
    });
  }

  
  clear(){
    this.model.user_id = '',
    this.model.user_name = '',
    this.model.role = ''
  }

  // onSearch() {
  //   this.currentPage = 1;
  //   this.search();
  // }

  // search() {
  //   // sort param
  //   if (this.sortedColumn) {
  //     const sortParam = new SortParam();
  //     sortParam.key = this.sortedColumn;
  //     sortParam.dir = this.sortedDirection === 'desc' ? 'desc' : 'asc';

  //     this.sortParams = [];
  //     this.sortParams.push(sortParam);
  //   }

  //   // search param
  //   this.searchParams = this.userParam.params(
  //     this.userId,
  //     this.userName,
  //     this.roleId
  //   );
  //   // this.list();
  // }

  // list() {
  //   this.userService
  //     .list(
  //       this.currentPage - 1,
  //       this.pageSize,
  //       this.searchParams,
  //       this.sortParams
  //     )
  //     .subscribe(searchResult => {
  //       if (searchResult._embedded) {
  //         this._result.next(searchResult._embedded.appUsers);
  //         this._page.next(searchResult.page);
  //       } else {
  //         this._result.next([]);
  //         this._page.next({});
  //       }
  //     });
  // }

  get role(){
    return this.editUserForm.get('role') as FormControl;
  }

  private getUsers(){
    this.realTimeDataSubscription$ = timer(0, 1000)
      .pipe(switchMap(_ => this.userService.getAllUsers(this.loginuser.token)))
      .subscribe(data => {
        this.users = data;
    });
  }

  private getRoles(){

    this.roleService.getRoles(this.loginuser.token).subscribe(data => {
      this.roles = data;
    });
  }


  onTableDataChange(event: any){
    this.page = event;
    this.getUsers();
  }

  onAddUser(): void {

    if(this.addUserForm.invalid){
      return;
    }

    this.userService.addUser(this.addUserForm.value, this.loginuser.token).subscribe(
      (response: User) => {
        this.getUsers();
        // console.log(response);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Berhasil menambah User',
          showConfirmButton: true,
          timer: 1500
        })
      },
      (error: HttpErrorResponse) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Gagal menambah User',
          showConfirmButton: true,
          timer: 1500
        })
      }
    );

    document.getElementById('add-user-form')!.click();
    this.addUserForm.reset();
    for (let name in this.addUserForm.controls) {
      this.addUserForm.controls[name].setErrors(null);
    }
  }

  onCloseAddUserModal(){
    this.addUserForm.reset();
  }

  onUpdateUser(): void{

    if(this.editUserForm.invalid){
      return;
    }

    const role_id = this.editUserForm.controls["role"].value;

    this.roleService.findRoleByRoleId(role_id, this.loginuser.token).subscribe(data => {
      this.selectedRole = data;

      this.editUserForm.patchValue({
        role: data
      });

      this.userService.updateUser(this.editUser.id, this.editUserForm.value, this.loginuser.token).subscribe(
        (response: User) => {
          this.getUsers();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Berhasil mengupdate User',
            showConfirmButton: true,
            timer: 1500
          })
        },
        (error: HttpErrorResponse) => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Gagal mengupdate User',
            showConfirmButton: true,
            timer: 1500
          })
        });
        
        document.getElementById('edit-user-form')!.click();
        this.editUserForm.reset();
        for (let name in this.editUserForm.controls) {
          this.editUserForm.controls[name].setErrors(null);
        }
      });

  }


  onDeleteUser(id: number): void{
    document.getElementById('delete-user')!.click();
    this.userService.deleteUser(this.deleteUser.id, this.loginuser.token).subscribe(
      (response: void) => {
      this.getUsers();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Berhasil menghapus User',
        showConfirmButton: true,
        timer: 1500
      })
    },
    (error: HttpErrorResponse) => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Gagal menghapus User',
        showConfirmButton: true,
        timer: 1500
      })
    });
  }

  public onOpenModal(user: User, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addUserModal');
      this.addUserForm.patchValue({
        role: null
      });
    }
    if (mode === 'edit') {
      this.editUser = user;
      this.editUserForm.setValue({
        user_id: this.editUser.user_id,
        user_name: this.editUser.user_name,
        role: this.editUser.role.role_id
      });
      button.setAttribute('data-target', '#updateUserModal');
    }
    if (mode === 'view') {
      this.viewUser = user;
      button.setAttribute('data-target', '#viewUserModal');
    }
    if(mode == 'delete'){
      this.deleteUser = user;
      button.setAttribute('data-target', '#deleteUserModal');
    }
    container!.appendChild(button);
    button.click();
  }

}
