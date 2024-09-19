import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComponentsService {
  private url = environment.apiUrl
  constructor(private httpClient: HttpClient) { }

  findAllServiceType(){
    return this.httpClient.get(`${this.url}/service-type`)
  }

  findAllServiceCountry(type_id:number | null){
    return this.httpClient.get(`${this.url}/service-country?service_type_id=${type_id}`)
  }

  findAllProductCategory(){
    return this.httpClient.get(`${this.url}/product-category`)
  }

  findAllSubCategoryOnChange(cate_id:number | null){
    return this.httpClient.get(`${this.url}/product-category-sub/onChange/${cate_id}`);
  }


  findAllSocial(){
    return this.httpClient.get(`${this.url}/social`);
  }

  findAllBannerAdvertising(){
    return this.httpClient.get(`${this.url}/banner-advertising/active`);
  }

}
