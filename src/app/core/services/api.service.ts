import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { catchError, finalize } from 'rxjs/operators';

@Injectable()
export class ApiService {
  constructor(
    private http: HttpClient,
  ) {}

  private formatErrors(error: any) {
    return  throwError(error.error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, bodyData: any, params: HttpParams = new HttpParams(), finalizeHandler?: VoidFunction): Observable<any> {
    return this.http.put(
      `${environment.apiBaseUrl}${path}`,
      bodyData,
      { params }
    ).pipe(catchError(this.formatErrors))
    .pipe(finalize(() => {
      if (typeof finalizeHandler === 'function') {
        finalizeHandler();
      }
    }));
  }

  post(path: string, bodyData: any, params: HttpParams = new HttpParams(), finalizeHandler?: VoidFunction): Observable<any> {
    return this.http.post(
      `${environment.apiBaseUrl}${path}`,
      bodyData,
      { params }
    ).pipe(catchError(this.formatErrors))
    .pipe(finalize(() => {
      if (typeof finalizeHandler === 'function') {
        finalizeHandler();
      }
    }));
  }

  delete(path: string, params: HttpParams = new HttpParams(), finalizeHandler?: VoidFunction): Observable<any> {
    return this.http.delete(
      `${environment.apiBaseUrl}${path}`,
      { params }
    ).pipe(catchError(this.formatErrors))
    .pipe(finalize(() => {
      if (typeof finalizeHandler === 'function') {
        finalizeHandler();
      }
    }));
  }

  postFile(path: string, formData: FormData, httpOptions?, finalizeHandler?: VoidFunction): Observable<any> {
    const requestUrl = `${environment.apiBaseUrl}${path}`;

    return this.http.post(
      requestUrl,
      formData,
      httpOptions
    ).pipe(catchError(this.formatErrors))
    .pipe(finalize(() => {
      if (typeof finalizeHandler === 'function') {
        finalizeHandler();
      }
    }));
  }
}
