import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseUrl = 'http://localhost:8001/my-rest';

  constructor(private http: HttpClient) { }

  getData() {
    let s = `${this.baseUrl}/app/data`;
    return this.http.get(s);
  }

  getSecureData() {
    let s = `${this.baseUrl}/app/secure/data`;
    return this.http.get(s);
  }

  getDelayData() {
    let s = `${this.baseUrl}/app/delay/data`;
    return this.http.get(s);
  }

  getUser() {
    let s = `${this.baseUrl}/app/user`;
    return this.http.get(s);
  }
}
