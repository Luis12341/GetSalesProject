import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrincipalComponent } from './pages/principal/principal.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { BitacoraComponent } from './pages/bitacora/bitacora.component';


const routes: Routes = [
  {path:'administracion', component:PrincipalComponent, children: [
    {path: 'reportes', component:ReportesComponent },
    {path: 'bitacora', component:BitacoraComponent },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }
