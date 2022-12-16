import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApplicationDatabase } from './app-database';

@Injectable({
  providedIn: 'root'
})
export class AppDatabaseService {

  constructor(private http: HttpClient) {
    this.http = http;
  }

  private baseUrl = `${environment.baseUrl}/appDatabase`;

  getAllDatabase(token: any): Observable<any>{
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.get<ApplicationDatabase[]>(`${this.baseUrl}/all`, {headers: headers}); 
  }
}
