import { Component, OnInit } from '@angular/core';
import { faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FirebaseService } from "../../servicios/firebase.service";
import { JwtHelper } from "angular2-jwt";
import * as firebase from "firebase/app";


@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {
  faSignOutAlt = faSignOutAlt;
  faUser = faUser;
  user = null;
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private firebaseService: FirebaseService) { }


  logout() {
    this.firebaseService.logout();
  }

  async getUser(uid) {
  
    var db = firebase.firestore();
    let usrRef = db.collection('usuarios')
    let activeRef = await usrRef.where('id', '==', uid).get();
    for (let doc of activeRef.docs) {
      this.user = doc.data();
    }
  }

  async getCurrentUser(){
    firebase.auth().onAuthStateChanged(async user => {
      this.getUser(user.uid)
    });
    
  }

  ngOnInit() {
    this.getCurrentUser();
      
  }

}
