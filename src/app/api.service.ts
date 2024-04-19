import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // private baseUrl = 'https://api.umm-actually.com/';
  private baseUrl = 'http://localhost:8000/';

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

  tips = [
    "Hola, mundo.",
    "La visión hace la ejecución.",
    "La paciencia es una virtud.",
    "La victoria es el resultado de la preparación.",
    "DEVOTION es un acrónimo. ¿Conoces su significado?",
    "SALAD son las iniciales de los devs.",
    "El tiempo es oro.",
    "La unión hace la fuerza.",
    "Tercera ley de Newton: la única manera de que los humanos descubran cómo llegar a alguna parte es dejando algo atrás.",
    "Shoutout a SALAD (antes Mango Technologies, Inc.) (antes BALLAD)",
    "DevOps + Notion anyone?",
    "Checo Pérez no nos patrocina, pero nos gustaría.",
    "Nos gusta mucho el café de Tims.",
    "Haz clic en \"Mostrar subtareas\" para ver todas las tareas que componen el proyecto actual.",
    "Haz clic en \"Filtrar asignado a mí\" para ver solo las tareas que te corresponden."
  ]

  tipsLength = this.tips.length;

  randomTip() {
    return this.tips[Math.floor(Math.random() * this.tipsLength)];
  }
}
