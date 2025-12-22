import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthenticatedUser, UserRole } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private logoutTimer: any;
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  readonly isLoggedIn$ = this.loggedInSubject.asObservable();
  private currentUserSubject = new BehaviorSubject<AuthenticatedUser | null>(null);
  readonly currentUser$ = this.currentUserSubject.asObservable();

  constructor(private router: Router, private http: HttpClient) {
    this.loadCurrentUser().subscribe();
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
        switchMap(() => this.loadCurrentUser()),
        map(() => void 0)
      );
  }

  loadCurrentUser(): Observable<AuthenticatedUser | null> {
    return this.http
      .get<AuthenticatedUser>('http://localhost:8080/api/user/me', { withCredentials: true })
      .pipe(
        tap(user => {
          this.loggedInSubject.next(true);
          this.currentUserSubject.next(user);
        }),
        catchError(() => {
          this.loggedInSubject.next(false);
          this.currentUserSubject.next(null);
          return of(null);
        })
      );
  }

  ensureCurrentUser(): Observable<AuthenticatedUser | null> {
    if (this.currentUserSubject.value) {
      return of(this.currentUserSubject.value);
    }
    return this.loadCurrentUser();
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
          this.currentUserSubject.next(null);
          this.router.navigate(['/login'], { state: { successMessage: 'Sikeres kijelentkezés' } });
        })
      );
  }

  hasRole(...roles: UserRole[]): Observable<boolean> {
    return this.ensureCurrentUser().pipe(
      map(user => !!user && roles.includes(user.role))
    );
  }

  changePassword(changePasswordDTO: { oldPassword: string; newPassword: string, confirmNewPassword: string }): Observable<void> {
    return this.http.post<void>(
      'http://localhost:8080/api/auth/changePassword',
      changePasswordDTO,
      { withCredentials: true }
    );
  }

  forgotPassword(forgotPasswordDTO: { email: string }): Observable<void> {
    return this.http.post<void>(
      'http://localhost:8080/api/auth/forgotPassword',
      forgotPasswordDTO
    );
  }
  
  resetPassword(resetPasswordDTO: { token: string; newPassword: string, confirmNewPassword: string }): Observable<void> {
    return this.http.post<void>(
      'http://localhost:8080/api/auth/resetPassword',
      resetPasswordDTO
    );
  }
}
