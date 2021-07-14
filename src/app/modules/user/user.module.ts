import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ActivateComponent } from './components/activate/activate.component';
import { RouterModule, Routes } from '@angular/router';
import { ActivateResolver } from 'src/app/resolvers/activate.resolver';
import { SharedModule } from '../shared/shared.module';


const routes: Routes = [
  {
    path: 'login',
    component: LoginFormComponent
  },
  {
    path: 'activation/:id',
    component: ActivateComponent,
    resolve: [ActivateResolver]
  },
  {
    path: 'registration',
    component: RegistrationFormComponent
  },
]


@NgModule({
  declarations: [
    RegistrationFormComponent,
    LoginFormComponent,
    ActivateComponent 
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
    CommonModule
  ]
})
export class UserModule { }
