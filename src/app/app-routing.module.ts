import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { PesaFlowComponent } from './components/pesa-flow/pesa-flow.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ProfileComponent } from './components/auth/profile/profile.component';
import { HomeComponent } from './components/home/home/home.component';
import { CallBackComponent } from './components/payments/call-back/call-back.component';

const routes: Routes = [
  {path: '', component: PesaFlowComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profiles', component: ProfileComponent},
  {path: 'redirect-uri', component: CallBackComponent},
  {path: 'pesapal-callback', component: CallBackComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
