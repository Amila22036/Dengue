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
import { AngularFireDatabase,AngularFireList} from 'angularfire2/database';
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
  currentSiteId
  gpxFile : any;
  isMarkerDrown: boolean = false;
  isPolygonDrown:boolean = false;
  isMapShowOnArea : boolean = false;
  isMapShowOnAreaInv : boolean = false;
  markerLong = 0;
  markerLat = 0;
  map2 :any;
  stepcount = -1;
  constructor(public storage:AngularFireStorage,public firebase:AngularFireDatabase) { 

  }

  getInvestigation(id: number){
    return SAVED_ACTIVITIES.slice(0).find(x => x.id == id )
  }

  plotInvestigationRoute(id: number){
    // this.initializeMap();
    this.stepcount = -1;
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
  console.log("current latitude ",this.currentSite)
  this.currentSiteId = this.currentSite.$key;
  var marker = L.marker([this.currentSite.longitude,this.currentSite.latitude], { title: `${this.currentSite.assigned_PHI} step ${this.stepcount}` }).addTo(map);
  var ref = this.firebase.database.ref("Investigation")  
  const _this = this;      
  this.firebase.database.ref().on('value', function(snapshot) {
    _this.stepcount++;
    L.marker([_this.currentSite.longitude,_this.currentSite.latitude], { title: `${_this.currentSite.assigned_PHI} step ${_this.stepcount}`  }).addTo(map);
  
      // Do whatever
  });

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
      console.log("dragg ", e ,"lat long ",latlon);
      if(latlon == undefined)
      {
        latlon = e.layer._latlng;
        this.markerLong = latlon.lat
        this.markerLat = latlon.lng;
        gpsObj['latitude'] = latlon.lat;
        gpsObj['longitude'] = latlon.lng;
        gpsFinal.push(gpsObj);
        gpsObj = {}
      }else
      {
      latlon.forEach(element => {
        gpsObj['latitude'] = element.lat;
        gpsObj['longitude'] = element.lng;
        gpsFinal.push(gpsObj);
        gpsObj = {}
      });
    }
      console.log("lat longg ",gpsFinal)
   
      if (type === 'marker') {
        // Do marker specific actions
        const gpx = createGpx(gpsFinal);
        this.gpxFile = createGpx(gpsFinal);
        console.log("gpx ", gpx)
        this.isMarkerDrown = true;
      }else if (type === 'polyline')
      {
       const gpx = createGpx(gpsFinal);
       this.gpxFile = createGpx(gpsFinal);
      //  var blob = new Blob([gpx], {type: "text/plain;charset=utf-8"});
       this.isPolygonDrown = true;
      // saveAs(blob,'Gpx_Map.gpx');
      // this.isMapShowOnArea = false;
  
      }

    //   var searchControl = new L.esri.Controls.Geosearch().addTo(this.map2);

    //   var results = new L.LayerGroup().addTo(this.map2);
    
    //   searchControl.on('results', function(data){
    //     results.clearLayers();
    //     for (var i = data.results.length - 1; i >= 0; i--) {
    //       results.addLayer(L.marker(data.results[i].latlng));
    //     }
    //   });
    
    // setTimeout(function(){$('.pointer').fadeOut('slow');},3400);

      this.map2.addLayer(layer)

    });

  }


  exportMap(){
        
    
  }


  
      



      // drawEdited(event){
      //   console.log("edit")
      // }


    }


