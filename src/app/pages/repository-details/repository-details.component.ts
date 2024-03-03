import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GithubService } from '../../service/github.service';

interface params {
  owner: string;
  repositoryName: string;
}

@Component({
  selector: 'app-repository-details',
  templateUrl: './repository-details.component.html',
})
export class RepositoryDetailsComponent implements OnInit {
  public selectedRepo: any[] = [];
  public paramDetails: params = {
    owner: '',
    repositoryName: '',
  };

  constructor(
    private route: ActivatedRoute,
    public githubService: GithubService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        this.paramDetails = {
          owner: params['owner'],
          repositoryName: params['repositoryName'],
        };
      },
    });

    this.selectedRepo = this.githubService.responseData.filter((item) => {
      return item.name == this.paramDetails.repositoryName;
    });

    console.log(` selectedRepo Data : `, this.selectedRepo);
  }
}
