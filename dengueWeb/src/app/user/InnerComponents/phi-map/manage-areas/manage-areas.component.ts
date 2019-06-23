import { Component, OnInit } from '@angular/core';
import {AreasService } from './shared/areas.service';
@Component({
  selector: 'manage-areas',
  templateUrl: './manage-areas.component.html',
  styleUrls: ['./manage-areas.component.css'],
  providers:[AreasService ]
})
export class ManageAreasComponent implements OnInit {

  constructor(private userService : AreasService ) { }

  ngOnInit() {
  }

}
