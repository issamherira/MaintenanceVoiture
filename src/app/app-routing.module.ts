import { ViewComponent } from './view/view.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { LoginComponent } from './login/login.component';
import { GuardAdminGuard } from './guards/guard-admin.guard';
import { ClientComponent } from './Client/client/client.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'Client', component: ClientComponent, canActivate: [GuardAdminGuard] },

  { path: 'list/:id', component: ListComponent, canActivate: [GuardAdminGuard] },
  {
    path: 'list/view/:voitureId',
    component: ViewComponent,
    canActivate: [GuardAdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
