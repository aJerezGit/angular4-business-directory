import {Component} from '@angular/core';
import { LugaresService } from '../services/lugares.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { FormControl } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { HttpClient } from '@angular/common/http';
import { debounceTime } from 'rxjs/operator/debounceTime';
import { switchMap, map } from 'rxjs/operators';

@Component({
    selector: 'app-crear',
    templateUrl: './crear.component.html'
})

export class CrearComponent {
    lugar: any = {};
    id: any = null;
    results$: Observable<any>;
    private searchField: FormControl;

    guardarLugar() {
        var direccion = this.lugar.direccion +
                        ',' + this.lugar.ciudad + 
                        ',' + this.lugar.pais;
        this.lugaresService.obtenerGeoData(direccion).subscribe((result: any) => {
            this.lugar.lat = result.results[0].geometry.location.lat;
            this.lugar.lng = result.results[0].geometry.location.lng;
            if(this.id != 'new') {
                this.lugaresService.editarLugar(this.lugar);
                alert('Negocio editado exitosamente');
            } else {
                this.lugar.id = Date.now();
            this.lugaresService.guardarLugar(this.lugar);
            alert('Negocio creado exitosamente');
            }           
            
            this.lugar = {};
        });  
        
    }

    seleccionarDireccion(direccion) {
        this.lugar.direccion = direccion.address_components[1].long_name+' '+direccion.address_components[0].long_name;
        this.lugar.ciudad = direccion.address_components[4].long_name;
        this.lugar.pais = direccion.address_components[6].long_name;
    }

    lat:number = 4.5545195;
    lng:number = -74.1378165;

    constructor(private lugaresService: LugaresService, private route: ActivatedRoute, private http: HttpClient) {
        this.id = this.route.snapshot.params['id'];
        if(this.id != 'new') {
            this.lugaresService.getLugar(this.id).valueChanges().subscribe((lugar) => {
                this.lugar = lugar;
            });
        }

        const URL = 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDHU6acrf8BNzdUi9qlsjyY9tuXkwd3r_I';
        this.searchField = new FormControl();
        this.results$ = this.searchField.valueChanges
        .pipe(
            // debounceTime(500)
            switchMap(query => this.http.get(`${URL}&address=${query}`))
            ,map((response: any) => {
                return response.results;
            })
        );
            
    }
}
