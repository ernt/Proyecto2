import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacturasComponent } from './components/facturas/facturas.component';
import { HomeComponent} from "./components/home/home.component";
import { ItemsComponent } from './components/items/items.component';

const routes: Routes = [
{path:'home',component:HomeComponent },
{path:'items',component:ItemsComponent },
{path:'facturas',component:FacturasComponent },
{path:'**',pathMatch:'full',redirectTo:'home'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
