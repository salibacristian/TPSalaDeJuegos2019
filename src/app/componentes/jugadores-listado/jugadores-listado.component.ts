import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-jugadores-listado',
  templateUrl: './jugadores-listado.component.html',
  styleUrls: ['./jugadores-listado.component.css']
})
export class JugadoresListadoComponent implements OnInit {

  listado:any
  
    // constructor(serviceJugadores:JugadoresService) {
    //   this.miJugadoresServicio = serviceJugadores;
      
    // }
    

  ngOnInit() {
  }

  // TraerTodos(){
  //   //alert("totos");
  //   this.miJugadoresServicio.traertodos('jugadores/','todos').then(data=>{
  //     //console.info("jugadores listado",(data));
  //     this.listado= data;

  //   })
  // }
 
}
