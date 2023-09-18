import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-call-back',
  templateUrl: './call-back.component.html',
  styleUrls: ['./call-back.component.css']
})
export class CallBackComponent {
  constructor(private oauthService: OAuthService, private router: Router, private httpClient: HttpClient){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.oauthService.tryLogin().then(() =>{
      if(this.oauthService.hasValidAccessToken()){
        this.httpClient.get("https://localhost:7099/api/countries").subscribe((data) =>{
          console.log(data);
          
        });

        console.log("WORKING FOR NOW");
      }else{
        console.log("THE TOKEN IS NOT VALID YET!")
      }
    })
  }
}
