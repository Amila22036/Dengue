import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../shared/project.service';
import {NgForm,FormBuilder,FormGroup,Validators} from '@angular/forms';
import { MainUIService } from '../../../services/main-ui.service';
import { ProjectPanelComponentEnum } from '../../../shared/enums/mainUI.components.enums';


@Component({
  selector: 'project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css'],
 
})
export class ProjectFormComponent implements OnInit {

 
  private ProjectPanelComponentEnum;

  constructor(public projectService : ProjectService, public mainUIService:MainUIService) { 
    this.ProjectPanelComponentEnum = ProjectPanelComponentEnum;
  }

  ngOnInit() {
    this.projectService.getData();
    this.resetForm();
    
  }

  onSubmit(projectForm:NgForm){
    if(projectForm.value.$key == null)
    {
       this.projectService.insertUser(projectForm.value);
      //  this.toastr.success('Submitted Successfully','User Register');
    }
    else
    {
      this.projectService.updateUser(projectForm.value);
      // this.toastr.success('Updated Successfully','User Register');
    }
      this.resetForm(projectForm);
      
  }

  resetForm(projectForm?:NgForm){
    if(projectForm != null)
    projectForm.reset();
      this.projectService.selectedUser={
        $key:null,
        ticketName:'',
        ticketOwner: '',
        createDate : new Date(),
        discription: '',
        latitude: '',
        longtitude: ''
      }
  }

  backToProjectView(){
    this.mainUIService.projectContainer = ProjectPanelComponentEnum.PROJECT;

  }
}
