import { Injectable } from '@angular/core';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
import {firebaseConfig} from "../../environments/environment";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

firebase.initializeApp(firebaseConfig);

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

 import { JwtHelper } from "angular2-jwt";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private router: Router) { }

  isAuthenticated(){    
    let token = localStorage.getItem("token");
    return token && !this.jwtHelper.isTokenExpired(token);

  }

  getUserName(){
    let token = localStorage.getItem("token");
    var u = this.jwtHelper.decodeToken(token);
    if(u)
      return u.email;
    else return '';
   
  }

  register(user, pass){
    var router = this.router;
    firebase.auth().createUserWithEmailAndPassword(user, pass)
    .then(function(res){
      console.log(res);
      res.user.getIdToken()
      .then(function(token){
        localStorage.setItem('token', token);
        router.navigate(['/']);
      });
    })    
    .catch(function(error) {   
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

  login(user, pass){
    var router = this.router;
    firebase.auth().signInWithEmailAndPassword(user, pass)
    .then(function(res) {
      console.log(res); 
      res.user.getIdToken()
      .then(function(token){
        localStorage.setItem('token', token);
        router.navigate(['/']);
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
      localStorage.removeItem('token');
  }

}
