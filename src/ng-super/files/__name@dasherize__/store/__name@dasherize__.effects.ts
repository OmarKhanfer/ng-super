import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, switchMap, catchError, withLatestFrom, tap} from 'rxjs/operators';
import * as <%=camelize(classify(name))%>Actions from './<%=name%>.actions';
import { <%=classify(name)%>State } from './<%=name%>.state';
@Injectable({
  providedIn: 'root'
})
export class <%=classify(name)%>Effects {
  constructor(
    private actions$: Actions,
    private store: Store<<%=classify(name)%>State>,
    private service: <%=classify(name)%>Service) {

  }

  @Effect()
  query<%=classify(name)%>sList$ = this.actions$.pipe(
    ofType(<%=camelize(classify(name))%>Actions.<%=classify(name)%>sActionTypes.<%=underscore(name).toUpperCase() %>S_LIST_REQUEST),
    switchMap((req: any) => {
      return this.service.get<%=classify(name)%>sList().pipe(
        map((resp: any) => {
          return new <%=camelize(classify(name))%>Actions.<%=classify(name)%>sListSuccess(resp);
        })
      );
    }),
    catchError((resp: any) => of(new <%=camelize(classify(name))%>Actions.<%=classify(name)%>sListFailed(resp)))
  );

  @Effect()
  query<%=classify(name)%>Details$ = this.actions$.pipe(
    ofType(<%=camelize(classify(name))%>Actions.<%=classify(name)%>sActionTypes.<%=underscore(name).toUpperCase() %>_DETAILS_REQUEST),
    switchMap((req: any) => {
      return this.service.get<%=classify(name)%>Details(req.id).pipe(
        map((resp: any) => {
          return new <%=camelize(classify(name))%>Actions.<%=classify(name)%>sListSuccess(resp);
        })
      );
    }),
    catchError((resp: any) => of(new <%=camelize(classify(name))%>Actions.<%=classify(name)%>sListFailed(resp.error)))
  );
}
