import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRouteAccessService } from '@eps/core/auth/user-route-access.service';
import { OktaCallbackComponent } from '@okta/okta-angular';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'implicit/callback',
    component: OktaCallbackComponent
  },
  {
    path: 'dashboard',    
    loadChildren: () => import('./main/dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: 'products',
    loadChildren: () => import('./main/products/products.module').then(m => m.ProductsModule),
  },
  {
    path: 'pages',
    loadChildren: () => import('./main/pages/pages.module').then(m => m.PagesModule),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
