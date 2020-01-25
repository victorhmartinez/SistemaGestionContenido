import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import{FlexLayoutModule }from '@angular/flex-layout'
import { AppComponent } from './app.component';
import { AdministracionComponent } from './components/administracion/administracion.component';
import { FrontpageComponent } from './components/frontpage/frontpage.component';
//import { LoginComponent } from './components/auth/login/login.component';
//import { RegisterComponent } from './components/auth/register/register.component';
import { MaterialModule } from './material-module';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { CategoryComponent } from './components/category/category.component'


import { ReactiveFormsModule } from '@angular/forms';

import { ItemcategoryComponent } from './components/itemcategory/itemcategory.component';

import { PersonsroleComponent } from './components/personsrole/personRole.component';
import { PersonComponent } from './components/person/person.component';
import { PersonsmediaComponent } from './components/personsmedia/personmedia.component';
import { PersoncontactsComponent } from './components/personcontacts/personcontacts.component';
import { ContentComponent } from './components/content/content.component';
import { ContentMediaComponent } from './components/content-media/content-media.component';
import { ContentInfoComponent } from './components/content-info/content-info.component';

import { SubjectMatterComponent } from './components/subject-matter/subject-matter.component';
import { RequirementComponent } from './components/requirement/requirement.component';
import { MatPaginatorIntl } from '@angular/material';
import { MatPaginatorIntlEspa } from './mat-paginator-intl-espa';
import { MatMenuModule} from '@angular/material/menu';
import { VermasTestimoniosComponent } from './components/vermas-testimonios/vermas-testimonios.component';
import { VermasAutoridadesComponent } from './components/vermas-autoridades/vermas-autoridades.component';
import { VermasMensajesComponent } from './components/vermas-mensajes/vermas-mensajes.component';
import { MallaComponent } from './components/malla/malla.component';

import { SectionComponent } from './components/section/section.component';
import { PersonsectionComponent } from './components/personsection/personsection.component';
import { GroupComponent } from './components/group/group.component';
import { GroupContactComponent } from './components/groupContact/groupContact.component';
import { RoleComponent } from './components/role/role.component';
import { EnventComponent } from './components/envent/envent.component';
import { GroupEventComponent } from './components/group-event/group-event.component';
import { MenuComponent } from './components/menu/menu.component';
import { UserCComponent } from './components/user-c/user-c.component';
import { UniversityCarrerComponent } from './components/university-carrer/university-carrer.component';
import { AcademicPeriodComponent } from './components/academic-period/academic-period.component';
import { ContentTypeComponent } from './components/content-type/content-type.component';
import { TypeContactComponent } from './components/type-contact/type-contact.component';

@NgModule({
  declarations: [
    AppComponent,
    AdministracionComponent,
    //LoginComponent
    
    //RegisterComponent
    //FrontPageComponent,
    FrontpageComponent,
    MainNavComponent,
    CategoryComponent,
    ItemcategoryComponent,
    PersonsroleComponent,
    PersonComponent,
    PersonsmediaComponent,
    PersoncontactsComponent,
    ContentComponent,
    ContentMediaComponent,
    ContentInfoComponent,
    SubjectMatterComponent,
    RequirementComponent,
    VermasTestimoniosComponent,
    VermasAutoridadesComponent,
    VermasMensajesComponent,
    MallaComponent,
    SectionComponent,
    PersonsectionComponent,
    GroupComponent,
    GroupContactComponent,
    RoleComponent,
    EnventComponent,
    GroupEventComponent,
    MenuComponent,
    UserCComponent,
    UniversityCarrerComponent,
    AcademicPeriodComponent,
    ContentTypeComponent,
    TypeContactComponent
    
 
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    MatMenuModule,
    FlexLayoutModule
   
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: MatPaginatorIntlEspa}],
  bootstrap: [AppComponent]
})
export class AppModule { }
