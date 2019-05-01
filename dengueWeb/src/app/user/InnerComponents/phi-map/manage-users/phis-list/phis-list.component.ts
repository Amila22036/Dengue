import { Component, OnInit } from '@angular/core';
import {UsersService} from '../shared/users.service';
import {User} from '../shared/user.model';
import { element } from 'protractor';
// import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'phis-list',
  templateUrl: './phis-list.component.html',
  styleUrls: ['./phis-list.component.css'],

})
export class PhisListComponent implements OnInit {
  
userList : User[];
p: number = 1;
term='';
  constructor(public userService: UsersService) { }

  ngOnInit() {
    var x= this.userService.getData();
    x.snapshotChanges().subscribe(item =>{
      this.userList=[];
      item.forEach(element =>{
        var y=element.payload.toJSON();
        y["$key"] =element.key;
        this.userList.push(y as User);
      })
    })
  }

  onEdit(user: User){
    this.userService.selectedUser= Object.assign({},user);
      console.log(user);
  }

  onDelete(key : string){
    if(confirm('Do you really want to delete this record?')==true)
    {
      this.userService.deleteUser(key);
      // this.toastr.warning("Deleted successfully","User records");
    }
  }

}
