import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticatedUser, UserAdminView, UserRole } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient) {}

  me(): Observable<AuthenticatedUser> {
    return this.http.get<AuthenticatedUser>(`${this.apiUrl}/me`, { withCredentials: true });
  }

  list(): Observable<UserAdminView[]> {
    return this.http.get<UserAdminView[]>(this.apiUrl, { withCredentials: true });
  }

  updateRole(id: number, role: UserRole): Observable<UserAdminView> {
    return this.http.put<UserAdminView>(`${this.apiUrl}/${id}/role`, { role }, { withCredentials: true });
  }
}
