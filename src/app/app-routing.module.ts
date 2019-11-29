import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministracionComponent } from './components/administracion/administracion.component'
import { FrontpageComponent } from './components/frontpage/frontpage.component'
import { AppComponent } from './app.component';

import { AuthGuard } from './guards/auth.guard';
import { CategoryComponent } from './components/category/category.component';
import { ItemcategoryComponent } from './components/itemcategory/itemcategory.component';
import { PersonComponent } from './components/person/person.component';
import { PersonsroleComponent } from './components/personsrole/personsrole.component';
import { PersonsmediaComponent } from './components/personsmedia/personsmedia.component';
import { PersoncontactsComponent } from './components/personcontacts/personcontacts.component';
import { PersonDepartamentComponent } from './components/person-departament/person-departament.component';
import { ContentComponent } from './components/content/content.component';
import { ContentMediaComponent } from './components/content-media/content-media.component';
import { ContentInfoComponent } from './components/content-info/content-info.component';
import { InfositeComponent } from './components/infosite/infosite.component';
import { MenuComponent } from './components/menu/menu.component';

import { SubjectMatterComponent } from './components/subject-matter/subject-matter.component';
import { PreRequirementsComponent } from './components/pre-requirements/pre-requirements.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { VermasAutoridadesComponent } from './components/vermas-autoridades/vermas-autoridades.component';
import { VermasTestimoniosComponent } from './components/vermas-testimonios/vermas-testimonios.component';
import { VermasMensajesComponent } from './components/vermas-mensajes/vermas-mensajes.component';
import { MallaComponent } from './components/malla/malla.component';


const routes: Routes = [
 
  

  { path: 'utpl.edu.ec/:name', component: FrontpageComponent },//nombre de carrera
  { path: 'arquitectura/:id', component: FrontpageComponent },
  { path: '', component: FrontpageComponent, pathMatch: 'full',},
 // { path: '', redirectTo: '/frontpage', pathMatch: 'full' },
  { path: 'isic', component: FrontpageComponent},
  {path:'malla', component:MallaComponent},

  {path:'autoridades', component:VermasAutoridadesComponent},
  {path:'testimonios' , component:VermasTestimoniosComponent},
  {path:'mensajes' , component:VermasMensajesComponent},
 
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },  
  
  { path: 'administracion', component: AdministracionComponent, canActivate: [AuthGuard]
  ,children:[
    { path: 'category', component: CategoryComponent },
    { path: 'itemcategory', component: ItemcategoryComponent }, 
    { path: 'person', component: PersonComponent },
    { path: 'personsrole', component: PersonsroleComponent },
    { path: 'personsmedia', component: PersonsmediaComponent },
    { path: 'personcontact', component: PersoncontactsComponent },
    { path: 'persondepartament', component: PersonDepartamentComponent },
    { path: 'content', component: ContentComponent },
    { path: 'contentMedia', component: ContentMediaComponent },
    { path: 'contentInfo', component: ContentInfoComponent },
    { path: 'infosite', component: InfositeComponent },
    { path: 'menu', component: MenuComponent },
   
    { path: 'subjectMatter', component: SubjectMatterComponent },
    { path: 'preRequirements', component: PreRequirementsComponent },
  ]
 },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

