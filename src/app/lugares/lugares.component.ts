import {Component} from '@angular/core';
import { LugaresService } from '../services/lugares.service';
import {trigger, state, style, transition, animate} from '@angular/animations';

@Component({
    selector: 'app-lugares',
    templateUrl: './lugares.component.html',
    animations: [
      trigger('contenedorAnimable', [
        state('inicial', style({
          opacity: 0,
          backgroundColor: 'green',
          transform: 'rotate3d(0,0,0,0deg)'
        })),
        state('final', style({
          opacity: 1,
          backgroundColor: 'yellow',
          transform: 'rotate3d(5,10,20,30deg)'
        })),
        transition('inicial => final', animate(2000)),
        transition('final => inicial', animate(1000))
      ])
    ]
})

export class LugaresComponent {
  title = 'PlatziSquare';
  state = 'final';
  
  lat:number = 4.747245;
  lng:number = -74.1186375;
  lugares : Array<Object>;

  animar() {
    this.state = (this.state === 'final') ? 'inicial' : 'final';
  }

  animacionInicia(e) {
    console.log("Iniciado");
    console.log(e);
  }
  animacionTermina(e) {
    console.log("Terminado");
    console.log(e);
  }
  constructor(private lugaresService: LugaresService){
    // lugaresService.getLugares().valueChanges().subscribe((lugares) => {
      lugaresService.getLugares().subscribe((lugares) => {
      // debugger;
      const me = this;
      this.lugares =Object.keys(lugares).map(function (key) {return lugares[key]});
        this.state = 'final';
    },
    error => {
      console.log(error);
      alert('Tenemos algo de dificultades, disculpe las molestias. Error: ' + error.statusText);
    });
  }
}
