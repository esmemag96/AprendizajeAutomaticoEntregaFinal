import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './main-components/home/home.component';
import { DashboardComponent } from './main-components/dashboard/dashboard.component';
import { NotFoundComponent } from './main-components/not-found/not-found.component';
import { NavBarComponent } from './main-components/nav-bar/nav-bar.component';
import { AnalizeTextComponent } from './main-components/analize-text/analize-text.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    NotFoundComponent,
    NavBarComponent,
    AnalizeTextComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
