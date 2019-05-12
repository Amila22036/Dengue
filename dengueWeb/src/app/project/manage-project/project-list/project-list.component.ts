import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../shared/project.service';
import {Project} from '../shared/project.model';
import { element } from 'protractor';
// import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],

})
export class ProjectListComponent implements OnInit {
  
projectList : Project[];
p: number = 1;
term='';
  constructor(public projectService: ProjectService) { }

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

  onEdit(project: Project){
    this.projectService.selectedUser= Object.assign({},project);
      console.log(project);
  }

  onDelete(key : string){
    if(confirm('Do you really want to delete this record?')==true)
    {
      this.projectService.deleteUser(key);
      // this.toastr.warning("Deleted successfully","User records");
    }
  }

}
