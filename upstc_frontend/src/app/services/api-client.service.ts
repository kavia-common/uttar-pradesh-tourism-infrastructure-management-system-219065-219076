import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

type BodyOptions = {
  headers?: HttpHeaders | { [header: string]: string | string[] };
  params?: HttpParams | { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean> };
  reportProgress?: boolean;
  withCredentials?: boolean;
  responseType?: 'json';
};

@Injectable({ providedIn: 'root' })
export class ApiClient {
  private http = inject(HttpClient);
  private base = environment.apiBaseUrl;

  // PUBLIC_INTERFACE
  get<T>(path: string, options?: BodyOptions): Observable<T> {
    /** Performs a GET request against the backend API */
    return this.http.get<T>(`${this.base}${path}`, { ...(options || {}) });
  }

  // PUBLIC_INTERFACE
  post<T>(path: string, body: any, options?: BodyOptions): Observable<T> {
    /** Performs a POST request against the backend API */
    return this.http.post<T>(`${this.base}${path}`, body, { ...(options || {}) });
  }

  // PUBLIC_INTERFACE
  put<T>(path: string, body: any, options?: BodyOptions): Observable<T> {
    /** Performs a PUT request against the backend API */
    return this.http.put<T>(`${this.base}${path}`, body, { ...(options || {}) });
  }

  // PUBLIC_INTERFACE
  delete<T>(path: string, options?: BodyOptions): Observable<T> {
    /** Performs a DELETE request against the backend API */
    return this.http.delete<T>(`${this.base}${path}`, { ...(options || {}) });
  }
}
