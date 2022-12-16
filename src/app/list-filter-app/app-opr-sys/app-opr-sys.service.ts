import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApplicationOperatingSystem } from './app-opr-sys';

@Injectable({
  providedIn: 'root'
})
export class AppOprSysService {

  constructor(private http: HttpClient) {
    this.http = http;
  }

  private baseUrl = `${environment.baseUrl}/appOprSys`;

  getAllOprSys(token: any): Observable<any>{
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.get<ApplicationOperatingSystem[]>(`${this.baseUrl}/all`, {headers: headers}); 
  }
}
