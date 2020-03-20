import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RootSharedModule } from '@eps/shared.module';
import { UserRouteAccessService } from '@eps/core';
import { BreadcrumbGuard } from '@eps/services';
import { DashboardComponent } from './dashboard.component';

const routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      crumbs: [
        {
          label: 'Dashboard',
        },
      ],
      authorities: ['ROLE_USER'],
      pageTitle: 'DASHBOARD.TITLE',
    },
    canActivate: [UserRouteAccessService, BreadcrumbGuard],
  },
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, RouterModule.forChild(routes), TranslateModule, RootSharedModule],
  exports: [DashboardComponent],
})
export class DashboardModule {}
