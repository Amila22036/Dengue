import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-aside-panal',
  templateUrl: './aside-panal.component.html',
  styleUrls: ['./aside-panal.component.css']
})
export class AsidePanalComponent implements OnInit {

  constructor(  public authService: AuthService,
                private location : Location
              ) { }

  ngOnInit() {
  }

  logOut(){
    this.authService.doLogout()
    .then((res) => {
      this.location.back();
    }, (error) => {
      console.log("Logout error", error);
    });
  }

}
