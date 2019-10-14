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


  //   async getUser() {
  //     let usrRef = db.collection('usuarios')
  //     // let activeRef = await usrRef.where('active', '==', true).select().get();
  //     let activeRef = await usrRef.where("id", "==", this.user.uid).get();
  //     for (let user of activeRef.docs) {
  //         console.log(user.id);
  //         let tasksRef = await usrRef.doc(user.id).collection('usuarios').get();
  //         for(let task of tasksRef.docs) {
  //             console.log(task.id, task.data())
  //         } 
  //     }
  // }

  async getUser() {
    let token = localStorage.getItem('token');
    let userData = this.jwtHelper.decodeToken(token);
    var db = firebase.firestore();
    let usrRef = db.collection('usuarios')
    // let activeRef = await usrRef.where('id', '==', id).select().get();
    let activeRef = await usrRef.where('email', '==', userData.email).get();
    for (let user of activeRef.docs) {
      console.log(user);
    }
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
      id: user.id
    })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }

  getUsers() {
    db.collection("usuarios").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
      });
    });
  }

}
