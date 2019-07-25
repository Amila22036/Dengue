import { Component, OnInit } from '@angular/core';
import { MapService } from '../../../../services/map/map.service';

@Component({
  selector: 'app-risk-map',
  templateUrl: './risk-map.component.html',
  styleUrls: ['./risk-map.component.css']
})
export class RiskMapComponent implements OnInit {

  constructor(public mapService: MapService) { }

  ngOnInit() {
    this.mapService.plotRiskMap();
  }

}
