import { Component, OnInit } from '@angular/core';
import { IinvestigationSitesModel } from '../../../../shared/investigation-sites.model';
import { InvestigationsService } from '../../../../services/investigations.service';
import { FullPanelComponentEnum } from '../../../../shared/enums/mainUI.components.enums';
import { MainUIService } from '../../../../services/main-ui.service';
import { MapService } from '../../../../services/map/map.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ManageInvestigationService } from '../manage-investigations/shared/manage_investigation.service';
import { Investigation } from '../manage-investigations/shared/manage_investigation.model';

@Component({
  selector: 'app-investigation-sites-list',
  templateUrl: './investigation-sites-list.component.html',
  styleUrls: ['./investigation-sites-list.component.css']
})
export class InvestigationSitesListComponent implements OnInit {

  investigations : IinvestigationSitesModel [];
  totalInvestigations : number;
  totalDistance: number;
  firstDate: string;
  investigationList : Investigation [];

  constructor(private _investigationService:InvestigationsService ,
     public mainUIService:MainUIService ,public mapService: MapService,
     public ngxSmartModalService:NgxSmartModalService,
     public manageInvestigationService:ManageInvestigationService) { }

  ngOnInit() {
    this.investigations = this._investigationService.getInvestigations();
    var x= this.manageInvestigationService.getData();
    x.snapshotChanges().subscribe(item =>{
      this.investigationList=[];
      item.forEach(element =>{
        var y=element.payload.toJSON();
        y["$key"] =element.key;
        this.investigationList.push(y as Investigation);
      })
    })

    this.totalInvestigations = this._investigationService.getTotalInvestigations(this.investigations);
    this.totalDistance = this._investigationService.getTotalDistance(this.investigations);
    // this.firstDate = this._investigationService.getFirstDate(this.investigations);
  }

  viewRoute(site){
    this.mapService.currentSite = site;
    // this.ngxSmartModalService.getModal('route').open();
    //old way
   this.mainUIService.fullContainer = FullPanelComponentEnum.INVESTIGATION_ROUTE;
  }

  newInvestigation(){
    this.ngxSmartModalService.getModal('myModal').open();
    //old way
   // this.mainUIService.fullContainer = FullPanelComponentEnum.NEW_INVESTIGATION;
  }

}
