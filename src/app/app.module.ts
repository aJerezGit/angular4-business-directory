import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AgmCoreModule } from '@agm/core';
import {ResaltarDirective} from "./directives/resaltar.directive";
import { ContarClicksDirective } from './directives/contar-clicks.directive';
import {Routes, RouterModule} from "@angular/router";
import { DetalleComponent } from './detalle/detalle.component';
import { LugaresComponent } from './lugares/lugares.component';
import { ContactoComponent } from './contacto/contacto.component';
import { LugaresService } from './services/lugares.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { CrearComponent } from './crear/crear.component';
import { HttpClientModule } from '@angular/common/http';
import { LinkifystrPipe } from './pipes/linkifystr.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { AutorizacionService } from './services/autorizacion.service';
import { MyGuard } from './services/my-guard.service';

export const firebaseConfig = {
  apiKey: "AIzaSyC9Eg9ULvTXgIC4EDWVg3q3KgOSKm-Ebh0",
  authDomain: "angular4test-32d9e.firebaseapp.com",
  databaseURL: "https://angular4test-32d9e.firebaseio.com",
  projectId: "angular4test-32d9e",
  storageBucket: "angular4test-32d9e.appspot.com",
  messagingSenderId: "772725438415",
  appId: "1:772725438415:web:c0218768752afdafde04ba"
};

const appRoutes: Routes = [
  {path: '', component: LugaresComponent},
  {path: 'lugares', component: LugaresComponent},
  {path: 'contacto', component: ContactoComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  // {path: 'crear/:id', component: CrearComponent, canActivate:[MyGuard]},
  {path: 'crear/:id', component: CrearComponent},
  {path: 'detalle/:id', component: DetalleComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    ResaltarDirective,
    ContarClicksDirective,
    DetalleComponent,
    LugaresComponent,
    ContactoComponent,
    CrearComponent,
    LinkifystrPipe,
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
      FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDHU6acrf8BNzdUi9qlsjyY9tuXkwd3r_I'
    }),
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [LugaresService, AutorizacionService, AngularFireAuth, MyGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
