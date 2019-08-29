import { Component, OnInit } from '@angular/core';
import { ManageInvestigationService } from '../shared/manage_investigation.service';
import {NgForm,FormBuilder,FormGroup,Validators} from '@angular/forms';
import { FullPanelComponentEnum ,InvestigationStatus } from '../../../../../shared/enums/mainUI.components.enums';
import { MainUIService } from '../../../../../services/main-ui.service';
import { AreasService } from '../../manage-areas/shared/areas.service';
import { UsersService } from '../../manage-users/shared/users.service';
import { Area} from '../../manage-areas/shared/area.model';
import { Phi } from '../../manage-users/shared/user.model';
import { NgxSmartModalService } from 'ngx-smart-modal';
import swal from 'sweetalert2';

@Component({
  selector: 'manage_investigation',
  templateUrl: './manage_investigation.component.html',
  styleUrls: ['./manage_investigation.component.css'],
 
})
export class ManageInvestigationComponent implements OnInit {
  areaList = [];
  phiList=[];
  private InvestigationStatus;
  constructor(public manageInvestigationService : ManageInvestigationService,
    public mainUIService:MainUIService, public areasService:AreasService, public userService:UsersService,
    public ngxSmartModalService:NgxSmartModalService ) { 
      this.manageInvestigationService.getData();

      this.InvestigationStatus = InvestigationStatus;
    }
  ngOnInit() {
    var x= this.areasService.getData();
    x.snapshotChanges().subscribe(item =>{
      this.areaList=[];
      item.forEach(element =>{
        var y=element.payload.toJSON();
        y["$key"] =element.key;
        this.areaList.push(y as Area);
      })
    })
    this.resetForm();

    var phi= this.userService.getData();
    phi.snapshotChanges().subscribe(item =>{
      this.phiList=[];
      item.forEach(element =>{
        var phiy=element.payload.toJSON();
        phiy["$key"] =element.key;
        this.phiList.push(phiy as  Phi);
      })
    })  
  }

  setSelectedGpx(userForm:NgForm){
    return new Promise(resolve =>{
      this.areaList.forEach(area =>{
        if(userForm.value.area == area.AreaName)
        {
          this.manageInvestigationService.selectedAreaGpx = area.GpxName;
          resolve();
        }
     })
    })
  }

  onSubmit(userForm:NgForm ){

  this.setSelectedGpx(userForm).then(
    res=>{
      if(userForm.value.$key == null)
      {
         this.manageInvestigationService.insertInvestigation(userForm.value).then(
           res=>{
            swal.fire(
              'Added!',
              'Your data saved successfully',
              'success'
            )
            this.ngxSmartModalService.getModal('myModal').close();
           }         
         )
        //  this.toastr.success('Submitted Successfully','User Register');
        this.resetForm(userForm);
       
      }
      else
      {
        this.manageInvestigationService.updateInvestigation(userForm.value).then(
          res=>{
              // this.toastr.success('Updated Successfully','User Register');
          }
        )
        
      }
 
    }
  )    
  }


  test(){
    console.log(" test ", this.manageInvestigationService.selectedUser.status)
  }

  resetForm(userForm?:NgForm){
    if(userForm != null)
      userForm.reset();
      this.manageInvestigationService.selectedUser={
        $key:null,
        area: '',
        area_gpx_name:'',
        name:'',
        assigned_date:'',
        assigned_PHI: '',
        start_date: '',
        end_date: '',
        status: '',
        description:''
      }
  }

  setAreaGpxName(area)
  {
    console.log("Area ",area)
    this.manageInvestigationService.selectedAreaGpx = area.GpxName;
    console.log("gpx ",this.manageInvestigationService.selectedAreaGpx)
  }

  backToInvestigationSites(){
    this.mainUIService.fullContainer = FullPanelComponentEnum.INVESTIGATION
  }



}
