import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import {ActivatedRoute, ActivatedRouteSnapshot, CanDeactivate, Router, RouterStateSnapshot} from '@angular/router';
import {CanDeactiveGuardService} from './can-deactivate-guard.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanDeactivate<CanDeactiveGuardService> {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit: boolean = false;
  didSave = false;

  constructor(private serversService: ServersService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.route.queryParams.subscribe(() =>{
      this.allowEdit = this.route.snapshot.queryParams.allowEdit && JSON.parse(this.route.snapshot.queryParams.allowEdit.toLowerCase());
    });

    this.server = this.serversService.getServer(Number(this.route.snapshot.params.id));
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.didSave = true;
    this.router.navigate(['/servers', this.server.id], {queryParams: {allowEdit: true}});
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if(!this.allowEdit || this.didSave || (this.server.name === this.serverName && this.server.status === this.serverStatus)){
      return true;
    }
    return confirm('Are you sure you want to leave without saving your changes?');
  }

}
