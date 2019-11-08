import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { RootSharedModule } from '@epm/shared.module';

const routes = [
  {
    path: 'auth/login',
    component: LoginComponent
  }
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    RootSharedModule
  ]
})
export class LoginModule { }
