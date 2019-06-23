import { Component, OnInit } from '@angular/core';
import { ManageInvestigationService } from '../shared/manage_investigation.service';
import {User} from '../shared/manage_investigation.model';
import { element } from 'protractor';
// import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'manage_investigation-list',
  templateUrl: './manage_investigation-list.component.html',
  styleUrls: ['./manage_investigation-list.component.css'],

})
export class ManageInvestigationListComponent implements OnInit {
  
userList : User[];
p: number = 1;
term='';
  constructor(public manageInvestigationService: ManageInvestigationService) { }

  ngOnInit() {
    var x= this.manageInvestigationService.getData();
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
    this.manageInvestigationService.selectedUser= Object.assign({},user);
      console.log(user);
  }

  onDelete(key : string){
    if(confirm('Do you really want to delete this record?')==true)
    {
      this.manageInvestigationService.deleteUser(key);
      // this.toastr.warning("Deleted successfully","User records");
    }
  }

}
