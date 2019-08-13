import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginComponent } from './components/login/login.component';
import { DataComponent } from './components/data/data.component';
import { LogComponent } from './components/log/log.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'data', component: DataComponent, canActivate: [AuthGuardService] },
  { path: 'log', component: LogComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
