// src/app/services/meal-db.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MealDbApiService {
  private baseUrl: string = 'https://www.themealdb.com/api/json/v1/1/search.php';

  constructor(private http: HttpClient) {}

  searchMeals(query: string): Observable<any> {
    const url = `${this.baseUrl}?s=${query}`;
    return this.http.get<any>(url);
  }
}
