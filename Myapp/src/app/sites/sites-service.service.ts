import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { sites } from './sites';

@Injectable({
  providedIn: 'root'
})
export class SitesServiceService {

  constructor(private http:HttpClient) { }
  baseUrl="http://localhost:8080";

  

  getsites(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/sites/${id}`);
  }

  createsites(sites: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/sites`, sites);
  }

  updatesites(id: number, sites: Object): Observable<Object> {
    console.log(sites);
    console.log(  this.http.put(this.baseUrl+"/sites/" +id,sites));
    return this.http.put(this.baseUrl+"/sites/" +id,sites);
    
  }

  deletesites(id: number): Observable<any> {
    return this.http.delete(this.baseUrl+"/sites/" +id);
  }

  getsitesList(): Observable<any> {
    return this.http.get(this.baseUrl+"/sites");
  }

  validatesites(sites :sites){
return this.http.post(this.baseUrl+"/validatesites",sites);
  }
  
  
}

