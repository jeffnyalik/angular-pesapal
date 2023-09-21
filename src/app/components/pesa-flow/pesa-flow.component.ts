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
  model:any;
  responseData: SafeHtml | undefined
  htmlResponse: SafeHtml | null = null; // Initialize as null; // Store the HTML response
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }
  constructor(private pesaService: PesaService, private formBuilder: FormBuilder, private sanitizer: DomSanitizer){
    this.form = this.formBuilder.group({
      apiClientID: ['122'],
      serviceID: ['48766'],
      currency: ['KES'],
      billRefNumber: ['ACA_INV_001'],
      billDesc: ['Recordation'],
      clientMSISDN: ['254716431039'],
      clientName: ["JON DOE"],
      clientIDNumber:["123456"],
      clientEmail: ["nyakeoloo@gmail.com"],
      callBackURLOnSuccess:"https://localhost:7099/api/pesaflow/pesaflow-callback",
      amountExpected: ["10.00"],
      notificationURL: ["https://localhost:7099/api/pesaflow/pesaflow-checkout"],
      pictureURL: ["https://example.com/client_image.jpg"],
      secureHash: ["NWQwYTI3MzIzNWM2M2ZkNWExNjBhNTYxNjIyNzQyMjg0ZmZmODU3MDEzYTdjYjk3NDdjYzg0MjEzOGExNTgyNg=="],
      format: ["JSON"],
      sendSTK: ["true"]
    })
  }

  submitOrder() {
    this.pesaService.submitPesa(this.form.value).subscribe((responseData) =>{
      this.responseData = responseData;
      this.responseData = this.sanitizer.bypassSecurityTrustHtml(responseData.toString());
    })
  }

}
