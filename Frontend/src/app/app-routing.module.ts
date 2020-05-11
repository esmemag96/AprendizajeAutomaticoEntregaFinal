import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './main-components/home/home.component';
import { DashboardComponent } from './main-components/dashboard/dashboard.component';
import { AnalizeTextComponent } from './main-components/analize-text/analize-text.component';
import { NotFoundComponent } from './main-components/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'analize', component: AnalizeTextComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
