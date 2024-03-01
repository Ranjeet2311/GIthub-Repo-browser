import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  public responseData: any[] = [];
  private apiUrl = 'https://api.github.com/graphql';

  constructor(private http: HttpClient) {}

  fetchData(query: string, accessToken: string): any {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    });

    return this.http.post<any>(this.apiUrl, { query }, { headers }).pipe(
      map((response) => {
        response.data.search.edges.map((item: any) => {
          this.responseData.push(item.node);
          return item.node;
        });
      })
    );
  }
}
