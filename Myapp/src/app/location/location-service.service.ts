import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { location } from './location';

@Injectable({
  providedIn: 'root'
})
export class locationServiceService {

  constructor(private http:HttpClient) { }
  baseUrl="http://localhost:8080";

  

  getlocation(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/location/${id}`);
  }

  createlocation(location: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/location`, location);
  }

  updatelocation(id: number, location: Object): Observable<Object> {
    console.log(location);
    console.log(  this.http.put(this.baseUrl+"/location/" +id,location));
    return this.http.put(this.baseUrl+"/location/" +id,location);
    
  }

  deletelocation(id: number): Observable<any> {
    return this.http.delete(this.baseUrl+"/location/" +id);
  }

  getlocationList(): Observable<any> {
    return this.http.get(this.baseUrl+"/location");
  }

  validatelocation(location :location){
return this.http.post(this.baseUrl+"/validatelocation",location);
  }
  
  
}

