import { Component, OnInit,HostListener } from '@angular/core';
import { AreasService } from '../shared/areas.service';
import {NgForm,FormBuilder,FormGroup,Validators} from '@angular/forms';
import { MapService } from '../../../../../services/map/map.service';
import swal from 'sweetalert2';

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

  onSubmit(areaForm:NgForm){
    if(areaForm.value.$key == null)
    {
       this.areasService.insertArea(areaForm.value).then(
         res=>{
          swal.fire(
            'Saved!',
            'Your data has been saved.',
            'success'
          ) 
          this.areasService.dtTrigger.next();
         }
       )
      //  this.toastr.success('Submitted Successfully','User Register');
    }
    else
    {
      this.areasService.updateUser(areaForm.value);
      // this.toastr.success('Updated Successfully','User Register');
    }
      this.resetForm(areaForm);
      this.mapService.map2.remove();
      this.mapService.isMapShowOnArea = false;
      swal.fire(
        'Saved!',
        'Your data has been saved.',
        'success'
      ) 
      
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
