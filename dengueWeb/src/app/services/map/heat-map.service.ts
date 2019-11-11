import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SAVED_ACTIVITIES } from '../../shared/investigation-sites';
import { AngularFireDatabase,AngularFireList} from 'angularfire2/database';
import { Prediction } from '../map/heat-map.model';
import 'leaflet';
import 'leaflet-draw';
//import 'webgl-heatmap';
import 'leaflet-webgl-heatmap';
import '../../../assets/js/leaflet-heatmap';
import 'heatmap.js';
import createGpx from 'gps-to-gpx';
import { saveAs } from 'file-saver';

var mapAccesstoken = environment.MAPBOX_API_KEY;

declare var omnivore: any;
declare var L:any;
declare var HeatmapOverlay: any;
declare var h337:any;
declare var window: {
  h337: {
    create: Function,
    register: Function,
  }
};

const defaultCoords: number[] = [6.927079,79.861244]
const defaultZoom: number = 8

@Injectable({
  providedIn: 'root'
})
export class HeatMapService {
  predictionList: AngularFireList<any>;
  customLayer:any;
  RiskAreas:any;
  heatmapLayer:any;
  map: any;
  testData = {
    max: 8,
    data: []
  };
  predictionFinalList = [];

  constructor(private firebase:AngularFireDatabase) { }

  getData(){
    this.predictionList = this.firebase.list('prediction');
    return this.predictionList;
  }

  getPredictionList(){
    return new Promise(resolve =>{
      var x= this.getData();
      this.predictionFinalList=[];
      x.snapshotChanges().subscribe(item =>{     
        item.forEach(element =>{
          var y=element.payload.toJSON();
          y["$key"] =element.key;
          this.predictionFinalList.push(y as  Prediction );
        })
        resolve();
      })
    })

  }

  getRiskAreas(){  
    this.RiskAreas = {area:[ {id: 1,week:'1/9/2019',areas :[{lat: 6.927079, lng:79.861244, count: 3},{lat: 6.937079, lng: 80.861244, count: 1}]},
                    {id: 2,week:'8/9/2019',areas :[{lat: 6.927079, lng:79.861244, count: 3},{lat:6.0535 , lng:80.2210, count: 5},{lat:6.1385 , lng:80.1908, count: 4},{lat:6.1085 , lng:80.2126, count: 4},{lat: 6.937079, lng: 80.861244, count: 2}]},
                    {id: 3,week:'15/9/2019',areas :[{lat: 6.927079, lng:79.861244, count: 3},{lat:6.5854, lng:79.9607, count: 6},{lat: 6.937079, lng: 80.861244, count: 3}]}]}
    this.getPredictionList().then(res=>{
          let array = [];
          let week = '';
          array = Object.values(this.predictionFinalList[0].area.areas);
          week = this.predictionFinalList[0].area.week;
          this.RiskAreas = {area:[ {id: 1,week: week ,areas : array}]}
      })
    }

  setTestData(entry){
    return new Promise(resolve =>{
      this.RiskAreas.area.forEach(area => {
        if(area.id == entry.id){
          this.testData.data = [];
          entry.areas.forEach(ltlng => {
            this.testData.data.push(ltlng);
          });
          console.log(" test data ", this.testData)
          
          resolve();
        }
      });
    })
  }

  plotInvestigationRoute2(){
    console.log("first lt lng ", this.testData)
    var myStyle ={
      "color": "#3949AB",
      "weight": 5,
      "opacity":0.4
    }
    this.map = L.map('map').setView(defaultCoords, defaultZoom);
    // map.off();
    this.map.maxZoom = 100;
    // let gpxData = `https://firebasestorage.googleapis.com/v0/b/dengue-prevent.appspot.com/o/test%2F${this.currentSite.area_gpx_name}?alt=media&token=66e792c2-3fee-402a-a24d-a7fa32ff052d`;
  
    var baseLayer = L.tileLayer('https://api.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: mapAccesstoken
    }).addTo(this.map);
    this.customLayer = L.geoJson(null,{style:myStyle})

    
    var cfg = {
      // radius should be small ONLY if scaleRadius is true (or small radius is intended)
      // if scaleRadius is false it will be the constant radius used in pixels
      "radius": 0.07,
      "maxOpacity": .8,
      // scales the radius based on map zoom
      "scaleRadius": true,
      // if set to false the heatmap uses the global maximum for colorization
      // if activated: uses the data maximum within the current map boundaries
      //   (there will always be a red spot with useLocalExtremas true)
      "useLocalExtrema": true,
      // which field name in your data represents the latitude - default "lat"
      latField: 'lat',
      // which field name in your data represents the longitude - default "lng"
      lngField: 'lng',
      // which field name in your data represents the data value - default "value"
      valueField: 'count'
    };
    
    
    this.heatmapLayer = new HeatmapOverlay(cfg);
    
    // var map2 = new L.Map('map-canvas', {
    //   center: new L.LatLng(25.6586, -80.3568),
    //   zoom: 4,
    //   layers: [baseLayer, heatmapLayer]
    // });
    
    this.heatmapLayer.setData(this.testData);
    this.map.addLayer(this.heatmapLayer)

  }

  refreshHeatmapLayer(){
    this.heatmapLayer.redraw();
  }



}
