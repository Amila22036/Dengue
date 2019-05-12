import { Component, OnInit } from '@angular/core';
import { ProjectService } from './shared/project.service';
@Component({
  selector: 'manage-projects',
  templateUrl: './manage-projects.component.html',
  styleUrls: ['./manage-projects.component.css'],
  providers:[ProjectService]
})
export class ManageProjectsComponent implements OnInit {

  constructor(private userService : ProjectService) { }

  ngOnInit() {
  }

}
