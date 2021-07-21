import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { <%=classify(name)%>RoutingModule } from './<%=name%>-routing.module';
import { <%=classify(name)%>Reducers } from './store/<%=name%>.reducers';
import { <%=classify(name)%>Effects } from './store/<%=name%>.effects';

@NgModule({
  declarations: [],
  imports:[
    CommonModule,
    <%=classify(name)%>RoutingModule,
    StoreModule.forFeature('<%=camelize(classify(name))%>', <%=classify(name)%>Reducers),
    EffectsModule.forFeature([<%=classify(name)%>Effects]),  ],
  exports:[],
  providers:[]
})
export class <%=classify(name)%>Module {}
