import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LoginAuthService } from 'src/app/login-auth.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  selectLang: string="id-ID";
  public currentstatus: any;
  public loginuser: any = {};
  public user: any = {};

  constructor(public translate: TranslateService, private authService: LoginAuthService, private router: Router, private userService: UserService, private toastr: ToastrService) {
    this.currentstatus = this.authService.getStatus().subscribe(currentstatus => {
      this.currentstatus = currentstatus;
    })

    this.authService.isLoggedIn();
    this.loginuser = JSON.parse(localStorage.getItem('currentUser') as string);

    translate.addLangs(['id-ID', 'en-US']);
    if (localStorage.getItem('locale')) {
        translate.setDefaultLang(localStorage.getItem('locale') || '');
        translate.use(localStorage.getItem('locale') || '');
    } else {
        translate.setDefaultLang('id-ID');
        translate.use('id-ID');
        localStorage.setItem('locale', 'id-ID');
    }
    
   }

  ngOnInit(){
    this.userService.getUser(this.loginuser.token).subscribe(user => {
      this.user = user;
      // console.log(user);
    }, err => {
      // console.log(err);
    })
  }

  getLocale() {
    return localStorage.getItem('locale');
}

  setLang(lang: string){
    this.selectLang = lang;
    this.translate.use(lang);
    localStorage.setItem('locale', lang);
  }

  logout(){
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
    this.toastr.success('You are success logout!', 'Logout');
  }

}
