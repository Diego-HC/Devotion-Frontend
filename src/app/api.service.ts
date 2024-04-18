import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://api.umm-actually.com/';

  constructor(private http: HttpClient) { }

  options(token?: string) {
    return {
      headers: new HttpHeaders(token ? {
        Authorization: `Bearer ${token}`
      } : {})
    }
  }

  get(endpoint: string, token?: string): Observable<any> {
    return this.http.get(`${this.baseUrl}${endpoint}`, this.options(token));
  }

  post(endpoint: string, data: any, token?: string): Observable<any> {
    return this.http.post(`${this.baseUrl}${endpoint}`, data, this.options(token));
  }

  put(endpoint: string, data: any, token?: string): Observable<any> {
    return this.http.put(`${this.baseUrl}${endpoint}`, data, this.options(token));
  }

  delete(endpoint: string, token?: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}${endpoint}`, this.options(token));
  }
}
