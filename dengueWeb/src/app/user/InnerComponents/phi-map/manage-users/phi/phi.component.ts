import { Component, OnInit ,ViewChild} from '@angular/core';
import {UsersService} from '../shared/users.service';
import {NgForm,FormBuilder,FormGroup,Validators} from '@angular/forms';
import swal from 'sweetalert2';
import { Phi } from '../shared/user.model';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'phi',
  templateUrl: './phi.component.html',
  styleUrls: ['./phi.component.css'],
 
})
export class PhiComponent implements OnInit {
  // phiList : Phi[];
  @ViewChild(DataTableDirective,{static: false})
  dtElement: DataTableDirective;
  constructor(public userService : UsersService) { }

  ngOnInit() {
    this.userService.getData();
    this.resetForm();
    
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

  onSubmit(userForm:NgForm){
    if(userForm.value.$key == null)
    {
       this.userService.insertUser(userForm.value).then(
         res=>{
          swal.fire(
            'Saved !',
            `Your data saved successfully`,
            'success'
          )
          this.userService.dtTrigger.next();
         }
       ).catch(err =>{
        swal.fire(
          'Failed!',
          `Something Went Wrong !`,
          'error'
        )
       })
      //  this.toastr.success('Submitted Successfully','User Register');
    }
    else
    {
      this.userService.updateUser(userForm.value).then(
        res=>{
          swal.fire(
            'Updated !',
            `Your data updated successfully`,
            'success'
          )
          this.userService.dtTrigger.next();
        }
      ).catch(err=>{
        swal.fire(
          'Failed!',
          `Something Went Wrong !`,
          'error'
        )
      })
      // this.toastr.success('Updated Successfully','User Register');
    }
      this.resetForm(userForm);
      
  }

  resetForm(userForm?:NgForm){
    if(userForm != null)
      userForm.reset();
      this.userService.selectedUser={
        $key:null,
        FirstName:'',
        LastName:'',
        Email:'',
        PhoneNumber:0,
        Age:0,
        Password:'',
        Confirm_password:''

      }
  }

}
