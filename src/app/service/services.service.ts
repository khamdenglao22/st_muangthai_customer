import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private url = environment.apiUrl

  constructor(private httpClient : HttpClient) { }

  findByProvAndCountry(country_id:number,province_id:any){
    return this.httpClient.post(`${this.url}/service-location/prov_country?country_id=${country_id}&province_id=${province_id}`,null)
  }

  findAllProvince(){
    return this.httpClient.get(`${this.url}/province`)
  }

  findAllProvinceByCountry(country_id: number | null){
    return this.httpClient.get(`${this.url}/province?country_id=${country_id}`)
  }

  findAllSection(){
    return this.httpClient.get(`${this.url}/service-section/frontend`)
  }

  findBySectionAndCountry(country_id:number,section_id:any){
    return this.httpClient.post(`${this.url}/service-location/section_country?country_id=${country_id}&section_id=${section_id}`,null)
  }

  findLocationMapByProvinceId(province_id:any){
    return this.httpClient.get(`${this.url}/location-map/map-province?province_id=${province_id}`)
  }

  findLocationMapBySectionId(section_id:any){
    return this.httpClient.get(`${this.url}/location-map/map-section?section_id=${section_id}`)
  }

  findCountryById(country_id:number){
    return this.httpClient.get(`${this.url}/service-country/${country_id}`)
  }
}
