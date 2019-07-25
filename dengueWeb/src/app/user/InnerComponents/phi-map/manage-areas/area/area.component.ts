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
    this.areasService.isgpxUploaded = false;
  }

  ngAfterViewInit(){ 
  }

  Map(){
    // this.isMapShow = !this.isMapShow;
    this.mapService.isMapShowOnArea = !this.mapService.isMapShowOnArea;
    if(this.mapService.isMapShowOnArea == true)
    {
      setTimeout(() => {
        this.mapService.drawRoute();
      }, 1000);
     
    }
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

  resetForm(areaForm?:NgForm){
    if(areaForm != null)
      areaForm.reset();
      this.areasService.selectedArea={
        $key:null,
        AreaName:'',                                  
        AreaCode:'',
        GpxName:''
      }
  }

}
