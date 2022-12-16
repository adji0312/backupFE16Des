import { Injectable } from '@angular/core';
import { Role } from './role';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient ) { }

  private baseUrl = `${environment.baseUrl}/role`;

  public getRoles(token: any): Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.get<Role[]>(`${this.baseUrl}/all`, {headers: headers});
  }

  public findRoleById(id: number): Observable<Role>{
    return this.http.get<Role>(`${this.baseUrl}/get/${id}`);
  }

  public findRoleByRoleId(role_id: string, token: any): Observable<Role>{
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.get<Role>(`${this.baseUrl}/getRole/${role_id}`, {headers:headers});
  }

  public addRole(role: Role, token: any): Observable<Role> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.post<Role>(`${this.baseUrl}/add`, role, {headers: headers});
  }

  public updateRole(id:number, role: Role, token: any): Observable<Role>{
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.put<Role>(`${this.baseUrl}/update/${id}`, role, {headers: headers});
  }

  public deleteRole(id: number, token: any): Observable<void>{
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`, {headers: headers});
  }

}
