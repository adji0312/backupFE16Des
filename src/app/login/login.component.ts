import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginAuthService } from '../login-auth.service';
import { User } from '../user/user';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: any = {};
  loginForm!: FormGroup;

  constructor(private userService: UserService, private router: Router, private authService: LoginAuthService, private formBuilder : FormBuilder, private toastr: ToastrService) {
    this.authService.isLoggedIn();
   }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      user_id: ['', [Validators.required]],
      password: ['', Validators.required],
    })
  }

  loginUser(user: any){
    this.userService.loginUser(user).subscribe((response) => {
      if(response){
        if(response.token){
          console.log(response);
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.router.navigate(['/dashboard']);
          this.toastr.success('You are success login', 'Login - Success');
        }
      }
    }, (error) => {
      console.log(error);
      this.toastr.error('Invalid Username or Password!', 'Login - Failed');
    })
  }

}
