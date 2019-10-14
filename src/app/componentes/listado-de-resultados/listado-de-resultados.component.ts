
import { Component, OnInit , Input, EventEmitter} from '@angular/core';
import {FirebaseService} from "../../servicios/firebase.service";

@Component({
  selector: 'app-listado-de-resultados',
  templateUrl: './listado-de-resultados.component.html',
  styleUrls: ['./listado-de-resultados.component.css']
})
export class ListadoDeResultadosComponent implements OnInit {

  constructor(private firebaseService: FirebaseService) {
   }

  ngOnInit() {
    //poner un loading e ir a buscar los resultados
    this.firebaseService.getUsers();
  }

}
