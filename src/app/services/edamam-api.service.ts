import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EdamamApiService {
  private apiUrl = 'https://api.edamam.com/api/recipes/v2';
  private app_id = '0859d684'; //API ID
  private app_key = '336359e610474fc480496a696e4310d1';  // API app key

  constructor(private http: HttpClient) { }

  searchRecipes(query: string): Observable<any> {
    let params = new HttpParams()
      .set('type', 'public')
      .set('q', query)
      .set('app_id', this.app_id)
      .set('app_key', this.app_key);

    return this.http.get(this.apiUrl, { params });
  }
}