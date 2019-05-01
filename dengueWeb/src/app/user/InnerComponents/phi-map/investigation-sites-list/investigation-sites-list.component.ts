import { Component, OnInit } from '@angular/core';
import { IinvestigationSitesModel } from '../../../../shared/investigation-sites.model';
import { InvestigationsService } from '../../../../services/investigations.service';
import { FullPanelComponentEnum } from '../../../../shared/enums/mainUI.components.enums';
import { MainUIService } from '../../../../services/main-ui.service';
import { MapService } from '../../../../services/map/map.service'

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

  constructor(private _investigationService:InvestigationsService ,
     public mainUIService:MainUIService ,public mapService: MapService) { }

  ngOnInit() {
    this.investigations = this._investigationService.getInvestigations();
    this.totalInvestigations = this._investigationService.getTotalInvestigations(this.investigations);
    this.totalDistance = this._investigationService.getTotalDistance(this.investigations);
    // this.firstDate = this._investigationService.getFirstDate(this.investigations);
  }

  viewRoute(site){
    this.mapService.currentSite = site;
    this.mainUIService.fullContainer = FullPanelComponentEnum.INVESTIGATION_ROUTE;
  }

}
