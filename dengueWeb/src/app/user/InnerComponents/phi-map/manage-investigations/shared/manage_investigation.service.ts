import { Injectable } from '@angular/core';

import { AngularFireDatabase,AngularFireList} from 'angularfire2/database';
import { User} from './manage_investigation.model';

@Injectable()
export class ManageInvestigationService {
  userList: AngularFireList<any>;
  selectedUser: User = new User();
  constructor(private firebase:AngularFireDatabase) { }

  getData(){
    this.userList = this.firebase.list('user');
    return this.userList;
  }

  insertUser(user : User){
    this.userList.push({
      area :user.area,
      complainer :user.complainer,
      assigner :user.assigner,
      route :user.route,
      assigned_date:user.assigned_date,
      assigned_PHI: user.assigned_PHI,
      start_date: user.start_date,
      end_date: user.end_date,
      expected_day_to_start_date: user.expected_day_to_start_date,
      description: user.description,
      feedback: user.feedback
    })
    this.getData();
   }

   updateUser(user : User){
     this.userList.update(user.$key,{
      area : user.area,
       complainer : user.complainer,
       assigner : user.assigner,
       route : user.route,
       assigned_date:user.assigned_date,
       assigned_PHI: user.assigned_PHI,
       start_date: user.start_date,
       end_date: user.end_date,
       expected_day_to_start_date: user.expected_day_to_start_date,
       description:user.description,
       feedback: user.feedback
     });
   }

   deleteUser($key:string){
     this.userList.remove($key);
   }


}
