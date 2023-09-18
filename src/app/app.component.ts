import { Component } from '@angular/core';

import { OAuthService } from 'angular-oauth2-oidc';

import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';

import { authConfig } from './app.module';

import { PesaService } from './services/pesapal/pesa.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ang-auth';
  model:any;
  constructor(private oauthService: OAuthService, private pesaService: PesaService){
    this.configure();
  }

  ngOnInit(): void {
    this.pesaService.getNames().subscribe((data) =>{
      console.log(data);
    })
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }
  private configure(){
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  public logout(){
    this.oauthService.logOut();
  }
  public get Name(){
    let claims = this.oauthService.getIdentityClaims();
    return claims;
    // if(!claims) return null;
    // let res = claims['family_name'];
    // console.log(res);
    // return claims;
  }

  submitOrder(){
    this.pesaService.submitOrder(this.model).subscribe((data) =>{
      console.log(data);
      console.log("something is being logged");
    }) 
  }
}
