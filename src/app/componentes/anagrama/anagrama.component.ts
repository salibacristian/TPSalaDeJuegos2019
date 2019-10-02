import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-anagrama',
  templateUrl: './anagrama.component.html',
  styleUrls: ['./anagrama.component.css']
})
export class AnagramaComponent implements OnInit {

  palabra = [
    { letraElegida: '', letraCorrecta: 'j' },
    { letraElegida: '', letraCorrecta: 'u' },
    { letraElegida: '', letraCorrecta: 'g' },
    { letraElegida: '', letraCorrecta: 'a' },
    { letraElegida: '', letraCorrecta: 'r' }
  ];
  letras = [];

  desordenarPalabra() {

    do {
      console.log('entro');
      this.letras = this.palabra
        .map(function (item) { return item.letraCorrecta })
        .sort(function () { return Math.random() - 0.5 });

    } while (this.tieneMismoOrden())

  }

  tieneMismoOrden() {

    for (let index = 0; index < this.letras.length; index++) {


      this.palabra[index].letraElegida = this.letras[index];

    }
    let gana = this.gana();
    this.palabra.forEach(item => {
      item.letraElegida = '';
    });
    return gana;
  }

  constructor() { }

  ngOnInit() {
    this.desordenarPalabra();
  }

  gana() {
    return !this.palabra.some(function (item) {
      return item.letraCorrecta != item.letraElegida;
    });

  }
  elegirLetra(letra, checked) {

    for (let index = 0; index < this.palabra.length; index++) {
      if (checked && this.palabra[index].letraElegida == '') {
        this.palabra[index].letraElegida = letra;
        break;
      }
      else if (!checked && this.palabra[index].letraElegida == letra) {
        this.palabra[index].letraElegida = '';
        break;
      }
    }

    if (this.gana()) {
      alert('GANASTE!');//TODO anotar puntos y traer la siguiente palabra
    }

  }

}
