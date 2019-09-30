import { Component, OnInit } from '@angular/core';
import { faTools, faUsers } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
 public status: any = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
  faTools = faTools;
  faUsers = faUsers;
  constructor() {  }

  ngOnInit() {
  }

 

}
