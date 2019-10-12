import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FirebaseService} from "../../servicios/firebase.service";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor( private firebaseService: FirebaseService) { }

  user = {email:'',password:''};
  ngOnInit() {
  }

  Register(){
    this.firebaseService.register(this.user.email, this.user.password);
  }

}
