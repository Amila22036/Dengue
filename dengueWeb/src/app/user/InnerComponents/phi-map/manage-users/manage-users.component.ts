import { Component, OnInit } from '@angular/core';
import {UsersService} from './shared/users.service';
@Component({
  selector: 'manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css'],
  providers:[UsersService]
})
export class ManageUsersComponent implements OnInit {

  constructor(private userService : UsersService) { }

  ngOnInit() {
  }

}
