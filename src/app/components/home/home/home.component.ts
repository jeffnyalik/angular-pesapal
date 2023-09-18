import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { PesaService } from 'src/app/services/pesapal/pesa.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent {
  model:any;
  res: any;
  orderSubmited: boolean = false;
  amount:number = 25;
  responseData: any;
  form: FormGroup;
  loading: boolean = false;
  submited: boolean = false;
  redirectUrl: SafeResourceUrl | undefined; // Store the sanitized URL
  OrderTrackingId:string | null = null;
  OrderMerchantReference: string | null = null;
  ngOnInit(): void {
    this.responseData = "";
    this.activatedRoute.queryParams.subscribe(params =>{
      this.OrderTrackingId = params['OrderTrackingId'] || null;
      this.OrderMerchantReference = params['OrderMerchantReference'] || null;
      console.log("Receieved callback");
      console.log("Order Tracking ID: ", this.OrderTrackingId);
      console.log("Order Merchant ID: ", this.OrderMerchantReference);
    })
  }
  constructor(
     private pesaService: PesaService,
     private router: Router,
     private sanitizer: DomSanitizer,
     private formBuilder: FormBuilder,
     private activatedRoute: ActivatedRoute
     ){
      const randomNumber = Math.floor(1000 + Math.random() * 9000);
      const id = `T${randomNumber}H0072`;
      this.form = this.formBuilder.group({
        id: new FormControl(id),
        currency: ['KES'],
        amount: [''],
        email_address: ['jeffnyak@gmail.com'],
        callback_url: ['http://localhost:4200'],
        notification_id: ['b50f126d-638a-476b-b651-de3115a7208f'],
        branch: [''],
        redirect_mode: ['Window'],
        description: ['Sample description'],
         billing_address: this.formBuilder.group({
          email_address: ['jeffnyak@gmail.com', [Validators.required, Validators.email]],
          phone_number: ['0716431039', Validators.required],
          first_name: ['', Validators.required],
          country_code: ['KE', Validators.required],
        })
      })
     }
    submitOrder(){
    if(this.form.invalid){
      return
    }

    this.orderSubmited = true;
    this.pesaService.submitOrder(this.form.value).subscribe((responseData) =>{
      this.responseData = responseData;
      if(responseData.redirect_url){
        const decodeURL = decodeURIComponent(responseData.redirect_url);
        this.redirectUrl = this.sanitizer.bypassSecurityTrustResourceUrl(decodeURL);
        console.log(decodeURL);
      }else{
        console.log("FAILED TO LOAD");
      }
    })
  }

  checkTransaction(){
    this.res = this.OrderTrackingId;
    this.pesaService.getTransactionStatus(this.res).subscribe((response) =>{
      if(response.status_code === 1){
        console.log(response.payment_status_description);
        console.log(response.amount);
      }else{
        console.log("AMOUNT HAS NOT BEEN PAID");
      }
    })
  }
}
