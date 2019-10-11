import { Injectable } from '@angular/core';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
import {firebaseConfig} from "../../environments/environment";

firebase.initializeApp(firebaseConfig);

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

 import { JwtHelper } from "angular2-jwt";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor() { }

  isAuthenticated(){
    let jwtHelper: JwtHelper = new JwtHelper();
    let token = localStorage.getItem("token");
    return token && !jwtHelper.isTokenExpired(token)

  }

  // setUser(user){
  //   var body = {cliente : user};
  //   return this.http.post('http://192.168.2.85:3003/clientes',body);
  // }

  // testGet(){
  //   return this.http.get('http://192.168.2.85:3003/clientes');
  // }

  login(user, pass){
    // var body = {cliente : user};
    // return this.http.post('http://192.168.2.85:3003/login',body);
    firebase.auth().signInWithEmailAndPassword(user, pass)
    .then(function(res) {
      console.log(res); 
      res.user.getIdToken()
      .then(function(token){
        localStorage.setItem('token', token);
      });
    
  })
    .catch(function(error) {
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

    logout(){
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
  }

}
