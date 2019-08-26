import { Component, OnInit } from '@angular/core';
import { AreasService } from '../InnerComponents/phi-map/manage-areas/shared/areas.service';
import { Area } from '../InnerComponents/phi-map/manage-areas/shared/area.model';
import { ManageInvestigationService } from '../InnerComponents/phi-map/manage-investigations/shared/manage_investigation.service';
import { Investigation } from '../InnerComponents/phi-map/manage-investigations/shared/manage_investigation.model';

import {UsersService} from '../InnerComponents/phi-map/manage-users/shared/users.service';
import { Phi } from '../InnerComponents/phi-map/manage-users/shared/user.model';

@Component({
  selector: 'dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {
  areaList = [];
  investigationList = [];
  NoOfAreas = 0;
  NoOfInvestigations = 0;
  
  constructor(public areasService:AreasService , public manageInvestigationService:ManageInvestigationService) { }

  ngOnInit() {
    this.getAreas();
    this.getInvestigations();
  }


  getAreas(){
    var x= this.areasService.getData();
    x.snapshotChanges().subscribe(item =>{
      this.areaList=[];
      item.forEach(element =>{
        var y=element.payload.toJSON();
        y["$key"] =element.key;
        this.areaList.push(y as Area);
      })
      this.NoOfAreas = this.areaList.length;
    })
  }

  getInvestigations(){
    var x= this.manageInvestigationService.getData();
    x.snapshotChanges().subscribe(item =>{
      this.investigationList=[];
      item.forEach(element =>{
        var y=element.payload.toJSON();
        y["$key"] =element.key;
        this.investigationList.push(y as Investigation);
      })
      this.NoOfInvestigations = this.investigationList.length;
    })
  }
}
