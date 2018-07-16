import {Component, OnInit} from '@angular/core';

import {ServersService} from '../servers.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Server} from '../config/server.model';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: Server;

  constructor(private serversService: ServersService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {

    //initialize variables from path vars, and also subscribe to be notified of changes
    this.route.params.subscribe(() => {
      this.server = this.serversService.getServer(Number(this.route.snapshot.params.id));
    });

    console.log(`ROUTE FRAGMENT ${this.route.snapshot.fragment}`);
  }

  editServer() {
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
  }
}
