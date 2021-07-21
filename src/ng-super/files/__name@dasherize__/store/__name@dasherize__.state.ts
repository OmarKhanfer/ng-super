
export interface <%=classify(name)%>State {
  errors: any | null;
  <%=camelize(name)%>sList:any;
  <%=camelize(name)%>Details:any;
}

export const initial<%=classify(name)%>State: <%=classify(name)%>State = {
  errors: null,
  <%=camelize(name)%>sList:[],
  <%=camelize(name)%>Details:null
};
