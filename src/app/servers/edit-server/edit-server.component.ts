import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, CanDeactivate, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {ServersService} from '../servers.service';
import {Server} from '../config/server.model';
import {CanComponentDeactivate, CanDeactiveGuardService} from '../../_configuration/can-deactivate-guard.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: Server;
  serverName = '';
  serverStatus = '';
  allowEdit: boolean = false;
  didSave = false;

  constructor(private serversService: ServersService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {

    this.route.queryParams.subscribe(() => {
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

  turtles(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit || this.didSave || (this.server.name === this.serverName && this.server.status === this.serverStatus)) {
      return true;
    }
    return confirm('Are you sure you want to leave without saving your changes?');
  }

}
