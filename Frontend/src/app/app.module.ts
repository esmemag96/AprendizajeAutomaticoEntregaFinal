import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms'; 
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DomSanitizer } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './main-components/home/home.component';
import { DashboardComponent } from './main-components/dashboard/dashboard.component';
import { NotFoundComponent } from './main-components/not-found/not-found.component';
import { NavBarComponent } from './main-components/nav-bar/nav-bar.component';
import { AnalizeTextComponent } from './main-components/analize-text/analize-text.component';
import { EcoaComponent } from './main-components/ecoa/ecoa.component';
import { LoginComponent } from './main-components/login/login.component';
import { LoginAdminComponent } from './main-components/login-admin/login-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    NotFoundComponent,
    NavBarComponent,
    AnalizeTextComponent,
    EcoaComponent,
    LoginComponent,
    LoginAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
