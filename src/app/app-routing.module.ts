import { HaberdetayComponent } from './components/haberdetay/haberdetay.component';
import { HaberlisteleComponent } from './components/haberlistele/haberlistele.component';
import { HesapbilgilerimComponent } from './components/hesapbilgilerim/hesapbilgilerim.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UyelerComponent } from './components/uyeler/uyeler.component';
import { HaberekleComponent } from './components/haberekle/haberekle.component';
import { AdminComponent } from './components/admin/admin.component';
import { IsbirligiComponent } from './components/isbirligi/isbirligi.component';
import { Test1Component } from './components/test1/test1.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Test2Component } from './components/test2/test2.component';
import { HomeComponent } from './components/home/home.component';
import { EkonomiComponent } from './components/ekonomi/ekonomi.component';
import { MuzikComponent } from './components/muzik/muzik.component';
import { SporComponent } from './components/spor/spor.component';
import { IletisimComponent } from './components/iletisim/iletisim.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectLogin = () => redirectUnauthorizedTo(['login']);
const routes: Routes = [
  {path: 'magazin', component: Test1Component},
  {path: 'hakkimizda', component: Test2Component},
  {path: '', component: HomeComponent},
  {path: 'ekonomi', component: EkonomiComponent},
  {path: 'muzik', component: MuzikComponent},
  {path: 'spor', component: SporComponent},
  {path: 'iletisim', component: IletisimComponent},
  {path: 'yayinilkeleri', component: IsbirligiComponent},
  {path: 'admin', 
  component: AdminComponent,
  canActivate:[AngularFireAuthGuard],
  data:{
    authGuardPipe: redirectLogin
  }
  },
  {path: 'haberekle', component: HaberekleComponent},
  {path: 'uyeler', component: UyelerComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'hesapbilgilerim', component: HesapbilgilerimComponent},
  {path: 'haberlistele', component: HaberlisteleComponent},
  {path: 'haberdetay', component: HaberdetayComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
