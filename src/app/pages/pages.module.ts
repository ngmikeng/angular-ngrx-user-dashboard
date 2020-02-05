import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PagesComponent, DashboardComponent, UsersComponent],
  imports: [
    RouterModule ,
    SharedModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
