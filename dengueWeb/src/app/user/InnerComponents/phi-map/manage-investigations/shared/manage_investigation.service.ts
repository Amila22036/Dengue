import { Injectable } from '@angular/core';

import { AngularFireDatabase,AngularFireList} from 'angularfire2/database';
import { Investigation} from './manage_investigation.model';

@Injectable()
export class ManageInvestigationService {
  investigationList: AngularFireList<any>;
  selectedAreaGpx : string = '';
  selectedUser: Investigation = new Investigation();
  constructor(private firebase:AngularFireDatabase) { }

  getData(){
    this.investigationList = this.firebase.list('Investigation');
    return this.investigationList;
  }

  insertUser(investigation : Investigation){
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
    })
    this.getData();
   }

   updateUser(investigation : Investigation){
     this.investigationList.update(investigation.$key,{
      area : investigation.area,
      area_gpx_name: this.selectedAreaGpx,
      name : investigation.name,
      assigned_PHI: investigation.assigned_PHI,
      start_date: investigation.start_date,
      end_date: investigation.end_date,
      status: investigation.status,
      description: investigation.description,
     });
   }

   deleteUser($key:string){
     this.investigationList.remove($key);
   }


}
