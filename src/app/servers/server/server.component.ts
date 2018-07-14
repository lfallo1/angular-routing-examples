import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  allowEdit: boolean = false;

  constructor(private serversService: ServersService, private route: ActivatedRoute) { }

  ngOnInit() {

    //initialize variables from path vars, and also subscribe to be notified of changes
    this.route.params.subscribe(() =>{
      this.server = this.serversService.getServer(Number(this.route.snapshot.params.id));
    });

    this.route.queryParams.subscribe(() =>{
      this.allowEdit = this.route.snapshot.queryParams.allowEdit && JSON.parse(this.route.snapshot.queryParams.allowEdit.toLowerCase());
    });

    console.log(`ROUTE FRAGMENT ${this.route.snapshot.fragment}`);
  }

}
