import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../servicios/firebase.service';

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
  alert = {message:'',type:'', action: ''};
  showAlert = false;

  constructor(private firebaseService: FirebaseService){}

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
      this.alert.message = 'Bien hecho!';
      this.alert.type = 'success';
      this.alert.action = 'continuar';
      this.firebaseService.saveResult('ANAGRAMA', true);
      this.showAlert = true;
    }
    else if(!this.palabra.some(function (item) {
      return item.letraElegida == '';
    })){
      this.alert.message = 'Intentalo de nuevo';
      this.alert.type = 'danger';
      this.alert.action = 'reintentar';
      this.firebaseService.saveResult('ANAGRAMA', false);
      this.showAlert = true;

    }

  }

  continue(){
    this.showAlert = false;
    if(this.alert.action == 'continuar'){
      //vacio
    }
    else{
      //siguiente palabra
    }

  }

}
