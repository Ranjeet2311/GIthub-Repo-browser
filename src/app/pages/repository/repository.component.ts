import { Component, OnInit } from '@angular/core';
import { GithubService } from '../../service/github.service';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
})
export class RepositoryComponent {
  constructor(public githubService: GithubService) {}

  next() {
    this.githubService.fetchData(this.githubService.token).subscribe(
      (response: any) => {
        console.log(`Load next page :: `, response);
        const pageInfo = response.data.search.pageInfo;
        this.githubService.hasNextPage = pageInfo.hasNextPage;
        this.githubService.hasPreviousPage = pageInfo.hasPreviousPage;
        this.githubService.afterCursor = pageInfo.endCursor;
        this.githubService.beforeCursor = pageInfo.startCursor;
        const data = response.data.search.edges;
        this.githubService.responseData = data.map((item: any) => {
          return item.node;
        });
      },
      (error: any) => {
        console.error('Error fetching next page:', error);
      }
    );
  }

  previousPage() {
    this.githubService.fetchData(this.githubService.token).subscribe(
      (response: any) => {
        console.log(`Loading back page ::`, response);
        const pageInfo = response.data.search.pageInfo;
        this.githubService.hasNextPage = pageInfo.hasNextPage;
        this.githubService.hasPreviousPage = pageInfo.hasPreviousPage;
        this.githubService.afterCursor = pageInfo.endCursor;
        this.githubService.beforeCursor = pageInfo.startCursor;
        const data = response.data.search.edges;
        this.githubService.responseData = data.map((item: any) => {
          return item.node;
        });
      },
      (error: any) => {
        console.error('Error fetching previous page:', error);
      }
    );
  }
}
