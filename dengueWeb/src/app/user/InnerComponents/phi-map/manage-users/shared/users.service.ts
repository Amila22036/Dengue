import { Injectable } from '@angular/core';

import { AngularFireDatabase,AngularFireList} from 'angularfire2/database';
import { User} from './user.model';

@Injectable()
export class UsersService {
  userList: AngularFireList<any>;
  selectedUser: User = new User();
  constructor(private firebase:AngularFireDatabase) { }

  getData(){
    this.userList = this.firebase.list('user');
    return this.userList;
  }

  insertUser(user : User){
    this.userList.push({
      FirstName :user.FirstName,
      LastName :user.LastName,
      Email :user.Email,
      PhoneNumber :user.PhoneNumber
    });
   }

   updateUser(user : User){
     this.userList.update(user.$key,{
       FirstName : user.FirstName,
       LastName : user.LastName,
       Email : user.Email,
       PhoneNumber : user.PhoneNumber
     });
   }

   deleteUser($key:string){
     this.userList.remove($key);
   }


}
