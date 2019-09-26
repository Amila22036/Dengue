import { Component, OnInit, ViewChild  } from '@angular/core';
import {UsersService} from '../shared/users.service';
import { Phi } from '../shared/user.model';
import { element } from 'protractor';
// import {ToastrService} from 'ngx-toastr';
import { Subject } from 'rxjs'
import swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'phis-list',
  templateUrl: './phis-list.component.html',
  styleUrls: ['./phis-list.component.css'],

})
export class PhisListComponent implements OnInit {


    phiList : Phi[];
    p: number = 1;
    term='';
    dtOptions: any = {};
    dtTrigger: Subject<any> = new Subject();
    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;


 
  constructor(public userService: UsersService) { }

  ngOnInit() {
    $.fn.dataTable.ext.errMode = 'throw';


  }
  
  ngAfterViewInit(){
    this.rerender();
  }

  getPhiList(){
    return new Promise(resolve =>{
      var x= this.userService.getData();
      x.snapshotChanges().subscribe(item =>{
        this.phiList=[];
        item.forEach(element =>{
          var y=element.payload.toJSON();
          y["$key"] =element.key;
          this.phiList.push(y as  Phi);
        })
        // this.dtTrigger.next()
        resolve();
      })
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

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      this.getPhiList().then(res =>{
              // Call the dtTrigger to rerender again
              this.dtTrigger.next();
      })
    });
  }

  deletePHI(key){
    swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {       
        this.userService.deleteUser(key).then(res => {
            swal.fire(
              'Deleted!',
              'Your data has been deleted.',
              'success'
            )    
            this.dtTrigger.next();     
        }).catch( res =>{   
          swal.fire(
            'Failed!',
            `Something Went Wrong !`,
            'error'
          )
        })
      }
    })

  }

}
