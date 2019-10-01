import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pierda-papel-tijera',
  templateUrl: './pierda-papel-tijera.component.html',
  styleUrls: ['./pierda-papel-tijera.component.css']
})
export class PierdaPapelTijeraComponent implements OnInit {
  opciones = [
    { valor: 1, src: '../../../assets/imagenes/piedra.jpg' },
    { valor: 2, src: '../../../assets/imagenes/papel.jpg' },
    { valor: 3, src: '../../../assets/imagenes/tijera.png' }
  ];
  eleccion = null;
  eleccionMaquina = null;
  results = [
    [null, 0, 1],
    [1, null, 0],
    [0, 1, null]
  ];
  resultado = null;

  constructor() { }

  ngOnInit() {
  }

  elegir(opcion) {
    this.eleccion = opcion;
    this.eleccionMaquina = null;
  }

  jugar() {
    let random = Math.floor(Math.random() * 3) + 1;
    this.eleccionMaquina = this.opciones[random - 1];

    this.resultado = this.results[this.eleccion.valor - 1][random - 1];

  }

  estaSeleccionada(opcion) {
    return this.eleccion && this.eleccion.valor == opcion.valor;
  }

  getResultadoStr() {
    let rv = '';
    switch (this.resultado) {
      case 1:
        rv = 'GANASTE!';
        break;
      case 0:
        rv = 'PERDISTE';
        break;
      case null:
        rv = 'EMPATE';
        break;
    }
    return rv;
  }

}
