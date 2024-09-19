import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  findAllBanner(){
    return this.httpClient.get(`${this.url}/banner/page`)
  }

}
