import { Component, OnInit } from '@angular/core';
import {ManageInvestigationService} from './shared/manage_investigation.service';
@Component({
  selector: 'manage-investigations',
  templateUrl: './manage-investigations.component.html',
  styleUrls: ['./manage-investigations.component.css'],
  providers:[ManageInvestigationService]
})
export class ManageInvestigationsComponent implements OnInit {

  constructor(private userService : ManageInvestigationService) { }

  ngOnInit() {
  }

}
