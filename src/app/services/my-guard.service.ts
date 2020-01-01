import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AutorizacionService } from "./autorizacion.service";
import { Observable } from "rxjs/Observable";

@Injectable()

export class MyGuard implements CanActivate {
    loggedIn = false;
  
  constructor(private autorizacionService: AutorizacionService){
       this.autorizacionService.isLogged().subscribe((result) =>{
          if(result && result.emailVerified) {
            this.loggedIn = true;
            console.log('oli');
          } else {
            this.loggedIn = false;
            console.log('olix2');
          }
       }), (error) => {
        console.log('olix3');
         this.loggedIn = false;
       }
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
  boolean | Observable<boolean> | Promise<boolean> {
    return this.loggedIn;
  }
}
