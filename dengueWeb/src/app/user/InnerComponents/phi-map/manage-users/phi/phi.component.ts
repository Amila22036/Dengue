import { Component, OnInit } from '@angular/core';
import {UsersService} from '../shared/users.service';
import {NgForm,FormBuilder,FormGroup,Validators} from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'phi',
  templateUrl: './phi.component.html',
  styleUrls: ['./phi.component.css'],
 
})
export class PhiComponent implements OnInit {

  constructor(public userService : UsersService) { }

  ngOnInit() {
    this.userService.getData();
    this.resetForm();
    
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
