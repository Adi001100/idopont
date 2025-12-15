import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private logoutTimer: any;

  constructor(private router: Router, private http: HttpClient) {}

  isLoggedIn(): boolean {
    // Without access to HttpOnly cookies from JS we rely on backend validation
    return true;
  }

  login(credentials: { email: string; password: string }): Observable<void> {
    return this.http
      .post<void>('http://localhost:8080/api/auth/login', credentials, {
        withCredentials: true
      })
      .pipe(
        tap(() => {
          if (this.logoutTimer) {
            clearTimeout(this.logoutTimer);
          }
        })
      );
  }

  logout() {
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
    }
    this.router.navigate(['/login']);
  }
}
