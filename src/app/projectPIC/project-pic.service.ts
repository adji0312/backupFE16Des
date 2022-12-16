import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProjectPIC } from './projectPIC';

@Injectable({
  providedIn: 'root'
})
export class ProjectPicService {

  constructor(private http: HttpClient) { }

  private baseUrl = `${environment.baseUrl}/pic`;

  public addProjectPIC(project_code: string, user_id: string, token: any): Observable<ProjectPIC>{
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.post<ProjectPIC>(`${this.baseUrl}/add/${project_code}/${user_id}`, null, {headers: headers});
  }

  public getProjectPICByProjectCode(project_code: string, token: any): Observable<ProjectPIC[]>{
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.get<ProjectPIC[]>(`${this.baseUrl}/getPICDev/${project_code}`, {headers: headers});
  }

  public deleteProjectPIC(project_code: string, user_id: string, token: any): Observable<void>{
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.delete<void>(`${this.baseUrl}/delete/${project_code}/${user_id}`, {headers: headers})
  }
  
  // public deleteProjectPICByProjectCode(project_code: string): Observable<void>{
  //   return this.http.delete<void>(`${this.baseUrl}/delete/${project_code}`);
  // }
}
