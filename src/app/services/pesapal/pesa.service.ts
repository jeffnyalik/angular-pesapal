import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

interface ApiResponse
{
  redirect_url: string;
  error: null | any; // You can define the error type here if it's expected
  status: string;
};

interface TransactionStatusResponse
{
  payment_method: string,
  amount: string,
  created_date: Date,
  confirmation_code: string,
  order_tracking_id: string,
  payment_status_description: string,
  description: string,
  message: string,
  payment_account: string,
  call_back_url: string,
  status_code: number,
  merchant_reference: string,
  payment_status_code: string,
  currency: string,
  status: string
}
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class PesaService {
  // public PESAPAL_URI = environment.BASE_URL;
  // public SUBMIT_ORDER = environment.SUBMIT_ORDER;
  // public SAMPLE_URL = environment.SAMPLE_URL

  public PESAPAL_URI = "https://localhost:7099/api/pesapal";
  public SUBMIT_ORDER = "/submit-order";
  public TRANSACTION_STATUS = "/status?";
  public SAMPLE_URL = "/names";


  constructor(private httpClient: HttpClient) { }
  public getNames(){
    return this.httpClient.get(`${this.PESAPAL_URI}${this.SAMPLE_URL}`);
  }

  public submitOrder(model:any){
    return this.httpClient.post<ApiResponse>(`${this.PESAPAL_URI}${this.SUBMIT_ORDER}`, model);
  }

  public getTransactionStatus(orderTrackingId: string){
    return this.httpClient.get<TransactionStatusResponse>(`${this.PESAPAL_URI}/status?orderTrackingId=${orderTrackingId}`);
  }

}
