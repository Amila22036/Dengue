import { Component, OnInit, AfterViewInit} from '@angular/core';
import { MapService } from '../../../../services/map/map.service';
import { FullPanelComponentEnum } from '../../../../shared/enums/mainUI.components.enums';
import { MainUIService } from '../../../../services/main-ui.service';


@Component({
  selector: 'app-investigation-routes',
  templateUrl: './investigation-routes.component.html',
  styleUrls: ['./investigation-routes.component.css']
})
export class InvestigationRoutesComponent implements OnInit {

  constructor(public mapService: MapService, public mainUIService:MainUIService) { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.mapService.plotInvestigationRoute(this.mapService.currentSite.id)
  }

  viewList(){
    this.mainUIService.fullContainer = FullPanelComponentEnum.INVESTIGATION;
  }

}
