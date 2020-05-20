import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditSitesComponent } from './components/EditSites/EditSites.component';
import { TrendsReportComponent } from './components/TrendsReport/TrendsReport.component';
import { LeadsReportComponent } from './components/LeadsReport/LeadsReport.component';
import { SellsReportComponent } from './components/SellsReport/SellsReport.component';
import { LinkReportComponent } from './components/LinkReport/LinkReport.component';
import { EditUsersComponent } from './components/EditUsers/EditUsers.component';
import { EditFaqComponent } from './components/EditFaq/EditFaq.component';
import { EditCategoriesComponent } from './components/EditCategories/EditCategories.component';
import { TopMenuComponent } from './components/TopMenu/TopMenu.component';
import { ToastComponent } from './components/Toast/Toast.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { QuetionsFilter } from './service/PipesAndFilters';
import { SecureHttp } from './service/SecureHttp';
import { AuthenticationService } from './service/AuthenticationService';
import { ShaerdStrings } from './service/ShaerdStrings';
import { ProfitReportComponent } from './components/ProfitReport/ProfitReport.component';
import { ConfigService } from './ConfigService';
import { UiSwitchModule } from 'ngx-ui-switch';
import { TOUComponent } from './components/tou/tou.component';
import { EditorModule } from '@tinymce/tinymce-angular';
export function configFactory(config: ConfigService) {
  return  () => config.load();
}


@NgModule({
  declarations: [
    AppComponent,
    EditSitesComponent,
    TrendsReportComponent,
    LeadsReportComponent,
    SellsReportComponent,
    LinkReportComponent,
    ProfitReportComponent,
    EditUsersComponent,
    EditFaqComponent,
    EditCategoriesComponent,
    TopMenuComponent,
    ToastComponent,
    NavMenuComponent,
    HomeComponent,
    QuetionsFilter,
    TOUComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpModule,
    FormsModule,
    UiSwitchModule,
    EditorModule 
  ],
  providers: [
    SecureHttp,
    AuthenticationService,
    ShaerdStrings,
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: configFactory,
      deps: [ConfigService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
