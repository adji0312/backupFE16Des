import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Project } from './project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  private baseUrl = `${environment.baseUrl}/project`;

  public getProjects(token: any): Observable<any>{
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.get<Project[]>(`${this.baseUrl}/all`, {headers: headers});
  }

  public addProject(project: Project, token: any): Observable<Project>{
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.post<Project>(`${this.baseUrl}/add`, project, {headers: headers});
  }

  public updateProject(id: number, project: Project, token: any): Observable<Project>{
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.put<Project>(`${this.baseUrl}/update/${id}`, project, {headers: headers});
  }

  public deleteProject(id: number, token: any): Observable<void>{
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`, {headers: headers});
  }
}
