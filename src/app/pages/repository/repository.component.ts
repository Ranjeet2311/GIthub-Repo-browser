import { Component, OnInit } from '@angular/core';
import { GithubService } from '../../service/github.service';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrl: './repository.component.scss',
})
export class RepositoryComponent implements OnInit {
  // flattenedData: any[] = [];

  constructor(public githubService: GithubService) {}

  ngOnInit(): void {}
}
