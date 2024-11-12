// src/app/services/spoonacular.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpoonacularApiService {
  private baseUrl: string = 'https://api.spoonacular.com/recipes/complexSearch';
  private apiKey: string = '9d1f415592d6409996c5893f1274fadf'; 

  constructor(private http: HttpClient) {}

  searchRecipes(query: string): Observable<any> {
    const params = new HttpParams()
      .set('query', query)
      .set('apiKey', this.apiKey);

    return this.http.get<any>(this.baseUrl, { params });
  }
}
