// src/app/services/tasty-api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TastyApiService {
  private baseUrl: string = 'https://tasty.p.rapidapi.com/recipes/list';
  
  private headers = new HttpHeaders({
    'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
    'X-RapidAPI-Key': ' 6f4cfec88bmsh0c161e9d91392abp18628ajsnffe77168258a' 
  });

  constructor(private http: HttpClient) {}

  searchRecipes(query: string): Observable<any> {
    const params = {
      from: '0',
      size: '10', //Number of recipes want to return
      tags: "",
      q: query,
      sort: ""
    };

    return this.http.get<any>(this.baseUrl, { headers: this.headers, params });
  }
}
