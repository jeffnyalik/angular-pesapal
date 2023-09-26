import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { PesaService } from 'src/app/services/pesapal/pesa.service';

@Component({
  selector: 'app-pesa-flow',
  templateUrl: './pesa-flow.component.html',
  styleUrls: ['./pesa-flow.component.css']
})
export class PesaFlowComponent {
  @ViewChild('iframe') iframe!: ElementRef;
  form: FormGroup;
  checkForm: FormGroup;
  responseStatus: any;
  model:any;
  responseData: SafeHtml | undefined
  htmlResponse: SafeHtml | null = null; // Initialize as null; // Store the HTML response

  ngOnInit(): void {
    //some code here
  }
  constructor(private pesaService: PesaService, private formBuilder: FormBuilder, private sanitizer: DomSanitizer){
    this.form = this.formBuilder.group({
      apiClientID: ['122'],
      serviceID: ['48766'],
      currency: ['KES'],
      billRefNumber: ['IPR_TR_001'],
      billDesc: ['Recordation'],
      clientMSISDN: [''],
      clientName: ["JON DOE"],
      clientIDNumber:["123456"],
      clientEmail: ["nyakeoloo@gmail.com"],
      callBackURLOnSuccess:"http://localhost:4200/",
      amountExpected: [""],
      notificationURL: ["https://66f2-105-29-165-231.ngrok-free.app/api/pesaflow/notification-url"],
      pictureURL: ["https://example.com/client_image.jpg"],
      format: ["JSON"],
      sendSTK: ["false"]
    });

    this.checkForm = this.formBuilder.group({
      api_client_id: ['122'],
      ref_no: ['IPR_TR_001']
    })
  }

  submitOrder() {
    this.pesaService.submitPesa(this.form.value).subscribe((responseData) =>{
      this.responseData = responseData;
      this.responseData = this.sanitizer.bypassSecurityTrustHtml(responseData.toString());
      console.log(this.responseData);
    })
  }

  //Verify success/fail payment status
  checkTransaction(){
    this.pesaService.checkPaymentStatus(this.checkForm.value).subscribe((response) =>{
      this.responseStatus = response;
      if(this.responseStatus.status === "settled"){
        console.log("Client Reference: ", this.responseStatus.client_invoice_ref);
        console.log("Amount Paid: ", this.responseStatus.amount_paid);
        console.log("Amount Expected: ", this.responseStatus.amount_expected);
        console.log("Reference Number: ", this.responseStatus.ref_no);
        console.log("Currency: ", this.responseStatus.currency);
      }else{
        console.log("AN ERROR HAS OCCURED");
      }

    })
  }

}
