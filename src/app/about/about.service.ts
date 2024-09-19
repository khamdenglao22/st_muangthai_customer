import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  private url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  findAllAboutStructure(){
    return this.httpClient.get(`${this.url}/about-structure/page`)
  }
}
