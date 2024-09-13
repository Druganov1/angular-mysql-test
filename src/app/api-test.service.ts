import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiTestService {

  private BaseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any> {
    const url = `${this.BaseUrl}/readall`;  // we pakken dus de baseurl van de api en voegen daar de endpoint aan toe
    return this.http.get<any>(url);
  }

  // met arguments zodat we read one kunnen doen
  getUserById(id: number): Observable<any> {
    const url = `${this.BaseUrl}/readone/${id}`;
    return this.http.get<any>(url);
  }

}
