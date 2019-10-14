import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FirebaseService} from "../../servicios/firebase.service";
import { Usuario } from "../../clases/usuario";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor( private firebaseService: FirebaseService) { }

  user: Usuario = new Usuario('','','','');

  ngOnInit() {
  }

  Register(){
    this.firebaseService.register(this.user);
  }

}
