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
    // dtOptions: any = {};
    dtTrigger: Subject<any> = new Subject();
    @ViewChild(DataTableDirective,{static: false})
    dtElement: DataTableDirective;


 
  constructor(public userService: UsersService) { }

  ngOnInit() {
    $.fn.dataTable.ext.errMode = 'throw';
    this.getInitPhiList();

  }
  

  getInitPhiList(){
    this.getPhiList().then(res=>{
      // this.dtTrigger.next();
      this.userService.dtTrigger.next();
    })
  }

  getPhiList(){
    return new Promise(resolve =>{
      var x= this.userService.getData();
      this.userService.phiFinalList=[];
      x.snapshotChanges().subscribe(item =>{     
        item.forEach(element =>{
          var y=element.payload.toJSON();
          y["$key"] =element.key;
          this.userService.phiFinalList.push(y as  Phi);
        })
        resolve();
      })
    })

  }


  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  // reloadTable(){
  //   $.fn.dataTable.ext.errMode = 'throw';
  //   setTimeout(() => {
  //     var table = $('#test').DataTable();    
  //     table.clear();
  //     this.phiList.forEach(phi =>{
  //       table.row.add(phi);
  //     })
  //   }, 1000);
 
  // }

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
              this.userService.dtTrigger.next();
      })
    });
  }

  deletePHI(key){
    this.userService.phiFinalList = [];
    this.userService.dtTrigger.next();
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
            this.rerender();    
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
