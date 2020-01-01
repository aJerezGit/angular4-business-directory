import {Component} from '@angular/core';
import { AutorizacionService } from '../services/autorizacion.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})

export class LoginComponent {
    loginObject: any = {};

    constructor(private autorizacionService: AutorizacionService) {
        
    }
    login(){
        this.autorizacionService.login(this.loginObject.email, this.loginObject.password);
    }

    facebookLogin(){
        this.autorizacionService.facebookLogin();
    }
}
