import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AuthConfig, OAuthModuleConfig, OAuthModule} from 'angular-oauth2-oidc';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CallBackComponent } from './components/auth/call-back/call-back.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ProfileComponent } from './components/auth/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home/home.component';
import { PesaFlowComponent } from './components/pesa-flow/pesa-flow.component';



export const authConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  redirectUri: window.location.origin + '/redirect-uri',
  clientId: '1013971797711-6ckmc0bv66dlf05fj804van7lkedf239.apps.googleusercontent.com',
  responseType: 'token id_token',
  scope: 'openid profile email',
  strictDiscoveryDocumentValidation: false
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    CallBackComponent,
    HomeComponent,
    PesaFlowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    OAuthModule.forRoot(),
  ],
  providers: [
    {provide: OAuthModuleConfig, useValue: authConfig}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
