import { Component, OnInit } from '@angular/core';
import { ManageInvestigationService } from '../shared/manage_investigation.service';
import {NgForm,FormBuilder,FormGroup,Validators} from '@angular/forms';
import { FullPanelComponentEnum } from '../../../../../shared/enums/mainUI.components.enums';
import { MainUIService } from '../../../../../services/main-ui.service';


@Component({
  selector: 'manage_investigation',
  templateUrl: './manage_investigation.component.html',
  styleUrls: ['./manage_investigation.component.css'],
 
})
export class ManageInvestigationComponent implements OnInit {

  constructor(public manageInvestigationService : ManageInvestigationService,public mainUIService:MainUIService) { }

  ngOnInit() {
    this.manageInvestigationService.getData();
    this.resetForm();
    
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
        complainer:'',
        assigner:'',
        route:'',
        assigned_date:'',
        assigned_PHI: '',
        start_date: '',
        end_date: '',
        expected_day_to_start_date: '',
        description:'',
        feedback: ''
      }
  }

  backToInvestigationSites(){
    this.mainUIService.fullContainer = FullPanelComponentEnum.INVESTIGATION
  }

}
