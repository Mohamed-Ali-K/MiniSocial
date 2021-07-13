import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ErroComponent } from './erro/erro/erro.component';

@Injectable()
export class ErroInterceptor implements HttpInterceptor {
  constructor(private dialog: MatDialog) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown erro occurred!';
        if (error.error.message) {
          errorMessage = error.error.message
        }
       this.dialog.open(ErroComponent, {data: {message: errorMessage}});
        return throwError(error);
      })
    );
  }
}
