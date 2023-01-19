import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Unauthorized } from './shared/unauthorized-page/unauthorized.component';
import { GoalModule } from './goals/goal.module';
import { LoginComponent } from './core/login-component/login.component';
import { InDevelopment } from './shared/in-development/in-development.component';
import { AutoLoginPartialRoutesGuard } from 'angular-auth-oidc-client';
import { TaskModule } from './tasks/task.module';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        { path: '', redirectTo: 'goals', pathMatch: 'full' },
        { path: 'goals', loadChildren: () => GoalModule, canActivate: [AutoLoginPartialRoutesGuard] },
        { path: 'tasks', loadChildren: () => TaskModule, canActivate: [AutoLoginPartialRoutesGuard] },
        { path: 'categories', component: InDevelopment, canActivate: [AutoLoginPartialRoutesGuard] },
        { path: 'login', component: LoginComponent },
        { path: 'unauthorized', component: Unauthorized },
        { path: '**', component: Unauthorized },
      ],
      {}
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
