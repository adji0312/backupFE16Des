import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ApplicationProgrammingLanguage } from './app-prog-lang';

@Injectable({
  providedIn: 'root'
})
export class AppProgLangService {

  constructor(private http: HttpClient) {
    this.http = http;
  }

  private baseUrl = `${environment.baseUrl}/appProgLang`;

  getAllProgLang(token: any): Observable<any>{
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.get<ApplicationProgrammingLanguage[]>(`${this.baseUrl}/all`, {headers: headers});
  }
}
