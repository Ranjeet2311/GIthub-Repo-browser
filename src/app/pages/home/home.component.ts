import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GithubService } from '../../service/github.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  public errorMessage: string = '';
  public isLoading: boolean = false;

  tokenForm: FormGroup = new FormGroup({});

  constructor(
    private router: Router,
    public githubService: GithubService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.tokenForm = this.formBuilder.group({
      token: ['', Validators.required],
    });
  }

  send() {
    this.githubService.token = this.tokenForm.value.token;
    this.isLoading = true;
    this.githubService.fetchData(this.tokenForm.value.token).subscribe(
      (response: any) => {
        this.isLoading = false;
        const pageInfo = response.data.search.pageInfo;
        this.githubService.hasNextPage = pageInfo.hasNextPage;
        this.githubService.hasPreviousPage = pageInfo.hasPreviousPage;
        this.githubService.afterCursor = pageInfo.endCursor;
        this.githubService.beforeCursor = pageInfo.startCursor;

        const data = response.data.search.edges;
        this.githubService.responseData = data.map((item: any) => {
          return item.node;
        });

        this.router.navigateByUrl('/repositories');
      },
      (error: any) => {
        this.errorMessage = error.error.message;
        this.isLoading = false;
      }
    );
  }
}
