import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { InvestigationsService } from '../investigations.service';
import { IinvestigationSitesModel } from '../../shared/investigation-sites.model';
import { SAVED_ACTIVITIES } from '../../shared/investigation-sites';
import 'leaflet';
import 'leaflet-draw';

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
  
    L.tileLayer('https://api.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: mapAccesstoken
    }).addTo(map);
    this.customLayer = L.geoJson(null,{style:myStyle})

    var gpxLayer = omnivore.gpx(SAVED_ACTIVITIES.slice(0).find(invest => invest.id == id).gpxData , null ,this.customLayer)
    .on('ready', function(){
      map.fitBounds(gpxLayer.getBounds());
    }).addTo(map)
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
      console.log("dragg ", e);
      if (type === 'marker') {
        // Do marker specific actions
      }
      // Do whatever else you need to. (save to db; add to map etc)
      map2.addLayer(layer)
      // .done((layer)=> {
      //   //removeAllLayersExcept(layer);
      //   layer.once("load",  () => { // Remove only once the new tile layer has downloaded all tiles in view port.
      //     removeAllLayersExcept(layer);
      //   });
      //    setTimeout(updateMap =>{ 1000});
      // });
      console.log("map2 ", map2)

    });

    function removeAllLayersExcept(new_layer) {
      console.log('new_layer._leaflet_id:' + new_layer._leaflet_id);
      var layer_index = 0;
      map2.eachLayer(function(layer) {
        if (layer_index > 0 && layer._leaflet_id != new_layer._leaflet_id) {
          console.log('layer removed:' + layer._leaflet_id);
          //map.removeLayer(layer);
          setTimeout(function () { // give a little time before removing previous tile layer because new one will appear with some transition.
            map2.removeLayer(layer);
          }, 500);
        }
        layer_index++;
      });
    }
  }


  
      



      // drawEdited(event){
      //   console.log("edit")
      // }


    }


