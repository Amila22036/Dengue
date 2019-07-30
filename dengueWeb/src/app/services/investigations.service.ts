import { Injectable } from '@angular/core';
import { IinvestigationSitesModel } from '../shared/investigation-sites.model';
import { SAVED_ACTIVITIES } from '../shared/investigation-sites'

@Injectable({
  providedIn: 'root'
})
export class InvestigationsService {

  constructor() { }

  getInvestigations(): IinvestigationSitesModel[]{
    return SAVED_ACTIVITIES.slice(0);
  }

  getTotalInvestigations(allInvestigations : IinvestigationSitesModel[]): number{
    return allInvestigations.length;
  }

  getTotalDistance(allInvestigations : IinvestigationSitesModel[]): number{
    let totalDistance = 0;
    allInvestigations.forEach(element => {
      totalDistance = element.distance + totalDistance;     
    });

    return totalDistance;
  }

  getFirstDate(){

  }

}
