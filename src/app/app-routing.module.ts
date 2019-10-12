import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdivinaElNumeroComponent } from './componentes/adivina-el-numero/adivina-el-numero.component';
import { ListadoDeResultadosComponent } from './componentes/listado-de-resultados/listado-de-resultados.component';
import { LoginComponent } from './componentes/login/login.component';
import { ErrorComponent } from './componentes/error/error.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { AgilidadAritmeticaComponent } from './componentes/agilidad-aritmetica/agilidad-aritmetica.component';
import { AdivinaMasListadoComponent } from './componentes/adivina-mas-listado/adivina-mas-listado.component';
import { AgilidadMasListadoComponent } from './componentes/agilidad-mas-listado/agilidad-mas-listado.component';
import { JuegosComponent } from './componentes/juegos/juegos.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { MenuCardComponent } from './componentes/menu-card/menu-card.component';
import { CabeceraComponent } from './componentes/cabecera/cabecera.component';
import { QuienSoyComponent } from './componentes/quien-soy/quien-soy.component'
import { JugadoresListadoComponent } from './componentes/jugadores-listado/jugadores-listado.component';
import { PierdaPapelTijeraComponent } from './componentes/pierda-papel-tijera/pierda-papel-tijera.component';
import { TatetiComponent } from './componentes/tateti/tateti.component';
import { AnagramaComponent } from './componentes/anagrama/anagrama.component';
import { MemotestComponent } from './componentes/memotest/memotest.component';
import {AuthGuard} from './helpers/auth.guard';


const routes: Routes = [
  {path: 'Jugadores' , component: JugadoresListadoComponent},
  { path: '', redirectTo: 'Principal', pathMatch: 'full' },
  {path: 'Login' , component: LoginComponent},
  {path: 'QuienSoy' , component: QuienSoyComponent},
  {path: 'Registro' , component: RegistroComponent},
  {path: 'Principal' , component: PrincipalComponent, canActivate: [AuthGuard]},
  
  { path: 'Juegos' ,
  component: JuegosComponent ,
  children:
       [{path: '' , component: MenuCardComponent},
       {path: 'Adivina' , component: AdivinaElNumeroComponent},
        {path: 'AdivinaMasListado' , component: AdivinaMasListadoComponent},
        {path: 'AgilidadaMasListado' , component: AgilidadMasListadoComponent},
        {path: 'Agilidad' , component: AgilidadAritmeticaComponent},
        {path: 'PPT' , component: PierdaPapelTijeraComponent},
        {path: 'TATETI' , component: TatetiComponent},
        {path: 'Anagrama' , component: AnagramaComponent},
        {path: 'Memotest' , component: MemotestComponent}]
  },
  {path: '**' , component: ErrorComponent},
  {path: 'error' , component: ErrorComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
