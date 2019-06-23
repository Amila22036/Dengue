import { Component, OnInit } from '@angular/core';
import { AreasService } from '../shared/areas.service';
import {User} from '../shared/area.model';
import { element } from 'protractor';
// import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.css'],

})
export class AreasListComponent implements OnInit {
  
userList : User[];
p: number = 1;
term='';
  constructor(public areasService: AreasService ) { }

  ngOnInit() {
    var x= this.areasService.getData();
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
    this.areasService.selectedUser= Object.assign({},user);
      console.log(user);
  }

  onDelete(key : string){
    if(confirm('Do you really want to delete this record?')==true)
    {
      this.areasService.deleteUser(key);
      // this.toastr.warning("Deleted successfully","User records");
    }
  }

}
