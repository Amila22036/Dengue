import { Component, OnInit,HostListener } from '@angular/core';
import { AreasService } from '../shared/areas.service';
import {NgForm,FormBuilder,FormGroup,Validators} from '@angular/forms';
import { MapService } from '../../../../../services/map/map.service';

@Component({
  selector: 'area-map',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css'],
 
})
export class AreaComponent implements OnInit {

  constructor(public areasService : AreasService, public mapService:MapService) { }

  ngOnInit() {
    this.areasService.getData();
    this.resetForm();
    
  }

  ngAfterViewInit(){
    this.mapService.drawRoute();
  }



  onSubmit(userForm:NgForm){
    if(userForm.value.$key == null)
    {
       this.areasService.insertUser(userForm.value);
      //  this.toastr.success('Submitted Successfully','User Register');
    }
    else
    {
      this.areasService.updateUser(userForm.value);
      // this.toastr.success('Updated Successfully','User Register');
    }
      this.resetForm(userForm);
      
  }

  resetForm(userForm?:NgForm){
    if(userForm != null)
      userForm.reset();
      this.areasService.selectedUser={
        $key:null,
        FirstName:'',
        LastName:'',
        Email:'',
        PhoneNumber:0
      }
  }

}
