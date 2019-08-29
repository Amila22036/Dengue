import { Component, OnInit } from '@angular/core';
import { DndDropEvent } from 'ngx-drag-drop';
import { ManageInvestigationService } from '../phi-map/manage-investigations/shared/manage_investigation.service';
import { Investigation } from '../phi-map/manage-investigations/shared/manage_investigation.model';
import { FullPanelComponentEnum ,InvestigationStatus} from '../../../shared/enums/mainUI.components.enums';
import { NgxSmartModalService } from 'ngx-smart-modal';
import swal from 'sweetalert2';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit {
  investigationList : Investigation [];
  ToDoList = [];
  InPrograssList = [];
  OnHoldList = [];
  RejectedList = [];
  DoneList = [];
  InvestigationStatus;
  InvestigationPromisses = [];
  constructor(public manageInvestigationService:ManageInvestigationService,
    public ngxSmartModalService:NgxSmartModalService 
   ) { 
    this.InvestigationStatus = InvestigationStatus;
  }

  ngOnInit() {

this.getAndSetInvestigations();

  }

  getInvestigations(){
    return new Promise(resolve =>{
      var x= this.manageInvestigationService.getData();
      x.snapshotChanges().subscribe(item =>{
        this.investigationList=[];
        item.forEach(element =>{
          var y=element.payload.toJSON();
          y["$key"] =element.key;
          this.investigationList.push(y as Investigation);
        })
        resolve()
      })
    })  
  }

  getAndSetInvestigations()
  {
    this.getInvestigations().then(res =>{
      console.log("Investigations when ss ", this.investigationList)
      this.setStatusArrays();
    })
  }

  setStatusArrays(){
    this.ToDoList = [];
    this.InPrograssList = [];
    this.OnHoldList = [];
    this.RejectedList = [];
    this.DoneList = [];
    this.investigationList.forEach(investigation =>{
      switch(investigation.status.toString()) {
        case InvestigationStatus.TODO.toString():
          this.ToDoList.push(investigation);
          break;
        case InvestigationStatus.IN_PROGRASS.toString():
          this.InPrograssList.push(investigation);
          break;
        case InvestigationStatus.ON_HOLD.toString():
          this.OnHoldList.push(investigation);
          break;
        case InvestigationStatus.REJECTED.toString():
          this.RejectedList.push(investigation);
          break;
        case InvestigationStatus.DONE.toString():
          this.DoneList.push(investigation);
          break;
        default:
          // code block
      }
    })
    console.log("list arrays ", this.ToDoList)
  }

  draggable = {
    // note that data is handled with JSON.stringify/JSON.parse
    // only set simple data or POJO's as methods will be lost 
    data: "myDragData",
    effectAllowed: "all",
    disable: false,
    handle: false
  };

  onDragStart(event:DragEvent) {
    console.log(event)
    console.log("drag started", JSON.stringify(event, null, 2));
  }
  
  onDragEnd(event:DragEvent) {
    
    console.log("drag ended", JSON.stringify(event, null, 2));
  }
  
  onDraggableCopied(event:DragEvent) {
    
    console.log("draggable copied", JSON.stringify(event, null, 2));
  }
  
  onDraggableLinked(event:DragEvent) {
      
    console.log("draggable linked", JSON.stringify(event, null, 2));
  }
    
  onDraggableMoved(event:DragEvent) {
    
    console.log("draggable moved", JSON.stringify(event, null, 2));
  }
      
  onDragCanceled(event:DragEvent) {
    
    console.log("drag cancelled", JSON.stringify(event, null, 2));
  }
  
  onDragover(event:DragEvent) {
    
    console.log("dragover", JSON.stringify(event, null, 2));
  }
  
  onDrop(event:DndDropEvent,status) {
    console.log("on drop",event.data);
    console.log("Status ",status);
    let investigationData = event.data;
    investigationData.status = status;
    console.log("Inves data ",investigationData )
    this.manageInvestigationService.updateInvestigation(investigationData).then(
      res=>{
        this.getAndSetInvestigations();
        swal.fire(
          'Status Updated !',
          `${investigationData.name} updated successfully`,
          'success'
        )
      }
    )

    console.log("dropped", JSON.stringify(event, null, 2));
  }

  view(investigation){
    console.log("double clicked",investigation);
    this.manageInvestigationService.selectedUser = investigation;
    this.ngxSmartModalService.getModal('viewM').open();
  }
}
