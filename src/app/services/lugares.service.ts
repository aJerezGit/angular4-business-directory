import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AutorizacionService } from "./autorizacion.service";

@Injectable()

export class LugaresService {
    API_ENDPOINT = "https://angular4test-32d9e.firebaseio.com";
    lugares:any = [
        {id: 1, plan: 'pagado',cercania: 1, distancia: 1, active: true, nombre:'Florería la Gardenia', description: 'Descripcion de este establecimiento, Mas adelante tendremos mas informacion'},
        {id: 2, plan: 'gratuito',cercania: 2, distancia: 6, active: true, nombre:'Donas la pasadita', description: 'Descripcion de este establecimiento, Mas adelante tendremos mas informacion'},
        {id: 3, plan: 'gratuito',cercania: 2, distancia: 5, active: true, nombre:'Veterinaria Huellitas Felices', description: 'Descripcion de este establecimiento, Mas adelante tendremos mas informacion'},
        {id: 4, plan: 'pagado',cercania: 3, distancia: 30, active: false, nombre:'Sushi Suhiroll', description: 'Descripcion de este establecimiento, Mas adelante tendremos mas informacion'},
        {id: 5, plan: 'gratuito',cercania: 1, distancia: 1.8, active: true, nombre:'Hotel la Gracia', description: 'Descripcion de este establecimiento, Mas adelante tendremos mas informacion'},
        {id: 6, plan: 'gratuito',cercania: 3, distancia: 5.5, active: false, nombre:'Zapatería el Clavo', description: 'Descripcion de este establecimiento, Mas adelante tendremos mas informacion'}
      ];
    
      public getLugares() {
        // return this.afDB.list('lugares/');
        
        return this.Http.get(this.API_ENDPOINT+'/.json?auth=' + this.autorizacionService.tokenId)
        .map((resultado) => {
             var data = resultado['lugares'];
            return data;
        });
    }

    constructor(private afDB: AngularFireDatabase, private autorizacionService: AutorizacionService, private Http: HttpClient) {

    }

    public buscarLugar(id) {
        return this.lugares.filter((lugar) => {
            return lugar.id == id
        })[0] || null;
    }

    public guardarLugar(lugar) {
        // this.afDB.database.ref('lugares/'+lugar.id).set(lugar);
        const headers = new HttpHeaders({"Content-type":"application/json"});
        return this.Http.post(this.API_ENDPOINT+'/lugares.json', 
        lugar, 
        {headers: headers}).subscribe();
    }
    public editarLugar(lugar) {
        this.afDB.database.ref('lugares/'+lugar.id).set(lugar);
    }

    public obtenerGeoData(direccion) {
        // 'https://maps.googleapis.com/maps/api/geocode/json?key=TU_API_KEY_MAPS&address='+direccion);
        // AIzaSyDHU6acrf8BNzdUi9qlsjyY9tuXkwd3r_I
        // return this.Http.get('https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDHU6acrf8BNzdUi9qlsjyY9tuXkwd3r_I&address='+direccion);
        return this.Http.get('https://maps.googleapis.com/maps/api/geocode/json?key='+ this.autorizacionService.tokenId +'&address='+direccion);
    }

    public getLugar(id) {
        return this.afDB.object('lugares/'+id);
    }
}

