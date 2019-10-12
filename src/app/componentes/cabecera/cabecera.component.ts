import { Component, OnInit } from '@angular/core';
import { faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import {FirebaseService} from "../../servicios/firebase.service";

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {
  faSignOutAlt = faSignOutAlt;
  faUser = faUser;
  user = { userName: 'Cristian' }
  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    //obtener el nombre de usuario
  }
  logout(){
    this.firebaseService.logout();
  }
}
