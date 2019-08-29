import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AngularFireDatabase,AngularFireList} from 'angularfire2/database';
import { Phi} from './user.model';
import { reject } from 'q';

@Injectable()
export class UsersService {
  phiList: AngularFireList<any>;
  selectedUser: Phi = new Phi();
  dtTrigger: Subject<any> = new Subject();
  constructor(private firebase:AngularFireDatabase) { }

  getData(){
    this.phiList = this.firebase.list('phi');
    return this.phiList;
  }

  insertUser(phi : Phi){
    return new Promise((resolve,reject) =>{
      this.phiList.push({
        FirstName :phi.FirstName,
        LastName :phi.LastName,
        Email :phi.Email,
        PhoneNumber :phi.PhoneNumber
      }).then(
        res=>{
          this.getData();
          resolve();
        }).catch(err =>{
          reject();
        })
      

    })

   }

   updateUser(phi : Phi){
     return new Promise((resolve,reject)=>{
      this.phiList.update(phi.$key,{
        FirstName : phi.FirstName,
        LastName : phi.LastName,
        Email : phi.Email,
        PhoneNumber : phi.PhoneNumber
      }).then(
        res=>{
          resolve();
        }
      ).catch(err=>{
          reject();
      })

    })
   }

   deleteUser($key:string){
     this.phiList.remove($key);
   }


}
