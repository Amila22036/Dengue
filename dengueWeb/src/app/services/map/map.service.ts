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
import '../../../assets/js/L.Realtime';
import * as firebase from 'firebase/app';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
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
  map2 :any;
  constructor(public storage:AngularFireStorage) { }

  getInvestigation(id: number){
    return SAVED_ACTIVITIES.slice(0).find(x => x.id == id )
  }

  plotInvestigationRoute(id: number){
    // this.initializeMap();
    debugger
    let downloadUrlToken = '';
    let storage = firebase.storage();
   let storageRef =  this.storage.ref(`test/${this.currentSite.area_gpx_name}`);
   var gsReference = storage.refFromURL(`gs://medidocsl2019.appspot.com/`)
   var starsRef =  gsReference.child(`test/${this.currentSite.area_gpx_name}`);

   starsRef.getDownloadURL().then(url => {
    // Insert url into an <img> tag to "download"
    console.log("yewwe ", url)
    downloadUrlToken = url;
    var myStyle ={
      "color": "#3949AB",
      "weight": 5,
      "opacity":0.4
    }
    var map = L.map('map').setView(defaultCoords, defaultZoom);
    map.maxZoom = 100;
    // let gpxData = `https://firebasestorage.googleapis.com/v0/b/dengue-prevent.appspot.com/o/test%2F${this.currentSite.area_gpx_name}?alt=media&token=66e792c2-3fee-402a-a24d-a7fa32ff052d`;
    let gpxData = downloadUrlToken;
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


    var geojsonMarkerOptions = {
      radius: 18,
      fillColor: "#ff7800",
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
  };

  var marker = L.marker([7.323407, 80.643512], { title: "Test PHI" }).addTo(map);
  })
  .catch( err=>{
    console.log("Error ", err)
  })

  }




  drawRoute() {
    var myStyle ={
      "color": "#3949AB",
      "weight": 5,
      "opacity":0.4
    }
    this.map2 = L.map('map', {drawControl: true}).setView(defaultCoords, defaultZoom);

    this.map2.maxZoom = 100;  
    L.tileLayer('https://api.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: mapAccesstoken
    }).addTo(this.map2);
    this.customLayer = L.geoJson(null,{style:myStyle})

    this.map2.on(L.Draw.Event.CREATED, (e) => {
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
      // this.isMapShowOnArea = false;
      console.log("gpx ", gpx)
      }

      this.map2.addLayer(layer)

    });

  }


  exportMap(){
        
    
  }


  
      



      // drawEdited(event){
      //   console.log("edit")
      // }


    }


