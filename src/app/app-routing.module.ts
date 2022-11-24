import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterProtectorByCookieGuard } from './Guard/router-protector-by-cookie.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'Home',
    loadChildren: () => import('./Pages').then((m) => m.HomeModule),
    canActivate: [RouterProtectorByCookieGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('./Pages').then((m) => m.LoginModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
