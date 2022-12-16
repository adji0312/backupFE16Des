import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProjectType } from './projectType';

@Injectable({
  providedIn: 'root'
})
export class ProjectTypeService {

  constructor(private http: HttpClient) {}

  private baseUrl = `${environment.baseUrl}/projectType`;

  public getProjectTypes(token: any): Observable<any>{
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.get<ProjectType[]>(`${this.baseUrl}/all`, {headers: headers});
  }

  public addProjectType(projectType: ProjectType, token: any): Observable<ProjectType>{
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.post<ProjectType>(`${this.baseUrl}/add`, projectType, {headers:headers});
  }

  public updateProjectType(id:number, projectType: ProjectType, token: any): Observable<ProjectType>{
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.put<ProjectType>(`${this.baseUrl}/update/${id}`, projectType, {headers: headers});
  }

  public deleteProjectType(id: number, token: any): Observable<void>{
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`, {headers: headers});
  }
}
