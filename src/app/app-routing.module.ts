import {ServerComponent} from './servers/server/server.component';
import {UsersComponent} from './users/users.component';
import {UserComponent} from './users/user/user.component';
import {EditServerComponent} from './servers/edit-server/edit-server.component';
import {PageNotFoundComponent} from './shared/page-not-found/page-not-found.component';
import {HomeComponent} from './home/home.component';
import {ServersComponent} from './servers/servers.component';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthGuardService} from './auth-guard.service';
import {CanDeactiveGuardService} from './servers/edit-server/can-deactivate-guard.service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: UsersComponent, children: [
      { path: ':userId/:username', component: UserComponent }
    ]
  },
  { path: 'servers', component: ServersComponent, canActivateChild: [AuthGuardService], /*canActivate: [AuthGuardService],*/ children: [
      { path: ':id', component: ServerComponent, data: { redirectTo: 'servers' }},
      { path: ':id/edit', component: EditServerComponent, data: { redirectTo: 'servers' }, canDeactivate: [ CanDeactiveGuardService ]}
    ]
  },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/page-not-found' }
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule{

}
