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

import { PersonsroleComponent } from './components/personsrole/personsrole.component';
import { PersonComponent } from './components/person/person.component';
import { PersonsmediaComponent } from './components/personsmedia/personsmedia.component';
import { PersoncontactsComponent } from './components/personcontacts/personcontacts.component';
import { PersonDepartamentComponent } from './components/person-departament/person-departament.component';
import { ContentComponent } from './components/content/content.component';
import { ContentMediaComponent } from './components/content-media/content-media.component';
import { ContentInfoComponent } from './components/content-info/content-info.component';
import { MenuComponent } from './components/menu/menu.component';

import { InfositeComponent } from './components/infosite/infosite.component';
import { SubjectMatterComponent } from './components/subject-matter/subject-matter.component';
import { PreRequirementsComponent } from './components/pre-requirements/pre-requirements.component';
import { MatPaginatorIntl } from '@angular/material';
import { MatPaginatorIntlEspa } from './mat-paginator-intl-espa';
import { MatMenuModule} from '@angular/material/menu';
import { VermasTestimoniosComponent } from './components/vermas-testimonios/vermas-testimonios.component';
import { VermasAutoridadesComponent } from './components/vermas-autoridades/vermas-autoridades.component';
import { VermasMensajesComponent } from './components/vermas-mensajes/vermas-mensajes.component';
import { MallaComponent } from './components/malla/malla.component';


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
    PersonDepartamentComponent,
    ContentComponent,
    ContentMediaComponent,
    ContentInfoComponent,
    MenuComponent,
 
    InfositeComponent,
    SubjectMatterComponent,
    PreRequirementsComponent,
    VermasTestimoniosComponent,
    VermasAutoridadesComponent,
    VermasMensajesComponent,
    MallaComponent,
  
 
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
