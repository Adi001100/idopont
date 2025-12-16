import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse, HttpClient
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private refreshing = false;

    constructor(private http: HttpClient) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Fontos: minden kérés menjen cookie-val
        const withCredsReq = req.clone({ withCredentials: true });

        return next.handle(withCredsReq).pipe(
            catchError((err: HttpErrorResponse) => {
                // Ne próbáld a refresh hívást refresh-elni
                if (withCredsReq.url.includes('/api/auth/refresh')) {
                    return throwError(() => err);
                }

                if (err.status !== 401) {
                    return throwError(() => err);
                }

                // Egyszerű verzió: 401 -> refresh -> retry
                // (Konkurens 401-ek kezelését később lehet finomítani)
                return this.http.get<void>('http://localhost:8080/api/auth/refresh', { withCredentials: true }).pipe(
                    switchMap(() => next.handle(withCredsReq))
                );
            })
        );
    }
}
