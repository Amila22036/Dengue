import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { InvestigationsService } from '../investigations.service';
import { IinvestigationSitesModel } from '../../shared/investigation-sites.model';
import { SAVED_ACTIVITIES } from '../../shared/investigation-sites';
import 'leaflet';
import 'leaflet-draw';
//import 'webgl-heatmap';
import 'leaflet-webgl-heatmap';
import createGpx from 'gps-to-gpx';
import { saveAs } from 'file-saver';
// import 'webgl-heatmap';

var mapAccesstoken = environment.MAPBOX_API_KEY;

declare var omnivore: any;
declare var L:any;


const defaultCoords: number[] = [6.927079,79.861244]
const defaultZoom: number = 8

@Injectable({
  providedIn: 'root'
})
export class MapService {
  // map:any;
  customLayer:any;
  currentSite:any;
  gpxFile : any;
  isPolygonDrown:boolean = false;
  isMapShowOnArea : boolean = false;
  constructor() { }

  getInvestigation(id: number){
    return SAVED_ACTIVITIES.slice(0).find(x => x.id == id )
  }

  plotInvestigationRoute(id: number){
    // this.initializeMap();
    var myStyle ={
      "color": "#3949AB",
      "weight": 5,
      "opacity":0.4
    }
    var map = L.map('map').setView(defaultCoords, defaultZoom);
    map.maxZoom = 100;
    let gpxData = `https://firebasestorage.googleapis.com/v0/b/dengue-prevent.appspot.com/o/test%2F${this.currentSite.area_gpx_name}?alt=media&token=66e792c2-3fee-402a-a24d-a7fa32ff052d`;
  
    L.tileLayer('https://api.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: mapAccesstoken
    }).addTo(map);
    this.customLayer = L.geoJson(null,{style:myStyle})

    var gpxLayer = omnivore.gpx(gpxData , null ,this.customLayer)
    .on('ready', function(){
      map.fitBounds(gpxLayer.getBounds());
    }).addTo(map)
  }


  plotRiskMap(){
    // this.initializeMap();

    var baseURL = 'http://{s}.tile.cloudmade.com/{API}/{map_style}/256/{z}/{x}/{y}.png';
 
    var base = L.tileLayer(baseURL, { 
      API: mapAccesstoken, 
      map_style: '44094'
      });

    var map3 = L.map('map', {
      layers : [base],
      center : [44.65, -63.57],
      zoom: 12 
    });

    L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg', {
      subdomains: '1234'
    }).addTo( map3 );

    L.control.scale().addTo(map3);
  

    // dataPoints is an array of arrays: [[lat, lng, intensity]...]
    var heat =  L.heatLayer([
      [50.5, 30.5, 0.2], // lat, lng, intensity
      [50.6, 30.4, 0.5],
    ], {radius: 25}).addTo(map3);

    // map3.addLayer(heatmap);
  }


  drawRoute() {
    var myStyle ={
      "color": "#3949AB",
      "weight": 5,
      "opacity":0.4
    }
    var map2 = L.map('map', {drawControl: true}).setView(defaultCoords, defaultZoom);

    map2.maxZoom = 100;  
    L.tileLayer('https://api.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: mapAccesstoken
    }).addTo(map2);
    this.customLayer = L.geoJson(null,{style:myStyle})

    map2.on(L.Draw.Event.CREATED, (e) => {
      var type = e.layerType,
        layer = e.layer;
      var latlon = e.layer._latlngs;
      var gpsObj  = {};
      var gpsFinal = [];
      console.log("dragg ", e);
      latlon.forEach(element => {
        gpsObj['latitude'] = element.lat;
        gpsObj['longitude'] = element.lng;
        gpsFinal.push(gpsObj);
        gpsObj = {}
      }
      
      );
      console.log("lat longg ",gpsFinal)
   
      if (type === 'marker') {
        // Do marker specific actions
      }else if (type === 'polyline')
      {
       const gpx = createGpx(gpsFinal);
       this.gpxFile = createGpx(gpsFinal);
      //  var blob = new Blob([gpx], {type: "text/plain;charset=utf-8"});
       this.isPolygonDrown = true;
      // saveAs(blob,'Gpx_Map.gpx');
      this.isMapShowOnArea = false;
      console.log("gpx ", gpx)
      }

      map2.addLayer(layer)

    });

  }


  exportMap(){
        
    
  }


  
      



      // drawEdited(event){
      //   console.log("edit")
      // }


    }


