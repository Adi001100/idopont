import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private logoutTimer: any;
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  readonly isLoggedIn$ = this.loggedInSubject.asObservable();

  constructor(private router: Router, private http: HttpClient) {
    this.check().subscribe();
  }

  isLoggedIn(): boolean {
    return this.loggedInSubject.value;
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
          this.loggedInSubject.next(true);
        })
      );
  }

  check(): Observable<boolean> {
    return this.http
      .get<void>('http://localhost:8080/api/auth/check', { withCredentials: true }) // vagy /api/user/me
      .pipe(
        map(() => true),
        tap(ok => this.loggedInSubject.next(ok)),
        catchError(() => {
          this.loggedInSubject.next(false);
          return of(false);
        })
      );
  }

  logout(): Observable<void> {
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
    }

    return this.http
      .post<void>('http://localhost:8080/api/auth/logout', {}, { withCredentials: true })
      .pipe(
        tap(() => {
          this.loggedInSubject.next(false);
          this.router.navigate(['/login'], { state: { successMessage: 'Sikeres kijelentkezés' } });
        })
      );
  }
}
