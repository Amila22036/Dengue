import { Injectable } from '@angular/core';

import { AngularFireDatabase,AngularFireList} from 'angularfire2/database';
import { Phi} from './user.model';

@Injectable()
export class UsersService {
  phiList: AngularFireList<any>;
  selectedUser: Phi = new Phi();
  constructor(private firebase:AngularFireDatabase) { }

  getData(){
    this.phiList = this.firebase.list('phi');
    return this.phiList;
  }

  insertUser(phi : Phi){
    this.phiList.push({
      FirstName :phi .FirstName,
      LastName :phi .LastName,
      Email :phi .Email,
      PhoneNumber :phi .PhoneNumber
    });
    this.getData();
   }

   updateUser(phi : Phi){
     this.phiList.update(phi.$key,{
       FirstName : phi.FirstName,
       LastName : phi.LastName,
       Email : phi.Email,
       PhoneNumber : phi.PhoneNumber
     });
   }

   deleteUser($key:string){
     this.phiList.remove($key);
   }


}
