import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { InvestigationsService } from '../investigations.service';
import { IinvestigationSitesModel } from '../../shared/investigation-sites.model';
import { SAVED_ACTIVITIES } from '../../shared/investigation-sites';


var mapAccesstoken = environment.MAPBOX_API_KEY;

declare var omnivore: any;
declare var L:any;


const defaultCoords: number[] = [6.927079,79.861244]
const defaultZoom: number = 8

@Injectable({
  providedIn: 'root'
})
export class MapService {

  currentSite:any;

  constructor() { }

  getInvestigation(id: number){
    return SAVED_ACTIVITIES.slice(0).find(x => x.id == id )
  }

  plotInvestigationRoute(id: number){
    debugger
    var myStyle ={
      "color": "#3949AB",
      "weight": 5,
      "opacity":0.4
    }

    var map = L.map('map').setView(defaultCoords, defaultZoom);

    map.maxZoom = 100;
    // L.tileLayer('https://api.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',{
    //   attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> '
    // })

    // L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    // attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    // maxZoom: 18,
    // id: 'mapbox.streets',
    // accessToken: mapAccesstoken
    // }).addTo(map);
  
    L.tileLayer('https://api.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: mapAccesstoken
    }).addTo(map);

    var customLayer = L.geoJson(null,{style:myStyle})

    var gpxLayer = omnivore.gpx(SAVED_ACTIVITIES.slice(0).find(invest => invest.id == id).gpxData , null ,customLayer)
    .on('ready', function(){
      map.fitBounds(gpxLayer.getBounds());
    }).addTo(map)

  }
}
