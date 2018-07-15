import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  router: Router;
  constructor(private _router: Router, private authService: AuthService){
    this.router = _router;
  }

  login(){
    this.authService.login();
  }

  logout(){
    this.authService.logout();
  }
}
