import { Component, OnInit, AfterViewInit} from '@angular/core';
import { MapService } from '../../../../services/map/map.service';
import { FullPanelComponentEnum } from '../../../../shared/enums/mainUI.components.enums';
import { MainUIService } from '../../../../services/main-ui.service';
import { IinvestigationSitesModel } from '../../../../shared/investigation-sites.model';
import { Investigation } from '../manage-investigations/shared/manage_investigation.model';
import { ManageInvestigationService } from '../manage-investigations/shared/manage_investigation.service';

@Component({
  selector: 'app-investigation-routes',
  templateUrl: './investigation-routes.component.html',
  styleUrls: ['./investigation-routes.component.css']
})
export class InvestigationRoutesComponent implements OnInit {
  investigations : IinvestigationSitesModel [];
  totalInvestigations : number;
  totalDistance: number;
  firstDate: string;
  investigationList : Investigation [];
  InvestigationStatus;
  currentSiteId = '';
  constructor(public mapService: MapService, public mainUIService:MainUIService,
    public manageInvestigationService:ManageInvestigationService) { }

  ngOnInit() {
    var x= this.manageInvestigationService.getData();
    x.snapshotChanges().subscribe(item =>{
      this.investigationList=[];
      item.forEach(element =>{
        var y=element.payload.toJSON();
        y["$key"] = element.key;
        this.investigationList.push(y as Investigation);
      })

    })
  }

  ngAfterViewInit(){
    this.mapService.plotInvestigationRoute(this.mapService.currentSite.id)
  }

  viewList(){
    this.mainUIService.fullContainer = FullPanelComponentEnum.INVESTIGATION;
  }

}
