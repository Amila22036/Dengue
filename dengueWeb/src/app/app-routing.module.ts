import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { UserResolver } from './user/user.resolver';
import { AuthGuard } from './core/auth.guard';
import { ProjectComponent } from './project/project.component';



const routes: Routes =[
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'project', component: ProjectComponent, resolve: {data: UserResolver}},
  { path: 'user/:id', component: UserComponent,  resolve: { data: UserResolver}},
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },

  // {path:'admin',component:AdminListComponent,canActivate:[AdminGuard]},
  // {path:'article',component:ArticalPageComponent,canActivate:[SubscriberGuard]},
  // {path:'home',component:HomePageComponent},
  // {path:'Map',component:MapPageComponent},
  // {path:'Manage-users',component:ManageUsersComponent,canActivate:[AdminGuard]},
  // {path:'Admin-map',component:AdminMapComponent,canActivate:[AdminGuard]},
  // {path:'Manage-vendors',component:ManageVendorsComponent,canActivate:[AdminGuard]},
  // {path:'bus-routes',component:AddplaceComponent,canActivate:[AdminGuard]},
  // {path:'bus-routes-map',component:GoogleMapComponent,canActivate:[AdminGuard]},
  // {path:'Manage-places',component:ManagePlacesComponent,canActivate:[AdminGuard]}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
//  rootRouterConfig: Routes = [
//     { path: '', redirectTo: 'login', pathMatch: 'full' },
//     { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
//     // { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
//     // { path: 'user', component: UserComponent,  resolve: { data: UserResolver}}
//   ];
 }




