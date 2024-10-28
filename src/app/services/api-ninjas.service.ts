// src/app/services/api-ninjas.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiNinjasService {
  private apiUrl = 'https://api.api-ninjas.com/v1/recipe';
  private apiKey = 'AbfKUVPO2BvWaG/lb3NNgQ==CTkZnaU7V5H101K6';

  constructor(private http: HttpClient) { }

  searchRecipes(query: string): Observable<any> {
    let headers = new HttpHeaders().set('X-Api-Key', this.apiKey);
    let params = new HttpParams().set('query', query);

    return this.http.get(this.apiUrl, { headers, params });
  }
}
