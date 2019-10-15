import { Injectable } from '@angular/core';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
import { firebaseConfig } from "../../environments/environment";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Usuario } from "../clases/usuario";

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

import { JwtHelper } from "angular2-jwt";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  user = null;

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private router: Router) { }

  isAuthenticated() {
    let token = localStorage.getItem("token");
    return token && !this.jwtHelper.isTokenExpired(token);

  }

  async getCurrentUser() {

  }


  register(usuario: Usuario) {
    var router = this.router;
    var addUser = this.addUser;
    firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.clave)
      .then(function (res) {
        usuario.id = res.user.uid;
        addUser(usuario);
        res.user.getIdToken()
          .then(function (token) {
            localStorage.setItem('token', token);
            router.navigate(['/']);
          });
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
  }

  login(user, pass) {
    var router = this.router;
    firebase.auth().signInWithEmailAndPassword(user, pass)
      .then(function (res) {
        console.log(res);
        res.user.getIdToken()
          .then(function (token) {
            localStorage.setItem('token', token);
            router.navigate(['/']);
          });

      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
  }

  logout() {
    localStorage.removeItem('token');
  }

  addUser(user: Usuario) {
    var db = firebase.firestore();
    db.collection("usuarios").add({
      nombre: user.nombre,
      email: user.email,
      id: user.id
    })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }

  async saveResult(juego, gano) {
    firebase.auth().onAuthStateChanged(async user => {
      var db = firebase.firestore();
      let resultados = db.collection('resultados')
      let activeRef = await resultados
        .where('usuarioId', '==', user.uid)
        .where('juego', '==', juego)
        .get();

      if (activeRef.empty) {
        //add
        db.collection("resultados").add({
          usuarioId: user.uid,
          juego: juego,
          victorias: gano ? 1 : 0,
          derrotas: gano ? 0 : 1
        });
      }
      else {
        //update
        activeRef.docs.forEach(function (doc) {
          let victorias = doc.data().victorias + (gano ? 1 : 0);
          let derrotas = doc.data().derrotas + (gano ? 0 : 1);
          db.collection("resultados").doc(doc.id)
            .update({ victorias: victorias, derrotas: derrotas });
        });
      }
    });
  }

  async getUsers() {
    // return await db.collection("usuarios").get();
    let usrsRef = await db.collection('usuarios').get();
    return usrsRef;
    // for(let u of usrsRef.docs) {
    //     console.log(u.id, u.data())
    // } 
  }

}
