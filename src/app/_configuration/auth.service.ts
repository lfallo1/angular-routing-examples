import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = false;

  constructor() { }

  isAuthenticated(): Promise<boolean>{
    return new Promise((resolve, reject) =>{
      setTimeout(()=>{
        if(this.loggedIn){
          resolve(true);
        } else{
          reject(false);
        }
      },500)
    })
  }

  login(){
    this.loggedIn = true;
  }

  logout(){
    this.loggedIn = false;
  }
}
