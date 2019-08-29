import { Component, OnInit } from '@angular/core';
import {UsersService} from '../shared/users.service';
import { Phi } from '../shared/user.model';
import { element } from 'protractor';
// import {ToastrService} from 'ngx-toastr';
import { Subject } from 'rxjs'


@Component({
  selector: 'phis-list',
  templateUrl: './phis-list.component.html',
  styleUrls: ['./phis-list.component.css'],

})
export class PhisListComponent implements OnInit {
  dtTrigger: Subject<any> = new Subject();

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
      this.dtTrigger.next()
    })

  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  reloadTable(){
    $.fn.dataTable.ext.errMode = 'throw';
    setTimeout(() => {
      var table = $('#test').DataTable();    
      table.clear();
      this.phiList.forEach(phi =>{
        table.row.add(phi);
      })
    }, 1000);
 
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
