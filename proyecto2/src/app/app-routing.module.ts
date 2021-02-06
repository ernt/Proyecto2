import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacturasComponent } from './components/facturas/facturas.component';
import { HomeComponent} from './components/home/home.component';
import {ProductsComponent} from './components/products/products.component';

const routes: Routes = [
{path: 'home', component: HomeComponent },
{path: 'items', component: ProductsComponent },
{path: 'factures', component: FacturasComponent },
{path: '**', pathMatch: 'full', redirectTo: 'home'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
