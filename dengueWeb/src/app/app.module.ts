import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from '../app/login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { ReactiveFormsModule, FormControl, FormsModule  } from '@angular/forms';
import { AuthGuard } from './core/auth.guard';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { AuthService } from './core/auth.service';
import { UserService } from './core/user.service';
import { UserResolver } from './user/user.resolver';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NavigationComponent } from './user/InnerComponents/navigation/navigation.component';
import { AsidePanalComponent } from './user/InnerComponents/aside-panal/aside-panal.component';
import { ManageUsersComponent } from './user/InnerComponents/phi-map/manage-users/manage-users.component';
import { PhiComponent } from './user/InnerComponents/phi-map/manage-users/phi/phi.component';

import { NgxAsideModule } from 'ngx-aside';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AsidePanalLeftComponent } from './user/InnerComponents/aside-panal-left/aside-panal-left.component';
import { InvestigationSitesListComponent } from './user/InnerComponents/phi-map/investigation-sites-list/investigation-sites-list.component';
import { InvestigationRoutesComponent } from './user/InnerComponents/phi-map/investigation-routes/investigation-routes.component';
import { UsersService } from '../app/user/InnerComponents/phi-map/manage-users/shared/users.service'

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
    PhiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
     FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    NgbModule.forRoot(),
    NgxAsideModule,
    BrowserAnimationsModule
  ],
  providers: [AuthService, UserService,UserResolver,AuthGuard,UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
