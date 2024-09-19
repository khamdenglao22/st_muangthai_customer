import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private url = environment.apiUrl
  private secretKey = environment.recaptcha.secretKey

  constructor(private httpClient: HttpClient) { }

  createSendMail(data:any){
    return this.httpClient.post(`${this.url}/send-mail`,data)
  }

  recaptcha(data:any){
    return this.httpClient.post(`${this.url}/reCaptcha`,{recaptcha:data,secretKey:this.secretKey})
  }

}
