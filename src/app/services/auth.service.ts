import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8000/my-rest';
  private tokenUrl = `${this.baseUrl}/o/token/`;
  private revokeTokenUrl = `${this.baseUrl}/o/revoke_token/`;
  private token: string;

  private clientId = 'cLpklxtQpoYE6yb43PO6167OtlWDzTA81jcKzDJJ';

  constructor(private http: HttpClient) { }

  getToken(): string {
    return localStorage.getItem('token');
  }

  getExpiry(): number {
    let x = localStorage.getItem('expires');
    if (x == null) {
      return 0;
    }

    return Number(x);
  }

  getRefreshToken(): string {
    return localStorage.getItem('refresh_token');
  }

  refreshToken(): Observable<string> {
    if (!this.getRefreshToken()) {
      this.clear();
      return of(null);
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    const body = new HttpParams()
      .set('refresh_token', this.getRefreshToken())
      .set('client_id', this.clientId)
      .set('grant_type', 'refresh_token');
    return this.http.post(this.tokenUrl, body.toString(), httpOptions).pipe(
      map(res => this.extractToken(res)),
      catchError(e => this.handleError(e))
    );
  }

  authenticate(username: string, password: string): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    const body = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('client_id', this.clientId)
      .set('grant_type', 'password');
    return this.http.post(this.tokenUrl, body.toString(), httpOptions).pipe(
      map(res => this.extractToken(res)),
      catchError(e => this.handleError(e))
    );
  }

  logoff() {
    let token = this.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    const body = new HttpParams()
      .set('token', token)
      .set('client_id', this.clientId)
    return this.http.post(this.revokeTokenUrl, body.toString(), httpOptions).subscribe((res) => {
      console.log(res);
    });
  }

  handleError(e): string {
    if (e.status && (e.status === 401 || e.status === 403)) {
      return null;
    }

    throw ('invalid_grant');
  }

  hasValidToken(): boolean {
    return !!this.getToken();
  }

  isTokenExpired(): boolean {
    let expired = false;
    if (this.getExpiry() === null) {
      return expired;
    }

    expired = this.getExpiry() < new Date().getTime();
    return expired;
  }

  clear() {
    this.logoff();
    localStorage.clear();
  }

  extractToken(res: any): string {
    localStorage.setItem('token', res.access_token);
    localStorage.setItem('refresh_token', res.refresh_token);
    let exp = res.expires_in;
    let dt = new Date();
    dt.setTime(dt.getTime() + exp * 1000);
    localStorage.setItem('expires', dt.getTime().toString());
    return this.token = res.access_token;
  }
}
