import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EditUsersComponent } from './components/EditUsers/EditUsers.component';
import { LeadsReportComponent } from './components/LeadsReport/LeadsReport.component';
import { TrendsReportComponent } from './components/TrendsReport/TrendsReport.component';
import { SellsReportComponent } from './components/SellsReport/SellsReport.component';
import { LinkReportComponent } from './components/LinkReport/LinkReport.component';
import { EditFaqComponent } from './components/EditFaq/EditFaq.component';
import { EditSitesComponent } from './components/EditSites/EditSites.component';
import { ToastComponent } from './components/Toast/Toast.component';
import { EditCategoriesComponent } from './components/EditCategories/EditCategories.component';
import { TopMenuComponent } from './components/TopMenu/TopMenu.component';
import { ProfitReportComponent } from './components/ProfitReport/ProfitReport.component';
import { TOUComponent } from './components/tou/tou.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'EditUsers', component: EditUsersComponent },
  { path: 'LeadsReport/:id', component: LeadsReportComponent },
  { path: 'ProfitReport', component: ProfitReportComponent },
  { path: 'TOU', component: TOUComponent },
  { path: 'TrendsReport', component: TrendsReportComponent },
  { path: 'SellsReport', component: SellsReportComponent }, 
  { path: 'LinkReport', component: LinkReportComponent },
  { path: 'EditFaq', component: EditFaqComponent },
  { path: 'EditSites', component: EditSitesComponent },
  { path: 'Toast', component: ToastComponent },
  { path: 'EditCategories', component: EditCategoriesComponent },
  { path: 'TopMenu', component: TopMenuComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
