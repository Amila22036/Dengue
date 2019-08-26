import { Component, OnInit } from '@angular/core';
import { MainUIService } from '../services/main-ui.service';
import { ProjectPanelComponentEnum ,FullPanelComponentEnum} from '../shared/enums/mainUI.components.enums';
import { ProjectService } from '../project/manage-project/shared/project.service';
import { Project } from '../project/manage-project/shared/project.model';
import { RouterModule, Routes ,Router} from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  private ProjectPanelComponentEnum
  projectList : Project[];

  constructor(public mainUIService:MainUIService, public projectService :ProjectService,
              public route:Router ) {
    this.ProjectPanelComponentEnum = ProjectPanelComponentEnum;
   }

  ngOnInit() {
    var x= this.projectService.getData();
    x.snapshotChanges().subscribe(item =>{
      this.projectList=[];
      item.forEach(element =>{
        var y=element.payload.toJSON();
        y["$key"] =element.key;
        this.projectList.push(y as Project);
      })
    })
  }

  createProject(){
    this.mainUIService.projectContainer = ProjectPanelComponentEnum.MANAGE_PROJECTS
  }

  select(project: Project){
    let projectSession = {
      "project_id": project.$key,
      "project_name":project.ticketName,
      "project_owner":project.ticketOwner
    }

    let url =  encodeURIComponent(btoa(JSON.stringify(projectSession)))
    this.mainUIService.fullContainer = FullPanelComponentEnum.DASHBORD;
    this.route.navigateByUrl(`user/${url}`)
  }

}
