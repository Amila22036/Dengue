import { Component, OnInit } from '@angular/core';
import { IinvestigationSitesModel } from '../../../../shared/investigation-sites.model';
import { InvestigationsService } from '../../../../services/investigations.service';
import { FullPanelComponentEnum ,InvestigationStatus} from '../../../../shared/enums/mainUI.components.enums';
import { MainUIService } from '../../../../services/main-ui.service';
import { MapService } from '../../../../services/map/map.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ManageInvestigationService } from '../manage-investigations/shared/manage_investigation.service';
import { Investigation } from '../manage-investigations/shared/manage_investigation.model';
import swal from 'sweetalert2';


@Component({
  selector: 'app-investigation-sites-list',
  templateUrl: './investigation-sites-list.component.html',
  styleUrls: ['./investigation-sites-list.component.css']
})
export class InvestigationSitesListComponent implements OnInit {

  investigations : IinvestigationSitesModel [];
  totalInvestigations : number;
  totalDistance: number;
  firstDate: string;
  investigationList : Investigation [];
  InvestigationStatus;
  currentSiteId = '';

  constructor(private _investigationService:InvestigationsService ,
     public mainUIService:MainUIService ,public mapService: MapService,
     public ngxSmartModalService:NgxSmartModalService,
     public manageInvestigationService:ManageInvestigationService) { 
       this.InvestigationStatus = InvestigationStatus;
       if(this.mapService.currentSite != undefined){
        this.currentSiteId = this.mapService.currentSite.$key
       }
       
     }

  ngOnInit() {
    this.investigations = this._investigationService.getInvestigations();
    var x= this.manageInvestigationService.getData();
    x.snapshotChanges().subscribe(item =>{
      this.investigationList=[];
      item.forEach(element =>{
        var y=element.payload.toJSON();
        y["$key"] = element.key;
        this.investigationList.push(y as Investigation);
      })

      this.investigationList.forEach(investigation =>{
        if(investigation.$key == this.currentSiteId)
        {
          this.mapService.currentSite = investigation;
        }
      })

    })

    this.totalInvestigations = this._investigationService.getTotalInvestigations(this.investigations);
    this.totalDistance = this._investigationService.getTotalDistance(this.investigations);
    // this.firstDate = this._investigationService.getFirstDate(this.investigations);
  }

  viewRoute(site){
    this.mapService.currentSite = site;
    // this.ngxSmartModalService.getModal('route').open();
    //old way
   this.mainUIService.fullContainer = FullPanelComponentEnum.INVESTIGATION_ROUTE;
  }

  newInvestigation(){
    this.mapService.isMapShowOnAreaInv = false;
    this.ngxSmartModalService.getModal('myModal').open();
    //old way
   // this.mainUIService.fullContainer = FullPanelComponentEnum.NEW_INVESTIGATION;
  }

  deleteInvestigation(key){
    swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {       
        this.manageInvestigationService.deleteInvestigation(key).then(res => {
            swal.fire(
              'Deleted!',
              'Your data has been deleted.',
              'success'
            )    
            this.manageInvestigationService.dtTrigger.next();     
        }).catch( res =>{   
          swal.fire(
            'Failed!',
            `Something Went Wrong !`,
            'error'
          )
        })
      }
    })

  }
}
