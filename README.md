# What is Ng Super Sechematics Collection

It is a custom schematics collection, which allow you to generate scaffolded bunch of code, to reduce the efforts and time in development.

## Table of Contents

* [Installation](#installation)
* [Schematics](#schematics)
* [Usage](#usage)
* [Output File Example](#example)
* [Output Code](#code)

# Installation[](#installation) 
To install the component
```
npm i ng-super -s
```
 
# Schematics[](#schematics) 

| Name           | Description                                                                                               |
| -------------- | ----------------------------------------------------------------------------------------------------------|
| super-module   | Generates Module, Module's Route, API Config, URL Resolvers, NGRX files for (CRUD) operations and filter, contains actions, reducers, effects, selectors and state, Service for (CRUD) operations.                         |
| super-store    | Generates NGRX files for (CRUD) operations and filter, contains actions, reducers, effects, selectors and state. |


# Usage[](#usage)
### Super Module
To use Super Module
```
 ng g ng-super:sm entity-name
 ng g ng-super:super-module entity-name
```

### Super Store
to use super store
```
 ng g ng-super:ss entity-name
 ng g ng-super:super-store entity-name
```

> This is extended to @schematics/angular, if you change the defaultCollection in angular.json to package 
> you can use it without **ng-super:**


# Output Files Example[](#example)
Suppose we want to create new module called user-registration, you can run the command using the following
```
ng g ng-super:sp student-registration
```
the output of the files will be
> CREATE src/app/student-registration/student-registration-routing.module.ts (272 bytes)<br>
> CREATE src/app/student-registration/student-registration.module.ts (684 bytes)<br>
> CREATE src/app/student-registration/configs/student-registration-api.config.ts (217 bytes)<br>
> CREATE src/app/student-registration/resolvers/student-registration-details.resolver.ts (1118 bytes)<br>
> CREATE src/app/student-registration/resolvers/student-registration-list.resolver.ts (1094 bytes)<br>
> CREATE src/app/student-registration/services/student-registration.service.ts (942 bytes)<br>
> CREATE src/app/student-registration/store/student-registration.actions.ts (5966 bytes)<br>
> CREATE src/app/student-registration/store/student-registration.effects.ts (1733 bytes)<br>
> CREATE src/app/student-registration/store/student-registration.reducers.ts (2787 bytes)<br>
> CREATE src/app/student-registration/store/student-registration.selectors.ts (989 bytes)<br>
> CREATE src/app/student-registration/store/student-registration.state.ts (307 bytes)

# Output Code[](#code)
#### Entity Module
In case you are disabling the store

#### Without Store

```javascript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentRegistrationRoutingModule } from './student-registration-routing.module';

@NgModule({
  declarations: [],
  imports:[
    CommonModule,
    StudentRegistrationRoutingModule,
  ],
  exports:[],
  providers:[]
})
export class StudentRegistrationModule {}
```
#### With Store

```javascript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentRegistrationRoutingModule } from './student-registration-routing.module';
import { StudentRegistrationReducers } from './store/student-registration.reducers';
import { StudentRegistrationEffects } from './store/student-registration.effects';

@NgModule({
  declarations: [],
  imports:[
    CommonModule,
    StudentRegistrationRoutingModule,
    StoreModule.forFeature('studentRegistration', StudentRegistrationReducers),
    EffectsModule.forFeature([StudentRegistrationEffects]),  ],
  exports:[],
  providers:[]
})
export class StudentRegistrationModule {}
```
#### Entity Routing Module
```javascript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRegistrationRoutingModule { }
```
#### Entity API's Configs
```javascript
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class StudentRegistrationApiConfig {
  constructor() { }

  STUDENT_REGISTRATION = (id?: any): string => `/${id}`;
}
```
#### Entity Service
```javascript
import { Injectable } from "@angular/core";
import { StudentRegistrationApiConfig } from '../configs/student-registration-api.config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentRegistrationService {
  constructor(private http:HttpClient,private api:StudentRegistrationApiConfig) {

  }

  getStudentRegistrationsList(payload?: any){
    return this.http.get(this.api.STUDENT_REGISTRATION());
  }

  getStudentRegistrationDetails(id:any){
    return this.http.get(this.api.STUDENT_REGISTRATION(id));
  }

  saveStudentRegistration(payload:any) {
    return this.http.post(this.api.STUDENT_REGISTRATION(),payload);
  }

  updateStudentRegistration(payload:any) {
    return this.http.put(this.api.STUDENT_REGISTRATION(),payload);
  }

  deleteStudentRegistration(id:any){
    return this.http.delete(this.api.STUDENT_REGISTRATION(id));
  }
}
```




