import { Injectable } from "@angular/core";
import { <%=classify(name) %>ApiConfig } from '../configs/<%=name %>-api.config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class <%=classify(name)%>Service {
  constructor(private http:HttpClient,private api:<%=classify(name) %>ApiConfig) {

  }

  get<%=classify(name)%>sList(payload?: any){
    return this.http.get(this.api.<%=underscore(name).toUpperCase() %>());
  }

  get<%=classify(name)%>Details(id:any){
    return this.http.get(this.api.<%=underscore(name).toUpperCase() %>(id));
  }

  save<%=classify(name)%>(payload:any) {
    return this.http.post(this.api.<%=underscore(name).toUpperCase() %>(),payload);
  }

  update<%=classify(name)%>(payload:any) {
    return this.http.put(this.api.<%=underscore(name).toUpperCase() %>(),payload);
  }

  delete<%=classify(name)%>(id:any){
    return this.http.delete(this.api.<%=underscore(name).toUpperCase() %>(id));
  }

}
