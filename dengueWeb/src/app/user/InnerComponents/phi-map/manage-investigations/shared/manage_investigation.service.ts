import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AngularFireDatabase,AngularFireList} from 'angularfire2/database';
import { Investigation} from './manage_investigation.model';

@Injectable()
export class ManageInvestigationService {
  investigationList: AngularFireList<any>;
  selectedAreaGpx : string = '';
  selectedUser: Investigation = new Investigation();
  dtTrigger: Subject<any> = new Subject();
  constructor(private firebase:AngularFireDatabase) { }

  getData(){
    this.investigationList = this.firebase.list('Investigation');
    return this.investigationList;
  }

  insertInvestigation(investigation : Investigation){
    return new Promise(resolve =>{
      this.investigationList.push({
        area :investigation.area,
        area_gpx_name: this.selectedAreaGpx,
        name : investigation.name,
        assigned_date: new Date(),
        assigned_PHI: investigation.assigned_PHI,
        start_date: investigation.start_date,
        end_date: investigation.end_date,
        status: investigation.status,
        description: investigation.description,
      }).then(
        res=>{
          // this.getData();
          this.dtTrigger.next();
          resolve()
        }
      )
    })

   }

   updateInvestigation(investigation : Investigation){
     return new Promise(resolve =>{
      this.investigationList.update(investigation.$key,{
        area : investigation.area,
        area_gpx_name: this.selectedAreaGpx,
        name : investigation.name,
        assigned_PHI: investigation.assigned_PHI,
        start_date: investigation.start_date,
        end_date: investigation.end_date,
        status: investigation.status,
        description: investigation.description,
       }).then(res=>{
        this.dtTrigger.next();
          resolve();
       })
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
