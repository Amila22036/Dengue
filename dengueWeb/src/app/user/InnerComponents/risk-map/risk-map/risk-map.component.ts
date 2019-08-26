import { Component, OnInit } from '@angular/core';
import { MapService } from '../../../../services/map/map.service';
import { HeatMapService } from '../../../../services/map/heat-map.service';

@Component({
  selector: 'app-risk-map',
  templateUrl: './risk-map.component.html',
  styleUrls: ['./risk-map.component.css']
})
export class RiskMapComponent implements OnInit {
  showHeatMap = false;
  selectedTime = '';

  constructor(public mapService: MapService, public heatMapService:HeatMapService) { }

  ngOnInit() {
    // this.heatMapService.
    this.heatMapService.getRiskAreas();
  }

  ngAfterViewInit() {
    this.Map();
  }

  showMap(){
    this.showHeatMap = true;
  }


  setAreas(entry){
    console.log("Set areas ")
    this.showHeatMap = false;
    this.showHeatMap = true;
    this.selectedTime = entry.week;
    this.heatMapService.setTestData(entry);
    if(this.showHeatMap == true)
    {
      setTimeout(() => {
        if(this.heatMapService.map == undefined)
        {
          this.heatMapService.plotInvestigationRoute2();
        }else 
        {
          this.heatMapService.map.remove();
          this.heatMapService.plotInvestigationRoute2();
        }
    

      }, 1000);  
    }
  }

  Map(){
    // this.isMapShow = !this.isMapShow;
    this.showHeatMap = !this.showHeatMap;
    if(this.showHeatMap == true)
    {
      setTimeout(() => {
        this.heatMapService.plotInvestigationRoute2();
      }, 1000);  
    }
  }
}
