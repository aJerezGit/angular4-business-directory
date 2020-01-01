import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';
import { Router } from "@angular/router";

@Injectable()

export class AutorizacionService {
    constructor(private angularFireAuth: AngularFireAuth, private router: Router) {
        this.isLogged();
    }

    tokenId: string = '';

    public facebookLogin() {
        this.angularFireAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then((result) => {
            alert('Usuario loggeado con FaceBook');
            this.router.navigate(['lugares']);
            console.log(result);
        }).catch((error) => {
            alert('A ocurrido un error');
            console.log(error)
        });
    }

    public login = (email, password) => {
        this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
        .then((response) => {
            this.obtenerToken();
            alert('Usuario Loggeado con exito!');
            setTimeout(() => {
                this.router.navigate(['lugares']);    
            }, 1000);            
        }).catch((error) => {
            alert('Un error ha ocurrido');
            console.log(error);
        })
    }

    public obtenerToken = () => {
        this.angularFireAuth.auth.currentUser.getIdToken(true)
            .then((response) => {
                this.tokenId = response;
            }).catch((error) => {
                alert('Un error ha ocurrido');
                console.log(error);
            });
    }
    public registro = (email, password) => {
        this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
        .then((response) => {
            alert('Usuario Registrado con exito!');
        }).catch((error) => {
            alert('Un error ha ocurrido');
            console.log(error);
        })
    }

    public isLogged(){
        return this.angularFireAuth.authState;
    }

    public getUserDetail() {
        return this.angularFireAuth.auth.currentUser.email;
    }

    public logout(){
        this.angularFireAuth.auth.signOut();
        alert('Sesion cerrada');
        this.router.navigate(['lugares']);
    }
}