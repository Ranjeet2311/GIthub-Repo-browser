import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RepositoryComponent } from './pages/repository/repository.component';
import { RepositoryDetailsComponent } from './pages/repository-details/repository-details.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'repositories',
    component: RepositoryComponent,
  },
  {
    path: ':owner/:repositoryName',
    component: RepositoryDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
