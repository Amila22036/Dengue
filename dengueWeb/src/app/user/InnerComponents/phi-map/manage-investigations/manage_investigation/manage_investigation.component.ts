import { Component, OnInit } from '@angular/core';
import { ManageInvestigationService } from '../shared/manage_investigation.service';
import {NgForm,FormBuilder,FormGroup,Validators} from '@angular/forms';
import { FullPanelComponentEnum } from '../../../../../shared/enums/mainUI.components.enums';
import { MainUIService } from '../../../../../services/main-ui.service';
import { AreasService } from '../../manage-areas/shared/areas.service';
import { UsersService } from '../../manage-users/shared/users.service';
import { Area} from '../../manage-areas/shared/area.model';
import { Phi } from '../../manage-users/shared/user.model';

@Component({
  selector: 'manage_investigation',
  templateUrl: './manage_investigation.component.html',
  styleUrls: ['./manage_investigation.component.css'],
 
})
export class ManageInvestigationComponent implements OnInit {
  areaList = [];
  phiList=[]
  constructor(public manageInvestigationService : ManageInvestigationService,
    public mainUIService:MainUIService, public areasService:AreasService, public userService:UsersService ) { 
      this.manageInvestigationService.getData();


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

  onSubmit(userForm:NgForm ){
    if(userForm.value.$key == null)
    {
       this.manageInvestigationService.insertUser(userForm.value);
      //  this.toastr.success('Submitted Successfully','User Register');
    }
    else
    {
      this.manageInvestigationService.updateUser(userForm.value);
      // this.toastr.success('Updated Successfully','User Register');
    }
      this.resetForm(userForm);
      
  }

  resetForm(userForm?:NgForm){
    if(userForm != null)
      userForm.reset();
      this.manageInvestigationService.selectedUser={
        $key:null,
        area:'',
        name:'',
        assigned_date:'',
        assigned_PHI: '',
        start_date: '',
        end_date: '',
        status: '',
        description:''
      }
  }

  backToInvestigationSites(){
    this.mainUIService.fullContainer = FullPanelComponentEnum.INVESTIGATION
  }

}
