import { Injectable,ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { AngularFireDatabase,AngularFireList} from 'angularfire2/database';
import { Phi} from './user.model';
import { reject } from 'q';
import { DataTableDirective } from 'angular-datatables';

@Injectable()
export class UsersService {
  phiList: AngularFireList<any>;
  selectedUser: Phi = new Phi();
  dtTrigger: Subject<any> = new Subject();
  phiFinalList =[];

  dtElement: DataTableDirective;

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
        PhoneNumber :phi.PhoneNumber,
        Age: phi.Age,
        Confirm_password: phi.Confirm_password,
        Password: phi.Password

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
        PhoneNumber : phi.PhoneNumber,
        Age: phi.Age,
        Confirm_password: phi.Confirm_password,
        Password: phi.Password
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
     return new Promise((resolve, reject)=>{
      this.phiList.remove($key).then(res=>{
        resolve();
      }).catch(err=>{
        reject();
      })
     })
    
   }



  getPhiList(){
    return new Promise(resolve =>{
      var x= this.getData();
      this.phiFinalList=[];
      x.snapshotChanges().subscribe(item =>{     
        item.forEach(element =>{
          var y=element.payload.toJSON();
          y["$key"] =element.key;
          this.phiFinalList.push(y as  Phi);
        })
        resolve();
      })
    })

  }

}
