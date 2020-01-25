import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministracionComponent } from './components/administracion/administracion.component'
import { FrontpageComponent } from './components/frontpage/frontpage.component'
import { AppComponent } from './app.component';

import { AuthGuard } from './guards/auth.guard';
import { CategoryComponent } from './components/category/category.component';
import { ItemcategoryComponent } from './components/itemcategory/itemcategory.component';
import { PersonComponent } from './components/person/person.component';
import { PersonsroleComponent } from './components/personsrole/personRole.component';
import { PersonsmediaComponent } from './components/personsmedia/personmedia.component';
import { PersoncontactsComponent } from './components/personcontacts/personcontacts.component';
import { ContentComponent } from './components/content/content.component';
import { ContentMediaComponent } from './components/content-media/content-media.component';
import { PersonsectionComponent } from './components/personsection/personsection.component';
import { SectionComponent } from './components/section/section.component';
import { GroupComponent } from './components/group/group.component';
import { GroupContactComponent } from './components/groupContact/groupContact.component';
import { RoleComponent } from './components/role/role.component';

import { SubjectMatterComponent } from './components/subject-matter/subject-matter.component';
import { RequirementComponent } from './components/requirement/requirement.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { VermasAutoridadesComponent } from './components/vermas-autoridades/vermas-autoridades.component';
import { VermasTestimoniosComponent } from './components/vermas-testimonios/vermas-testimonios.component';
import { VermasMensajesComponent } from './components/vermas-mensajes/vermas-mensajes.component';
import { MallaComponent } from './components/malla/malla.component';

import { EnventComponent } from './components/envent/envent.component';
import { GroupEventComponent } from './components/group-event/group-event.component';
import { MenuComponent } from './components/menu/menu.component';
import { UserCComponent } from './components/user-c/user-c.component';
import { GuardsRoleGuard } from './guards/guards-role.guard';
import { GuardsCoordinadorGuard } from './guards/guards-coordinador.guard';
import { UniversityCarrer } from './models/university-carrer';
import { UniversityCarrerComponent } from './components/university-carrer/university-carrer.component';
import { AcademicPeriodComponent } from './components/academic-period/academic-period.component';
import { TypeContactComponent } from './components/type-contact/type-contact.component';
import { ContentType } from './models/content-type';
import { ContentTypeComponent } from './components/content-type/content-type.component';

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
    { path: 'category', component: CategoryComponent  },
    { path: 'itemcategory', component: ItemcategoryComponent }, 
    { path: 'person', component: PersonComponent,canActivate: [GuardsRoleGuard,GuardsCoordinadorGuard]},
    { path: 'personsrole', component: PersonsroleComponent,canActivate:[GuardsCoordinadorGuard]},
    { path: 'personsmedia', component: PersonsmediaComponent,canActivate:[GuardsCoordinadorGuard] },
    { path: 'personcontact', component: PersoncontactsComponent,canActivate:[GuardsCoordinadorGuard] },
    { path: 'content', component: ContentComponent },
    { path: 'contentMedia', component: ContentMediaComponent },
    { path: 'personSection', component: PersonsectionComponent,canActivate:[GuardsCoordinadorGuard]},
    { path: 'section', component: SectionComponent,canActivate:[GuardsCoordinadorGuard]},
    { path: 'group', component: GroupComponent,canActivate:[GuardsCoordinadorGuard]},
    { path: 'groupContact', component: GroupContactComponent,canActivate:[GuardsCoordinadorGuard] },
    { path: 'role', component: RoleComponent,canActivate: [GuardsRoleGuard]},
    { path: 'universityCarrer2', component: UniversityCarrerComponent},
    { path: 'academicPeriod', component: AcademicPeriodComponent},
    { path: 'type-contact', component: TypeContactComponent},
    { path: 'content-type', component: ContentTypeComponent},
    { path: 'subjectMatter', component: SubjectMatterComponent,canActivate: [GuardsRoleGuard] },
    { path: 'requirement', component: RequirementComponent,canActivate: [GuardsRoleGuard]},
    { path: 'event', component: EnventComponent },
    { path: 'groupEvent', component: GroupEventComponent },
    { path: 'menu', component: MenuComponent },
    { path: 'user', component: UserCComponent ,canActivate: [GuardsRoleGuard,GuardsCoordinadorGuard]},
  ]
 },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

