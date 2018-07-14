import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: {id: number, name: string};

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    // this.user = {
    //   id: this.route.snapshot.params.userId,
    //   name: this.route.snapshot.params.username
    // }

    //FWIW, returns an observable
    this.route.params.subscribe(() =>{
      this.user = {
        id: this.route.snapshot.params.userId,
        name: this.route.snapshot.params.username
      }

      /*
       * can also get directly off 'params' which does get passed in (even though its omitted).
        this.user.id = params.userId,
        this.user.name = params.username
       */

    })
  }

}
