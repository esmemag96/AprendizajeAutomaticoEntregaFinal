import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './main-components/home/home.component';
import { LoginComponent } from './main-components/login/login.component';
import { LoginAdminComponent } from './main-components/login-admin/login-admin.component';
import { EcoaComponent } from './main-components/ecoa/ecoa.component';
import { DashboardComponent } from './main-components/dashboard/dashboard.component';
import { AnalizeTextComponent } from './main-components/analize-text/analize-text.component';
import { NotFoundComponent } from './main-components/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'analize', component: AnalizeTextComponent },
  { path: 'ecoa', component: EcoaComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: LoginAdminComponent },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
