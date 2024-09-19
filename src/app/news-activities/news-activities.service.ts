import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsActivitiesService {
  private url = environment.apiUrl

  constructor(private httpClient : HttpClient) { }

  findAllNews(page:any,size:any){
    return this.httpClient.get(`${this.url}/news?page=${page}&size=${size}`)
  }

  findNewsById(news_id:any){
    return this.httpClient.get(`${this.url}/News/${news_id}`)
  }

  findAllNewsActive(){
    return this.httpClient.get(`${this.url}/News/active`)
  }
}
