import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthLayoutRoutingModule } from './auth-layout-routing.module';
import { LoginPageComponent } from '../../pages/login-page/login-page.component';


@NgModule({
  declarations: [
  
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    AuthLayoutRoutingModule
  ]
})
export class AuthLayoutModule { }
