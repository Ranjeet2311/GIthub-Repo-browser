import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GithubService } from '../../service/github.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public errorMessage: string = '';
  public isLoading: boolean = false;

  tokenForm: FormGroup = new FormGroup({});

  query: string = `query GetPublicRepositories($afterCursor: String) { 
    search(query: "is:public", type: REPOSITORY, first: 20, after: $afterCursor) { 

      pageInfo { 
        hasNextPage 
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

  constructor(
    private router: Router,
    public githubService: GithubService,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.tokenForm = this.formBuilder.group({
      token: ['', Validators.required],
    });
  }

  send() {
    this.isLoading = true;
    this.githubService
      .fetchData(this.query, this.tokenForm.value.token)
      .subscribe(
        () => {
          this.isLoading = false;
          this.router.navigateByUrl('/repositories');
        },
        (error: any) => {
          this.errorMessage = error.error.message;
          this.isLoading = false;
        }
      );
  }
}
