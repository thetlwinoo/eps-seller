import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: './main/dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'products',
    loadChildren: './main/products/products.module#ProductsModule'
  },
  {
    path: 'pages',
    loadChildren: './main/pages/pages.module#PagesModule'
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
