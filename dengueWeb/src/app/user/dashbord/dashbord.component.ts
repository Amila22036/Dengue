import { Component, OnInit , ViewChild, ElementRef} from '@angular/core';
import { AreasService } from '../InnerComponents/phi-map/manage-areas/shared/areas.service';
import { Area } from '../InnerComponents/phi-map/manage-areas/shared/area.model';
import { ManageInvestigationService } from '../InnerComponents/phi-map/manage-investigations/shared/manage_investigation.service';
import { Investigation } from '../InnerComponents/phi-map/manage-investigations/shared/manage_investigation.model';

import {UsersService} from '../InnerComponents/phi-map/manage-users/shared/users.service';
import { Phi } from '../InnerComponents/phi-map/manage-users/shared/user.model';
import { AngularFireDatabase,AngularFireList, QueryFn} from 'angularfire2/database';
import * as _ from 'lodash';
import * as Plotly from 'plotly.js';
import { FullPanelComponentEnum ,InvestigationStatus} from '../../shared/enums/mainUI.components.enums';

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
  filteredInvestigationList : any;
  area: string;
  //active filter rules
  filters = {};
  InvestigationStatus;
  @ViewChild('chart',{static:true}) el: ElementRef;

  constructor(public areasService:AreasService , public manageInvestigationService:ManageInvestigationService
    , private firebase:AngularFireDatabase) { 
      this.InvestigationStatus = InvestigationStatus;
    }

  ngOnInit() {
    this.getAreas();
    this.getInvestigations();
    this.basicChart();
  

  }

  basicChart() {
    const element = this.el.nativeElement

    const data = [{
      x: ['2019-08-31 22:23:00', '2019-09-01 22:23:00', '2019-09-08 22:23:00', '2019-09-15 22:23:00', '2019-09-22 22:23:00'],
      y: [1, 4, 3, 16, 10]
    }]

    const style = {
      margin: { t: 0 }
    }

    Plotly.plot( element, data, style )
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
      this.area = "Select an area";
      console.log("area ",this.area)
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
      this.filteredInvestigationList = this.investigationList;
    })
  }

  getFilteredArea(){
    var x= this.manageInvestigationService.getData();
    x.snapshotChanges().subscribe( investigation =>{
      this.investigationList = investigation
    })
  }

  private applyFilters() {
    this.filteredInvestigationList = _.filter(this.investigationList, _.conforms(this.filters) )
  }

  filterExact(property: string, rule: any) {
    this.filters[property] = val => val == rule
    this.applyFilters()
  }

  removeFilter(property: string) {
    delete this.filters[property]
    this[property] = null
    this.applyFilters()
  }


}
