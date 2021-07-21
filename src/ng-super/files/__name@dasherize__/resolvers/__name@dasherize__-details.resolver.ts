import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { <%=classify(name)%>State } from '../store/<%=name%>.state';
import { <%=classify(name)%>Service } from '../services/<%=name%>.service';
import { <%=classify(name)%>DetailsSuccess } from '../store/<%=name%>.actions';

@Injectable({
  providedIn: 'root'
})

export class <%=classify(name)%>DetailsResolver implements Resolve<any>{

  constructor(private service:  <%=classify(name)%>Service, private store: Store<<%=classify(name)%>State>) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id = route.paramMap.get('id');

    return this.service.get<%=classify(name)%>Details(id).pipe(
      map((response: any) => {
        this.store.dispatch(new <%=classify(name)%>DetailsSuccess(response));
        return response;
      })
    );
  }
}
