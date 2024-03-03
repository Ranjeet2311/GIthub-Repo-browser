import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private apiUrl = 'https://api.github.com/graphql';
  public responseData: any[] = [];
  private pageSize = 5;
  public afterCursor: string | null = null;
  public beforeCursor: string | null = null;
  public hasNextPage = false;
  public hasPreviousPage = false;
  public token: string = '';

  constructor(private http: HttpClient) {}

  fetchData(accessToken: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    });

    const query = `query GetPublicRepositories($pageSize: Int!, $afterCursor: String,  $beforeCursor: String ) { 
      search(query: "is:public", type: REPOSITORY, first: $pageSize, after: $afterCursor, before: $beforeCursor) { 
        pageInfo { 
          hasNextPage 
          hasPreviousPage
          startCursor 
          endCursor 
        } 
        edges { 
          node { 
            ... on Repository {
              description 
              shortDescriptionHTML 
              id 
              name
              owner { 
                login 
              } 
              stargazers { 
                totalCount 
              } 
              issues(last: 15, orderBy: {field: CREATED_AT, direction: DESC}) { 
                nodes { 
                  title 
                  createdAt 
                } 
              } 
              } 
            } 
          } 
        }         
      } 
    `;

    return this.http.post<any>(
      this.apiUrl,
      {
        query,
        variables: {
          pageSize: this.pageSize,
          afterCursor: this.afterCursor,
          beforeCursor: this.beforeCursor,
        },
      },
      { headers }
    );
  }
}
