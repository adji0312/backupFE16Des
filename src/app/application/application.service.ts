import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Application } from './application';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  addApp: Application = new Application;
  viewApp: Application = new Application;
  editApp: Application = new Application;

  constructor(private http: HttpClient) {
    this.http = http;  
  }
  
  private baseUrl = `${environment.baseUrl}/application`;

  addApplication(application: Application, token: any): Observable<Application>{
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.post<Application>(`${this.baseUrl}/add`, application, {headers: headers});
  }

  getAllApplications(token: any): Observable<any>{
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.get(`${this.baseUrl}/all`, {headers: headers});
  }

  public deleteApplication(id: number, token: any): Observable<void>{
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`, {headers: headers});
  }

  public updateApplication(id: number, app: any, token: any):Observable<Application>{
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.put<Application>(`${this.baseUrl}/update/${id}`, app, {headers: headers});
  }
}
