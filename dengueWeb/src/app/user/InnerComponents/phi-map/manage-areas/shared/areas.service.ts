import { Injectable } from '@angular/core';

import { AngularFireDatabase,AngularFireList} from 'angularfire2/database';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Area} from './area.model';
import { MapService } from '../../../../../services/map/map.service';

@Injectable()
export class AreasService {
  areaList: AngularFireList<any>;
  // Main task 
  task: AngularFireUploadTask;
  selectedArea: Area = new Area();
  isgpxUploaded: boolean = false;
  constructor(private storage: AngularFireStorage, private firebase:AngularFireDatabase, public mapService:MapService) { }

  getData(){
    this.areaList = this.firebase.list('Area');
    return this.areaList;
  }

  insertUser(area : Area){
    let gpxFileNameId = `${new Date().getTime()}_${Math.floor((Math.random()*6)+1)}.gpx`;
    this.areaList.push({
      AreaName :area.AreaName,                                  
      AreaCode :area.AreaCode,
      GpxName: gpxFileNameId

    });
    if(this.mapService.isPolygonDrown == true)
    {
      this.uploadGpx(gpxFileNameId).then(
        res=>{
          this.mapService.isPolygonDrown = false;
          this.isgpxUploaded = true;
        }
      )
    }
    this.getData();
   }

   uploadGpx(gpxFileNameId){
    return new Promise(resolve => {
      var blob = new Blob([this.mapService.gpxFile], {type: "text/plain;charset=utf-8"});
     const path = `test/${gpxFileNameId}`;
 
     this.task = this.storage.upload(path, blob);
 
     // Progress monitoring
     // this.percentage = this.task.percentageChanges();
     // this.snapshot   = this.task.snapshotChanges()
     resolve();
     })

   }

   updateUser(area : Area){
     this.areaList.update(area.$key,{
       FirstName : area.AreaName,
       LastName : area.AreaCode
  
     });
   }

   deleteUser($key:string){
     this.areaList.remove($key);
   }


}
