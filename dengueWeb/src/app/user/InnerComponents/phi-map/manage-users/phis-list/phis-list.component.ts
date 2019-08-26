import { Component, OnInit } from '@angular/core';
import {UsersService} from '../shared/users.service';
import { Phi } from '../shared/user.model';
import { element } from 'protractor';
// import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'phis-list',
  templateUrl: './phis-list.component.html',
  styleUrls: ['./phis-list.component.css'],

})
export class PhisListComponent implements OnInit {
  
    phiList : Phi[];
    p: number = 1;
    term='';
    dtOptions: DataTables.Settings = {};
  constructor(public userService: UsersService) { }

  ngOnInit() {
    var x= this.userService.getData();
    x.snapshotChanges().subscribe(item =>{
      this.phiList=[];
      item.forEach(element =>{
        var y=element.payload.toJSON();
        y["$key"] =element.key;
        this.phiList.push(y as  Phi);
      })
    })
  }

  onEdit(phi: Phi){
    this.userService.selectedUser= Object.assign({},phi);
      console.log(phi);
  }

  onDelete(key : string){
    if(confirm('Do you really want to delete this record?')==true)
    {
      this.userService.deleteUser(key);
      // this.toastr.warning("Deleted successfully","User records");
    }
  }

}
