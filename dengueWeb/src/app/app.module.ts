import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from '../app/login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MapService } from './services/map/map.service';

import { ReactiveFormsModule, FormControl, FormsModule  } from '@angular/forms';
import { AuthGuard } from './core/auth.guard';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { AuthService } from './core/auth.service';
import { UserService } from './core/user.service';
import { UserResolver } from './user/user.resolver';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NavigationComponent } from './user/InnerComponents/navigation/navigation.component';
import { AsidePanalComponent } from './user/InnerComponents/aside-panal/aside-panal.component';
import { ManageUsersComponent } from './user/InnerComponents/phi-map/manage-users/manage-users.component';
import { PhiComponent } from './user/InnerComponents/phi-map/manage-users/phi/phi.component';
import { PhisListComponent } from './user/InnerComponents/phi-map/manage-users/phis-list/phis-list.component'

import { NgxAsideModule } from 'ngx-aside';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AsidePanalLeftComponent } from './user/InnerComponents/aside-panal-left/aside-panal-left.component';
import { InvestigationSitesListComponent } from './user/InnerComponents/phi-map/investigation-sites-list/investigation-sites-list.component';
import { InvestigationRoutesComponent } from './user/InnerComponents/phi-map/investigation-routes/investigation-routes.component';
import { UsersService } from '../app/user/InnerComponents/phi-map/manage-users/shared/users.service';
import { ProjectComponent } from './project/project.component';
import { ProjectHeadComponent } from './project/project-head/project-head.component';
import { ManageProjectsComponent } from './project/manage-project/manage-projects.component';
import { ProjectFormComponent } from './project/manage-project/project-form/project-form.component';
import { ProjectListComponent } from './project/manage-project/project-list/project-list.component';
import { ManageInvestigationComponent } from './user/InnerComponents/phi-map/manage-investigations/manage_investigation/manage_investigation.component';
import { ManageInvestigationListComponent } from './user/InnerComponents/phi-map/manage-investigations/manage_investigation-list/manage_investigation-list.component';
import { ProjectService } from './project/manage-project/shared/project.service';
import { KanbanComponent } from './user/InnerComponents/kanban/kanban.component';
import { DndModule } from 'ngx-drag-drop';
import { ManageInvestigationService } from './user/InnerComponents/phi-map/manage-investigations/shared/manage_investigation.service';
import { ManageInvestigationsComponent } from './user/InnerComponents/phi-map/manage-investigations/manage-investigations.component';
import { ManageAreasComponent } from './user/InnerComponents/phi-map/manage-areas/manage-areas.component';
import { AreasListComponent } from './user/InnerComponents/phi-map/manage-areas/area-list/area-list.component';
import { AreaComponent } from './user/InnerComponents/phi-map/manage-areas/area/area.component';
import { RiskMapComponent } from './user/InnerComponents/risk-map/risk-map/risk-map.component';
import { AngularFirestoreModule , AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { NgDatepickerModule } from 'ng2-datepicker';
import { AreasService } from './user/InnerComponents/phi-map/manage-areas/shared/areas.service';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { DashbordComponent } from './user/dashbord/dashbord.component';
import { MglTimelineModule } from 'angular-mgl-timeline';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http'; 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    RegisterComponent,
    NavigationComponent,
    AsidePanalComponent,
    AsidePanalLeftComponent,
    InvestigationSitesListComponent,
    InvestigationRoutesComponent,
    ManageUsersComponent,
    PhiComponent,
    PhisListComponent,
    ProjectComponent,
    ProjectHeadComponent,
    ManageProjectsComponent,
    ProjectFormComponent,
    ProjectListComponent,
    KanbanComponent,
    ManageInvestigationListComponent,
    ManageInvestigationsComponent,
    ManageInvestigationComponent,
    ManageAreasComponent,
    AreasListComponent,
    AreaComponent,
    RiskMapComponent,
    DashbordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
     FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    NgbModule.forRoot(),
    NgxAsideModule,
    BrowserAnimationsModule,
    DndModule,
    AngularFirestoreModule,
    NgDatepickerModule,
    NgxSmartModalModule.forRoot(),
    MglTimelineModule,
    DataTablesModule,
    HttpClientModule
  ],
  providers: [AuthService,MapService , UserService,UserResolver,AuthGuard,UsersService,ProjectService,
    ManageInvestigationService, AngularFirestore , AngularFireStorage, AreasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
