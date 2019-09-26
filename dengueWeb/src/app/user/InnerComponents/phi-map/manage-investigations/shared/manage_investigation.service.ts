import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AngularFireDatabase,AngularFireList} from 'angularfire2/database';
import { Investigation} from './manage_investigation.model';
import { MapService } from '../../../../../services/map/map.service';

@Injectable()
export class ManageInvestigationService {
  investigationList: AngularFireList<any>;
  selectedAreaGpx : string = '';
  selectedUser: Investigation = new Investigation();
  dtTrigger: Subject<any> = new Subject();
  constructor(private firebase:AngularFireDatabase, public  mapService: MapService) { }

  getData(){
    this.investigationList = this.firebase.list('Investigation');
    return this.investigationList;
  }

  insertInvestigation(investigation : Investigation){
    return new Promise((resolve,reject) =>{
      if(this.mapService.isMarkerDrown == true){
        this.investigationList.push({
          area :investigation.area,
          area_gpx_name: this.selectedAreaGpx,
          name : investigation.name,
          assigned_date: new Date(),
          assigned_PHI: investigation.assigned_PHI,
          start_date: investigation.start_date,
          end_date: investigation.end_date,
          status: Number(investigation.status),
          description: investigation.description,
          latitude: this.mapService.markerLat,
          longitude: this.mapService.markerLong
        }).then(
          res=>{
            // this.getData();
            // this.dtTrigger.next();
            resolve()
          }
        )
        this.mapService.isMarkerDrown = false;
      }else
      {
        reject();
      }

    })

   }

   updateInvestigation(investigation : Investigation){
     return new Promise((resolve,reject)=>{
      if(this.mapService.isMarkerDrown == true){
      this.investigationList.update(investigation.$key,{
        area : investigation.area,
        area_gpx_name: this.selectedAreaGpx,
        name : investigation.name,
        assigned_PHI: investigation.assigned_PHI,
        start_date: investigation.start_date,
        end_date: investigation.end_date,
        status: Number(investigation.status),
        description: investigation.description,
        latitude: this.mapService.markerLat,
        longitude: this.mapService.markerLong
       }).then(res=>{
        this.dtTrigger.next();
          resolve();
       })
       this.mapService.isMarkerDrown = false;
      }else
      {
        reject();
      }
     })

   }

   deleteInvestigation($key:string){
     return new Promise((resolve, reject)=>{
      this.investigationList.remove($key).then(
        res=>{
          this.dtTrigger.next();
          resolve();
        })
        .catch(err=>{
          reject();
        })
     })
     
   }


}
