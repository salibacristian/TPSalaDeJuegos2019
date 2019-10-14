import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../servicios/firebase.service';

@Component({
  selector: 'app-jugadores-listado',
  templateUrl: './jugadores-listado.component.html',
  styleUrls: ['./jugadores-listado.component.css']
})
export class JugadoresListadoComponent implements OnInit {

  listado:any;
  
    constructor(private firebaseService:FirebaseService) {      
    }
    

  ngOnInit() {
    this.TraerTodos();
  }

  async TraerTodos(){
    var querySnapshot  = await this.firebaseService.getUsers();
     this.listado = querySnapshot.docs.map(function(x){
        return x.data();
      });

    
  }
 
}
